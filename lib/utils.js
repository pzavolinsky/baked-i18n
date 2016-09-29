"use strict";
var path_1 = require('path');
exports.getTranslatedFileName = function (localeExpr, sourcePath, outputDirectory) {
    var ext = path_1.extname(sourcePath);
    var dir = outputDirectory || path_1.dirname(sourcePath);
    var base = path_1.join(dir, path_1.basename(sourcePath, ext));
    return function (localeFileName) {
        return (base + "-" + localeFileName.replace(localeExpr, '$1') + ext);
    };
};
exports.makeSet = function (keys) {
    var o = {};
    keys.forEach(function (k) { return o[k] = true; });
    return o;
};
