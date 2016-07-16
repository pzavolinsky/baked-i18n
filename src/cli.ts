import translate from './map-translation';
import { translateMany } from './index';
import { loadSource, loadLocale, saveTranslations } from './files';

const args = process.argv.slice(1);

if (args.length < 3) {
  console.error(`usage: node ${args[0]} source locales...

    source:    the source file to translate

    templates: one or more JSON translation files

  `);
  process.exit(1);
}

const sourceFileName = args[1];
const locales = args.slice(2);
const localeExpr = /.*culture.(.*).locale\.json/;

const source = loadSource(sourceFileName);
const translations = locales.map(l => translate(loadLocale(l)));
const translatedSources = translateMany(translations, source);

saveTranslations(sourceFileName, localeExpr, locales, translatedSources);
