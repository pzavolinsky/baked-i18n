"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
exports.translate = function (locale, source) {
    return source.map(function (n) {
        return types_1.isMatch(n)
            ? locale.apply(n)
            : n;
    });
};
