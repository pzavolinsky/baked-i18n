import { basename, extname, dirname, join } from 'path';

export const getTranslatedFileName = (
  localeExpr:RegExp,
  sourcePath:string
) => {
  const ext = extname(sourcePath);
  const dir = dirname(sourcePath);
  const base = join(dir, basename(sourcePath, ext));

  return (localeFileName:string):string =>
    `${base}-${localeFileName.replace(localeExpr, '$1')}${ext}`;
};
