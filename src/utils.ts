import { basename, extname, dirname, join } from 'path';

export const getTranslatedFileName = (
  localeExpr:RegExp,
  sourcePath:string,
  outputDirectory?:string
) => {
  const ext = extname(sourcePath);
  const dir = outputDirectory || dirname(sourcePath);
  const base = join(dir, basename(sourcePath, ext));

  return (localeFileName:string):string =>
    `${base}-${localeFileName.replace(localeExpr, '$1')}${ext}`;
};

interface Set {
  [key:string]:boolean
}

export const makeSet = (keys:string[]):Set => {
  const o:Set = {};
  keys.forEach(k => o[k] = true);
  return o;
};
