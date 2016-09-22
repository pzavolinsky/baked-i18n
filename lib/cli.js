"use strict";
var fs_1 = require('fs');
var index_1 = require('./index');
var utils_1 = require('./utils');
var args = process.argv.slice(1);
if (args.length < 3) {
    console.error("usage: node " + args[0] + " source locales...\n\n    source:    the source file to translate\n\n    templates: one or more JSON translation files\n\n  ");
    process.exit(1);
}
var sourcePath = args[1];
var localePaths = args.slice(2);
var localeExpr = /.*(?:culture.|[/\\]|^)(.*)(?:.locale)?\.json$/;
var translations = index_1.default({
    sourcePath: sourcePath,
    localePaths: localePaths
});
var write = function (path, index) {
    fs_1.writeFileSync(path, translations[index]);
    console.log("Generated " + path);
};
localePaths
    .map(utils_1.getTranslatedFileName(localeExpr, sourcePath))
    .forEach(write);
