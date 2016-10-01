"use strict";
var fs_1 = require('fs');
var parseArgs = require('minimist');
var index_1 = require('./index');
var utils_1 = require('./utils');
var args = parseArgs(process.argv.slice(2), {
    boolean: ['warn-extra', 'warn-missing', 'warn-all', 'fail', 'help', 'silent'],
    string: ['out', 'culture', 'translate'],
    alias: { w: 'warn-all', h: 'help', s: 'silent', o: 'out' }
});
var defaultLocaleRe = '.*([a-z]{2}-[A-Z]{2}).*\.json$';
var showUsage = function () {
    console.error("\n  Usage: bake-i18n [options] source locales...\n\n    source:    the source file to translate\n\n    locales:   one or more JSON translation files\n\n  Input Options:\n    --culture REGEX     The JS regex that will be used to extract the culture\n                        information from the locale path. The first capture of\n                        this regex should match the culture.\n                          (defaults to: " + defaultLocaleRe + ")\n\n    --translate NAME    The name of the translation function used in source.\n                          (defaults to '_')\n\n  Output Options:\n    --out DIR, -o       Output directory (defaults to source's directory)\n    --silent, -s        Do not print the generated file names unless they have\n                        warnings\n    --fail              Exit with -1 if the process ended with warnings\n    --warn-all, -w      The same as --warn-missing and --warn-extra\n    --warn-extra        Warn when the locale file contains unused translations\n    --warn-missing      Warn when a translation required by source is missing in\n                        the locale file\n  ");
    process.exit(1);
};
// tslint:disable:no-string-literal
var _a = args._, sourcePath = _a[0], localePaths = _a.slice(1);
var help = args['help'];
var warnAll = args['warn-all'];
var warnExtra = warnAll || args['warn-extra'];
var warnMissing = warnAll || args['warn-missing'];
var fail = args.fail, silent = args.silent, out = args.out;
var localeRe = new RegExp(args['culture'] || defaultLocaleRe);
if (!sourcePath
    || !localePaths
    || !localePaths.length
    || help)
    showUsage();
var results = index_1.advancedBake({
    sourcePath: sourcePath,
    localePaths: localePaths,
    translateFunction: args['translate']
});
var write = function (path, index) {
    var result = results[index];
    fs_1.writeFileSync(path, result.text);
    var succeeded = !result.extra.length && !result.missing.length;
    if (!silent || !succeeded && (warnExtra || warnMissing)) {
        console.log("Generated " + path);
    }
    if (warnExtra && result.extra.length) {
        result.extra.forEach(function (k) { return console.warn("[WARN] Extra key: " + k); });
    }
    if (warnMissing && result.missing.length) {
        result.missing.forEach(function (k) { return console.warn("[WARN] Missing key: " + k); });
    }
    return succeeded;
};
var succeeded = localePaths
    .map(utils_1.getTranslatedFileName(localeRe, sourcePath, out))
    .map(write)
    .reduce(function (a, b) { return a && b; });
if (fail && !succeeded) {
    process.exit(-1);
}
