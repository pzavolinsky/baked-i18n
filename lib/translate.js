"use strict";
var types_1 = require('./types');
exports.translate = function (translate, source) {
    return source.map(function (n) {
        return types_1.isMatch(n)
            ? translate(n)
            : n;
    });
};
