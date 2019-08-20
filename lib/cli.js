"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var parseArgs = require("minimist");
var index_1 = require("./index");
var utils_1 = require("./utils");
var locale_1 = require("./locale");
var args = parseArgs(process.argv.slice(2), {
    boolean: [
        'warn-extra', 'warn-missing', 'warn-all',
        'fix-extra', 'fix-missing', 'fix-all',
        'fail', 'help', 'silent'
    ],
    string: ['out', 'culture', 'translate'],
    alias: { w: 'warn-all', h: 'help', s: 'silent', o: 'out' }
});
var defaultLocaleRe = '.*([a-z]{2}-[A-Z]{2}).*\.json$';
var showUsage = function () {
    console.error("\n  Usage: bake-i18n [options] source locales...\n\n    source:    the source file to translate\n\n    locales:   one or more JSON translation files\n\n  Input Options:\n    --culture REGEX     The JS regex that will be used to extract the culture\n                        information from the locale path. The first capture of\n                        this regex should match the culture.\n                          (defaults to: " + defaultLocaleRe + ")\n\n    --translate NAME    The name of the translation function used in source.\n                          (defaults to '_')\n\n  Output Options:\n    --out DIR, -o       Output directory (defaults to source's directory)\n    --silent, -s        Do not print the generated file names unless they have\n                        warnings\n    --fail              Exit with -1 if the process ended with warnings\n    --warn-all, -w      The same as --warn-missing and --warn-extra\n    --warn-extra        Warn when the locale file contains unused translations\n    --warn-missing      Warn when a translation required by source is missing in\n                        the locale file\n\n  Fixing locale options:\n    Note: fix options will modify the locale files in place, possible removing\n    existing translations. Make sure those files are under source control or\n    you have a backup before using fix options.\n\n    --fix-all           The same as --fix-missing and --fix-extra\n    --fix-extra         Remove translations from locale files that are not\n                        required by the source file\n    --fix-missing       Add TODO translations to locale files that are required\n                        by the source file and not present in the locale file\n  ");
    process.exit(1);
};
var _a = args._, sourcePath = _a[0], localePaths = _a.slice(1);
var help = args['help'];
var warnAll = args['warn-all'];
var warnExtra = warnAll || args['warn-extra'];
var warnMissing = warnAll || args['warn-missing'];
var fixAll = args['fix-all'];
var fixExtra = fixAll || args['fix-extra'];
var fixMissing = fixAll || args['fix-missing'];
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
var warn = function (fn, items) {
    return items.forEach(function (i) { return console.warn("[WARN] " + fn(i)); });
};
var write = function (path, index) {
    var result = results[index];
    var succeeded = !result.extra.length && !result.missing.length;
    var fixes = [
        fixExtra ? locale_1.removeExtra(result.extra) : undefined,
        fixMissing ? locale_1.addMissing(result.missing) : undefined
    ].filter(function (fn) { return !!fn; });
    if (!succeeded && fixes.length) {
        var localePath = localePaths[index];
        var fixedLocale = fixes.reduce(function (l, fn) { return fn ? fn(l) : l; }, result.locale);
        locale_1.toFile(localePath, fixedLocale);
        if (!silent)
            console.log("Fixed " + localePath);
        return false;
    }
    fs_1.writeFileSync(path, result.text);
    if (!silent) {
        console.log("Generated " + path + (succeeded ? '' : ' (with warnings)'));
    }
    var base = path_1.basename(path);
    if (warnExtra)
        warn(function (k) { return base + ": Extra key: " + k; }, result.extra);
    if (warnMissing)
        warn(function (k) { return base + ": Missing key: " + k; }, result.missing);
    return succeeded;
};
var succeeded = localePaths
    .map(utils_1.getTranslatedFileName(localeRe, sourcePath, out))
    .map(write)
    .reduce(function (a, b) { return a && b; });
if (fail && !succeeded) {
    process.exit(-1);
}
