import sharp from 'sharp';
import { readdir, unlink } from 'node:fs/promises';
import { join, parse } from 'node:path';

const root = new URL('../public/images', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
const RASTER_EXT = new Set(['.jpg', '.jpeg', '.png']);

function outputWidth(inputPath) {
  if (inputPath.includes('hero')) return 1920;
  if (inputPath.includes('gallery')) return 1200;
  if (inputPath.includes('clients')) return 280;
  return 1920;
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
    const ext = parse(entry.name).ext.toLowerCase();
    if (RASTER_EXT.has(ext)) files.push(fullPath);
  }

  return files;
}

async function toWebp(inputPath) {
  const { dir, name } = parse(inputPath);
  const outputPath = join(dir, `${name}.webp`);

  await sharp(inputPath)
    .resize({ width: outputWidth(inputPath), withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(outputPath);

  await unlink(inputPath);
  console.log('✓', outputPath);
}

const sources = await walk(root);

if (sources.length === 0) {
  console.log('No raster images to convert.');
} else {
  for (const inputPath of sources) {
    try {
      await toWebp(inputPath);
    } catch (err) {
      console.warn('Skip', inputPath, err.message);
    }
  }
}

console.log(`Done. Converted ${sources.length} file(s).`);
