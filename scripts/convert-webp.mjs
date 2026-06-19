import sharp from 'sharp';
import { readdir, unlink } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicRoot = fileURLToPath(new URL('../public', import.meta.url));
const imagesRoot = join(publicRoot, 'images');
const RASTER_EXT = new Set(['.jpg', '.jpeg', '.png']);
const SVG_TO_WEBP = new Set([
  'flag-checkered-red.svg',
  'flag-checkered.svg',
  'Seriols-logo.svg',
]);

function outputWidth(inputPath) {
  if (inputPath.includes('hero')) return 1920;
  if (inputPath.includes('gallery')) return 1200;
  if (inputPath.includes('clients')) return 280;
  if (inputPath.includes('flag-checkered')) return 400;
  if (inputPath.includes('Seriols-logo')) return 360;
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

async function svgToWebp(inputPath) {
  const { dir, name } = parse(inputPath);
  const outputPath = join(dir, `${name}.webp`);

  await sharp(inputPath)
    .resize({ width: outputWidth(inputPath), withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(outputPath);

  console.log('✓', outputPath);
}

const rasterSources = await walk(imagesRoot);

for (const inputPath of rasterSources) {
  try {
    await toWebp(inputPath);
  } catch (err) {
    console.warn('Skip', inputPath, err.message);
  }
}

for (const fileName of SVG_TO_WEBP) {
  const inputPath = join(imagesRoot, fileName);
  try {
    await svgToWebp(inputPath);
  } catch (err) {
    console.warn('Skip', inputPath, err.message);
  }
}

console.log(`Done. Converted ${rasterSources.length} raster file(s) and ${SVG_TO_WEBP.size} SVG(s).`);
