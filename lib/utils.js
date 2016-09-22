"use strict";
var path_1 = require('path');
exports.getTranslatedFileName = function (localeExpr, sourcePath) {
    var ext = path_1.extname(sourcePath);
    var dir = path_1.dirname(sourcePath);
    var base = path_1.join(dir, path_1.basename(sourcePath, ext));
    return function (localeFileName) {
        return (base + "-" + localeFileName.replace(localeExpr, '$1') + ext);
    };
};
