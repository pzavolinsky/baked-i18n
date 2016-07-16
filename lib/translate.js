"use strict";
var types_1 = require('./types');
var parser_1 = require('./parser');
var translateNodes = function (translate, nodes) {
    return nodes.map(function (n) {
        return types_1.isMatch(n)
            ? translate(n)
            : n;
    });
};
exports.translateMany = function (translate, source) {
    var nodes = parser_1.extract(source);
    return translate.map(function (t) {
        return parser_1.embed(source, translateNodes(t, nodes));
    });
};
exports.translateOne = function (translate, source) {
    return exports.translateMany([translate], source)[0];
};
