#!/usr/bin/env python3
"""Recompress WebP images in public/images for smaller PageSpeed payload."""

from __future__ import annotations

import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Instala Pillow: pip install -r scripts/requirements.txt", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "public" / "images"


def settings(path: Path) -> tuple[int, int]:
    s = str(path).replace("\\", "/").lower()
    if path.name == "hero.webp":
        return 1280, 65
    if "gallery" in s:
        return 720, 62
    if any(x in s for x in ("clients", "flag-checkered", "seriols-logo")):
        return 280, 78
    return 1400, 72


def optimize(path: Path) -> int:
    max_width, quality = settings(path)
    before = path.stat().st_size

    with Image.open(path) as img:
        img = img.convert("RGBA" if img.mode in ("RGBA", "LA", "P") else "RGB")
        w, h = img.size
        if w > max_width:
            new_h = round(h * max_width / w)
            img = img.resize((max_width, new_h), Image.Resampling.LANCZOS)

        temp = path.with_suffix(path.suffix + ".opt")
        save_kwargs = {
            "quality": quality,
            "method": 6,
            "optimize": True,
        }
        if img.mode == "RGBA":
            img.save(temp, "WEBP", **save_kwargs, lossless=False)
        else:
            img.save(temp, "WEBP", **save_kwargs)

    after = temp.stat().st_size
    if after >= before:
        temp.unlink(missing_ok=True)
        print(f"· {path.relative_to(ROOT)} (sin cambio)")
        return 0

    os.replace(temp, path)
    saved = before - after
    print(f"OK {path.relative_to(ROOT)} -{saved // 1024} KiB")
    return saved


def write_hero_variants() -> int:
    hero = IMAGES / "hero.webp"
    if not hero.exists():
        return 0

    saved = 0
    with Image.open(hero) as source:
        for width, quality, name in ((800, 64, "hero-800.webp"), (1280, 66, "hero-1280.webp")):
            output = IMAGES / name
            before = output.stat().st_size if output.exists() else 0
            img = source.convert("RGB")
            w, h = img.size
            if w > width:
                new_h = round(h * width / w)
                img = img.resize((width, new_h), Image.Resampling.LANCZOS)
            temp = output.with_suffix(".webp.opt")
            img.save(temp, "WEBP", quality=quality, method=6, optimize=True)
            os.replace(temp, output)
            after = output.stat().st_size
            if after < before or before == 0:
                delta = max(0, before - after) if before else 0
                saved += delta
                print(f"OK {output.relative_to(ROOT)} ({after // 1024} KiB)")
    return saved


def main() -> int:
    files = sorted(IMAGES.rglob("*.webp"))
    if not files:
        print("No se encontraron archivos .webp")
        return 1

    total = 0
    skipped = 0
    for path in files:
        if path.name.startswith("hero-"):
            continue
        if path.suffix == ".opt" or path.name.endswith(".webp.opt"):
            continue
        try:
            total += optimize(path)
        except OSError as err:
            skipped += 1
            print(f"SKIP {path.relative_to(ROOT)} (omitido: {err})")
        except Exception as err:
            skipped += 1
            print(f"SKIP {path.relative_to(ROOT)} (error: {err})")

    print(f"\n{len(files)} WebP procesados. Ahorro ~{total // 1024} KiB.", end="")
    if skipped:
        print(f" {skipped} omitidos (archivo bloqueado).")
    else:
        print()

    variant_saved = write_hero_variants()
    if variant_saved:
        print(f"Variantes hero: ~{variant_saved // 1024} KiB adicionales.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
