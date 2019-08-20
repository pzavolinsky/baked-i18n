"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
exports.toString = function (translation) {
    return translation.map(function (n) { return n.text; }).join('');
};
exports.toFile = function (path, translation) {
    return fs_1.writeFileSync(path, exports.toString(translation));
};
