import { basename, extname, dirname, join } from 'path';
import { readFileSync } from 'fs';

export const getTranslatedFileName = (
  localeExpr:RegExp,
  sourcePath:string,
  outputDirectory?:string
) => {
  const ext = extname(sourcePath);
  const dir = outputDirectory || dirname(sourcePath);
  const base = join(dir, basename(sourcePath, ext));

  return (localeFileName:string):string => {
    const culture = localeFileName.replace(localeExpr, '$1');
    const suffix = culture == localeFileName
      ? basename(localeFileName, extname(localeFileName))
      : culture;

    return `${base}-${suffix}${ext}`;
  };
};

interface Set {
  [key:string]:boolean
}

export const makeSet = (keys:string[]):Set => {
  const o:Set = {};
  keys.forEach(k => o[k] = true);
  return o;
};

export const readFile = (path:string):string => {
  try {
    return readFileSync(path, { encoding: 'utf8' });
  } catch (e) {
    console.error(`[ERROR] Cannot load ${path}: ${e.message}`);
    process.exit(-1);
    return ''; // unreachable
  }
};
