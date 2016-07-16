"use strict";
var parser_1 = require('./parser');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (translate, source) {
    return parser_1.embed(source, parser_1.extract(source).map(translate));
};
