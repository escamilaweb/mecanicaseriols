import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const source = join(process.cwd(), '.vercel', 'output', 'static');
const target = join(process.cwd(), 'dist');

if (!existsSync(source)) {
  console.error('No se encontró .vercel/output/static. Ejecuta "astro build" primero.');
  process.exit(1);
}

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true });

console.log('Sitio estático listo en dist/');
