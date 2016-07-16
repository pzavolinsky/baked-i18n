"use strict";
var fs_1 = require('fs');
var path_1 = require('path');
exports.loadSource = function (file) {
    return fs_1.readFileSync(file, { encoding: 'utf8' });
};
exports.loadLocale = function (file) {
    var content = fs_1.readFileSync(file, { encoding: 'utf8' });
    try {
        return JSON.parse(content.trim());
    }
    catch (e) {
        console.error("Error loading " + file + ":", e);
        throw e;
    }
};
var getTranslatedFileName = function (sourceFileName, localeExpr) {
    var ext = path_1.extname(sourceFileName);
    var dir = path_1.dirname(sourceFileName);
    var base = path_1.join(dir, path_1.basename(sourceFileName, ext));
    return function (localeFileName) {
        return (base + "-" + localeFileName.replace(localeExpr, '$1') + ext);
    };
};
exports.saveTranslations = function (sourceFileName, localeExpr, locales, translations) {
    var getName = getTranslatedFileName(sourceFileName, localeExpr);
    locales.map(function (l, i) { return fs_1.writeFileSync(getName(l), translations[i]); });
};
