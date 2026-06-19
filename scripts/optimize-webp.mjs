import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const imagesRoot = fileURLToPath(new URL('../public/images', import.meta.url));

function settings(inputPath) {
  if (inputPath.includes('hero')) {
    return { width: 1600, quality: 78 };
  }
  if (inputPath.includes('gallery')) {
    return { width: 960, quality: 72 };
  }
  if (inputPath.includes('clients') || inputPath.includes('flag-checkered') || inputPath.includes('Seriols-logo')) {
    return { width: 280, quality: 82 };
  }
  return { width: 1400, quality: 78 };
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    if (parse(entry.name).ext.toLowerCase() === '.webp') {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeWebp(inputPath) {
  const { width, quality } = settings(inputPath);
  const before = (await stat(inputPath)).size;
  const buffer = await sharp(inputPath)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toBuffer();

  if (buffer.length >= before) {
    console.log('·', inputPath, '(sin cambio)');
    return;
  }

  const tempPath = `${inputPath}.tmp`;
  await sharp(buffer).toFile(tempPath);
  const { rename, unlink } = await import('node:fs/promises');
  await unlink(inputPath);
  await rename(tempPath, inputPath);
  const saved = before - buffer.length;
  console.log('✓', inputPath, `-${Math.round(saved / 1024)} KiB`);
}

const files = await walk(imagesRoot);
let totalSaved = 0;

for (const file of files) {
  const before = (await stat(file)).size;
  await optimizeWebp(file);
  const after = (await stat(file)).size;
  totalSaved += Math.max(0, before - after);
}

console.log(`Optimized ${files.length} WebP file(s). Saved ~${Math.round(totalSaved / 1024)} KiB.`);
