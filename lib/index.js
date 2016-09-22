"use strict";
var options_1 = require('./options');
var translate_1 = require('./translate');
var output_1 = require('./output');
var tx = function (source) { return function (t) { return output_1.toString(translate_1.translate(t, source)); }; };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (options) {
    return options_1.getLocales(options)
        .map(tx(options_1.getSource(options)));
};
