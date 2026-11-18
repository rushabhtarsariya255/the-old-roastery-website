import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PHOTOS } from '../data/photography';
import { CAFE_EXPERIENCES, GALLERY_ITEMS } from '../data/roasteryData';

describe('Local photography integrity', () => {
  it('assigns a distinct photograph to every section and experience state', () => {
    const placements = [PHOTOS.hero.src, PHOTOS.story.src, PHOTOS.bestSeller.src, PHOTOS.menuPizza.src, PHOTOS.menuSandwich.src, ...CAFE_EXPERIENCES.map(item => item.image), ...GALLERY_ITEMS.map(item => item.imageUrl)];
    expect(placements).toHaveLength(14);
    expect(new Set(placements).size).toBe(placements.length);
    expect(new Set(placements)).toEqual(new Set(Object.values(PHOTOS).map(photo => photo.src)));
  });

  it('references only retained full-quality files with no alternate copies', () => {
    const hashes = new Set<string>();
    for (const photo of Object.values(PHOTOS)) {
      expect(photo.src).toMatch(/^\/images\/.+\.(webp|jpg)$/);
      const bytes = readFileSync(resolve('public', photo.src.slice(1)));
      expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
      expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
      const hash = createHash('sha256').update(bytes).digest('hex');
      expect(hashes.has(hash)).toBe(false);
      hashes.add(hash);
      expect(photo.srcSet).toBe(`${photo.src} ${photo.width}w`);
      expect(photo.width).toBeGreaterThanOrEqual(480);
      expect(photo.height).toBeGreaterThan(0);
    }
  });

  it('has no duplicate source images and preserves all protected originals', () => {
    const audit = JSON.parse(readFileSync(resolve('docs/image-cleanup.json'), 'utf8')) as {
      protectedFiles: { file: string; sha256: string }[];
      removedFiles: { file: string; retained: string }[];
    };
    const hashes = new Set<string>();
    const scan = (directory: string) => {
      for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const file = resolve(directory, entry.name);
        if (entry.isDirectory()) scan(file);
        else if (/\.(jpg|jpeg|webp|png|avif|gif|svg|ico)$/i.test(entry.name)) {
          const hash = createHash('sha256').update(readFileSync(file)).digest('hex');
          expect(hashes.has(hash), `Duplicate image: ${file}`).toBe(false);
          hashes.add(hash);
        }
      }
    };
    scan(resolve('public'));
    // 17 photographs, the preserved original favicon, and the new logo/favicon.
    expect(hashes.size).toBe(20);
    for (const file of audit.protectedFiles) {
      expect(createHash('sha256').update(readFileSync(resolve(file.file))).digest('hex')).toBe(file.sha256);
    }
    for (const file of audit.removedFiles) {
      expect(existsSync(resolve(file.file))).toBe(false);
      expect(existsSync(resolve(file.retained))).toBe(true);
    }
  });
});
