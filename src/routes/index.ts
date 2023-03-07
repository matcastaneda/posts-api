import { Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';

const router = Router();

const PATH = `${__dirname}`;

const removeExtension = (fileName: string) => fileName.split('.').shift();

const isFileValid = (fileName: string): boolean => {
  const isRouteFile = fileName.endsWith('.route.ts') || fileName.endsWith('.route.js');
  const isIndexFile = fileName === 'index.ts' || fileName === 'index.route.ts';
  return isRouteFile && !isIndexFile;
};

const loadRoutes = async (path: string): Promise<string[]> => {
  const files = readdirSync(path);
  const validFiles = files.filter(file => isFileValid(file));

  await Promise.all(
    validFiles.map(async file => {
      const fileName = removeExtension(file);
      const importedFile = await import(join(path, file));
      router.use(`/${fileName}`, importedFile.router);
    }),
  );

  return validFiles;
};

loadRoutes(PATH).then(files => {
  files.length > 0
    ? console.log(
        `[🔎] Routes loaded: [${files
          .sort()
          .map(file => removeExtension(file)?.toUpperCase())
          .join(', ')}]`,
      )
    : console.log('[🔎] No routes found.');
});

export default router;
