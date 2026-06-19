import sharp from 'sharp';
import { readdir, stat, writeFile, copyFile, unlink } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { tmpdir } from 'node:os';
import { randomBytes } from 'node:crypto';
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
    return 0;
  }

  const tempPath = join(tmpdir(), `webp-${randomBytes(8).toString('hex')}.webp`);
  try {
    await writeFile(tempPath, buffer);
    await copyFile(tempPath, inputPath);
    const saved = before - buffer.length;
    console.log('✓', inputPath, `-${Math.round(saved / 1024)} KiB`);
    return saved;
  } catch (error) {
    console.warn('⚠', inputPath, `(omitido: ${error.code ?? error.message})`);
    return 0;
  } finally {
    await unlink(tempPath).catch(() => {});
  }
}

const files = await walk(imagesRoot);
let totalSaved = 0;

for (const file of files) {
  totalSaved += await optimizeWebp(file);
}

console.log(`Optimized ${files.length} WebP file(s). Saved ~${Math.round(totalSaved / 1024)} KiB.`);
