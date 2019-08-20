"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var utils_1 = require("./utils");
var options_1 = require("./options");
var translate_1 = require("./translate");
var output_1 = require("./output");
var processLocale = function (source, sourceKeys) {
    return function (locale) {
        var nodes = translate_1.translate(locale, source);
        var localeNodes = locale.nodes;
        return {
            nodes: nodes,
            text: output_1.toString(nodes),
            locale: locale,
            missing: nodes
                .filter(function (n) { return types_1.isMatch(n) && !n.found; })
                .map(function (n) { return n.key; }),
            extra: Object.keys(localeNodes).filter(function (k) { return !sourceKeys[k]; })
        };
    };
};
exports.advancedBake = function (options) {
    var source = options_1.getSource(options);
    var locales = options_1.getLocales(options);
    var sourceKeys = utils_1.makeSet(source
        .filter(types_1.isMatch)
        .map(function (n) { return n.key; }));
    return locales.map(processLocale(source, sourceKeys));
};
// Maps each locale in options into the translated version of source
exports.default = (function (options) {
    return exports.advancedBake(options)
        .map(function (r) { return r.text; });
});
