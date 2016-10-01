import { writeFileSync } from 'fs';
import * as parseArgs from 'minimist';
import { advancedBake } from './index';
import { getTranslatedFileName } from './utils';

const args = parseArgs(process.argv.slice(2), {
  boolean: ['warn-extra', 'warn-missing', 'warn-all', 'fail', 'help', 'silent'],
  string: ['out', 'culture', 'translate'],
  alias: { w: 'warn-all', h: 'help', s: 'silent', o: 'out' }
});

const defaultLocaleRe = '.*([a-z]{2}-[A-Z]{2}).*\.json$';

const showUsage = () => {
  console.error(`
  Usage: bake-i18n [options] source locales...

    source:    the source file to translate

    locales:   one or more JSON translation files

  Input Options:
    --culture REGEX     The JS regex that will be used to extract the culture
                        information from the locale path. The first capture of
                        this regex should match the culture.
                          (defaults to: ${defaultLocaleRe})

    --translate NAME    The name of the translation function used in source.
                          (defaults to '_')

  Output Options:
    --out DIR, -o       Output directory (defaults to source's directory)
    --silent, -s        Do not print the generated file names unless they have
                        warnings
    --fail              Exit with -1 if the process ended with warnings
    --warn-all, -w      The same as --warn-missing and --warn-extra
    --warn-extra        Warn when the locale file contains unused translations
    --warn-missing      Warn when a translation required by source is missing in
                        the locale file
  `);
  process.exit(1);
};
// tslint:disable:no-string-literal
const [sourcePath, ...localePaths] = args._;
const help        = args['help'];
const warnAll     = args['warn-all'];
const warnExtra   = warnAll || args['warn-extra'];
const warnMissing = warnAll || args['warn-missing'];
const { fail, silent, out } = args;
const localeRe    = new RegExp(args['culture'] || defaultLocaleRe);

if (!sourcePath
  || !localePaths
  || !localePaths.length
  || help) showUsage();

const results = advancedBake({
  sourcePath,
  localePaths,
  translateFunction: args['translate']
});

const write = (path:string, index:number):boolean => {
  const result = results[index];
  writeFileSync(path, result.text);
  const succeeded = !result.extra.length && !result.missing.length;
  if (!silent || !succeeded && (warnExtra || warnMissing)) {
    console.log(`Generated ${path}`);
  }
  if (warnExtra && result.extra.length) {
    result.extra.forEach(k => console.warn(`[WARN] Extra key: ${k}`));
  }
  if (warnMissing && result.missing.length) {
    result.missing.forEach(k => console.warn(`[WARN] Missing key: ${k}`));
  }

  return succeeded;
};

const succeeded = localePaths
  .map(getTranslatedFileName(localeRe, sourcePath, out))
  .map(write)
  .reduce((a, b) => a && b);

if (fail && !succeeded) {
  process.exit(-1);
}
