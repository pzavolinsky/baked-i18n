"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
exports.getTranslatedFileName = function (localeExpr, sourcePath, outputDirectory) {
    var ext = path_1.extname(sourcePath);
    var dir = outputDirectory || path_1.dirname(sourcePath);
    var base = path_1.join(dir, path_1.basename(sourcePath, ext));
    return function (localeFileName) {
        var culture = localeFileName.replace(localeExpr, '$1');
        var suffix = culture == localeFileName
            ? path_1.basename(localeFileName, path_1.extname(localeFileName))
            : culture;
        return base + "-" + suffix + ext;
    };
};
exports.makeSet = function (keys) {
    var o = {};
    keys.forEach(function (k) { return o[k] = true; });
    return o;
};
exports.readFile = function (path) {
    try {
        return fs_1.readFileSync(path, { encoding: 'utf8' });
    }
    catch (e) {
        console.error("[ERROR] Cannot load " + path + ": " + e.message);
        process.exit(-1);
        return ''; // unreachable
    }
};
