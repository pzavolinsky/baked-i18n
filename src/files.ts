import { readFileSync, writeFileSync } from 'fs';
import { basename, extname, dirname, join } from 'path';
import { Translation } from './types';

export const loadSource = (file:string):string =>
  readFileSync(file, { encoding: 'utf8' });

export const loadLocale = (file:string):Translation => {
  const content = readFileSync(file, { encoding: 'utf8' });
  try {
    return JSON.parse(content.trim());
  } catch (e) {
    console.error(`Error loading ${file}:`, e);
    throw e;
  }
};

const getTranslatedFileName = (
  sourceFileName:string,
  localeExpr:RegExp
) => {
  const ext = extname(sourceFileName);
  const dir = dirname(sourceFileName);
  const base = join(dir, basename(sourceFileName, ext));

  return (localeFileName:string):string =>
    `${base}-${localeFileName.replace(localeExpr, '$1')}${ext}`;
};

export const saveTranslations = (
  sourceFileName:string,
  localeExpr:RegExp,
  locales:string[],
  translations:string[]
) => {
  const getName = getTranslatedFileName(sourceFileName, localeExpr);
  locales.map(
    (l, i) => writeFileSync(
      getName(l),
      translations[i]
    )
  );
};
