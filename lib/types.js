"use strict";
exports.isConst = function (node) {
    return !node.key;
};
exports.isMatch = function (node) {
    return !!node.key;
};
