import { writeFileSync } from 'fs';
import { basename } from 'path';
import * as parseArgs from 'minimist';
import { advancedBake } from './index';
import { getTranslatedFileName } from './utils';
import { addMissing, removeExtra, toFile } from './locale';

const args = parseArgs(process.argv.slice(2), {
  boolean: [
    'warn-extra', 'warn-missing', 'warn-all',
    'fix-extra', 'fix-missing', 'fix-alll',
    'fail', 'help', 'silent'],
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

  Fixing locale options:
    Note: fix options will modify the locale files in place, possible removing
    existing translations. Make sure those files are under source control or
    you have a backup before using fix options.

    --fix-all           The same as --fix-missing and --fix-extra
    --fix-extra         Remove translations from locale files that are not
                        required by the source file
    --fix-missing       Add TODO translations to locale files that are required
                        by the source file and not present in the locale file
  `);
  process.exit(1);
};
// tslint:disable:no-string-literal
const [sourcePath, ...localePaths] = args._;
const help        = args['help'];
const warnAll     = args['warn-all'];
const warnExtra   = warnAll || args['warn-extra'];
const warnMissing = warnAll || args['warn-missing'];

const fixAll      = args['fix-all'];
const fixExtra    = fixAll || args['fix-extra'];
const fixMissing  = fixAll || args['fix-missing'];

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

const warn = <T>(fn:(i:T) => string, items:T[]):void =>
  items.forEach(i => console.warn(`[WARN] ${fn(i)}`));

const write = (path:string, index:number):boolean => {
  const result = results[index];

  const succeeded = !result.extra.length && !result.missing.length;

  const fixes = [
    fixExtra   ? removeExtra(result.extra)  : undefined,
    fixMissing ? addMissing(result.missing) : undefined
  ].filter(fn => !!fn);

  if (!succeeded && fixes.length) {
    const localePath = localePaths[index];
    const fixedLocale = fixes.reduce((l, fn) => fn ? fn(l) : l, result.locale);
    toFile(localePath, fixedLocale);
    if (!silent) console.log(`Fixed ${localePath}`);
    return false;
  }

  writeFileSync(path, result.text);
  if (!silent) {
    console.log(`Generated ${path}${succeeded ? '' : ' (with warnings)'}`);
  }

  const base = basename(path);
  if (warnExtra) warn(k => `${base}: Extra key: ${k}`, result.extra);
  if (warnMissing) warn(k => `${base}: Missing key: ${k}`, result.missing);

  return succeeded;
};

const succeeded = localePaths
  .map(getTranslatedFileName(localeRe, sourcePath, out))
  .map(write)
  .reduce((a, b) => a && b);

if (fail && !succeeded) {
  process.exit(-1);
}
