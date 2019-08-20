"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var source_1 = require("./source");
var locale_1 = require("./locale");
var isFileSource = function (options) {
    return !!options.sourcePath;
};
var getTranslateFunction = function (options) {
    return options.translateFunction || '_';
};
exports.getSourceForRegEx = function (translateFunction, options) {
    return isFileSource(options)
        ? source_1.fromFile(translateFunction, options.sourcePath)
        : source_1.fromString(translateFunction, options.source);
};
exports.getSource = function (options) {
    return exports.getSourceForRegEx(getTranslateFunction(options), options);
};
var isFilesLocales = function (options) {
    return !!options.localePaths;
};
var isStringLocales = function (options) {
    return !isFilesLocales(options)
        && options.locales
        && typeof options.locales[0] === 'string';
};
exports.getLocales = function (options) {
    return isFilesLocales(options)
        ? options.localePaths.map(locale_1.fromFile)
        : isStringLocales(options)
            ? options.locales.map(locale_1.fromString)
            : options.locales.map(locale_1.fromObject);
};
