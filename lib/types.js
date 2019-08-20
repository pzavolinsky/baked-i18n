"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConst = function (node) {
    return !node.key;
};
exports.isMatch = function (node) {
    return !!node.key;
};
