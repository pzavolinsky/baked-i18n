"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var fs_1 = require("fs");
exports.fromObject = function (nodes) { return ({
    nodes: nodes,
    apply: function (_a) {
        var key = _a.key;
        return ({
            key: key,
            text: "\"" + (nodes[key] || key).replace(/"/g, '\\"') + "\"",
            found: !!nodes[key]
        });
    }
}); };
exports.fromString = function (s) {
    return exports.fromObject(JSON.parse(s.trim()));
};
exports.fromFile = function (file) {
    var content = utils_1.readFile(file);
    try {
        return exports.fromString(content);
    }
    catch (e) {
        console.error("Error loading " + file + ":", e);
        throw e;
    }
};
exports.toFile = function (file, locale) {
    return fs_1.writeFileSync(file, JSON.stringify(locale.nodes, undefined, 2));
};
var getKeys = function (locale, extra) {
    if (extra === void 0) { extra = []; }
    var keys = Object.keys(locale.nodes).concat(extra);
    keys.sort();
    return keys;
};
exports.removeExtra = function (extra) { return function (locale) {
    return extra.length
        ? exports.fromObject(getKeys(locale)
            .filter(function (k) { return extra.indexOf(k) == -1; })
            .reduce(function (o, k) {
            var _a;
            return Object.assign(o, (_a = {},
                _a[k] = locale.nodes[k],
                _a));
        }, {}))
        : locale;
}; };
exports.addMissing = function (missing) { return function (locale) {
    return missing.length
        ? exports.fromObject(getKeys(locale, missing)
            .reduce(function (o, k) {
            var _a;
            return Object.assign(o, (_a = {},
                _a[k] = locale.nodes[k] || '@@@@ TODO @@@@',
                _a));
        }, {}))
        : locale;
}; };
