"use strict";
var map_translation_1 = require('./map-translation');
var index_1 = require('./index');
var files_1 = require('./files');
var args = process.argv.slice(1);
if (args.length < 3) {
    console.error("usage: node " + args[0] + " source locales...\n\n    source:    the source file to translate\n\n    templates: one or more JSON translation files\n\n  ");
    process.exit(1);
}
var sourceFileName = args[1];
var locales = args.slice(2);
var localeExpr = /.*culture.(.*).locale\.json/;
var source = files_1.loadSource(sourceFileName);
var translations = locales.map(function (l) { return map_translation_1.default(files_1.loadLocale(l)); });
var translatedSources = index_1.translateMany(translations, source);
files_1.saveTranslations(sourceFileName, localeExpr, locales, translatedSources);
