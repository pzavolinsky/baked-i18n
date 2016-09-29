import
  { fromString as sourceFromString
  , fromFile as sourceFromFile
  } from './source';
import
  { Translation
  , fromObject as localeFromObject
  , fromString as localeFromString
  , fromFile as localeFromFile
  } from './locale';

interface StringSource {
  source: string
}
interface FileSource {
  sourcePath: string
}
type SourceOptions = StringSource | FileSource;

interface ObjectLocales {
  locales: Translation[]
}
interface StringLocales {
  locales: string[]
}
interface FileLocales {
  localePaths: string[]
}
type LocalesOptions = ObjectLocales | StringLocales | FileLocales;

interface ProcessOptions {
  translateFunction?: string
}

export type Options
  = ProcessOptions
  & SourceOptions
  & LocalesOptions
  ;

const isFileSource = (options:SourceOptions):options is FileSource =>
  !!(options as FileSource).sourcePath;

const getTranslateFunction = (options:ProcessOptions):string =>
  options.translateFunction || '_';

export const getSourceForRegEx = (
  translateFunction:string,
  options:SourceOptions
) =>
  isFileSource(options)
    ? sourceFromFile(translateFunction, options.sourcePath)
    : sourceFromString(translateFunction, options.source);

export const getSource = (options:Options) =>
  getSourceForRegEx(
    getTranslateFunction(options),
    options
  );

const isFilesLocales = (options:LocalesOptions):options is FileLocales =>
  !!(options as FileLocales).localePaths;

const isStringLocales = (options:LocalesOptions):options is StringLocales =>
  !isFilesLocales(options)
  && options.locales
  && typeof options.locales[0] === 'string';

export const getLocales = (options:LocalesOptions) =>
  isFilesLocales(options)
  ? options.localePaths.map(localeFromFile)
  : isStringLocales(options)
    ? options.locales.map(localeFromString)
    : options.locales.map(localeFromObject);
