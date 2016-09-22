import { writeFileSync } from 'fs';
import bake from './index';
import { getTranslatedFileName } from './utils';

const args = process.argv.slice(1);

if (args.length < 3) {
  console.error(`usage: node ${args[0]} source locales...

    source:    the source file to translate

    templates: one or more JSON translation files

  `);
  process.exit(1);
}

const sourcePath = args[1];
const localePaths = args.slice(2);
const localeExpr = /.*([a-z]{2}-[A-Z]{2}).*\.json$/;
const translations = bake({
  sourcePath,
  localePaths
});

const write = (path:string, index:number) => {
  writeFileSync(path, translations[index]);
  console.log(`Generated ${path}`);
};

localePaths
  .map(getTranslatedFileName(localeExpr, sourcePath))
  .forEach(write);
