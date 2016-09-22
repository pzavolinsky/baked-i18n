"use strict";
// Type guards as misc
exports.isConst = function (node) {
    return !node.key;
};
exports.isMatch = function (node) {
    return !!node.key;
};
