"use strict";
var utils_1 = require('./utils');
var fs_1 = require('fs');
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
exports.removeExtra = function (extra) { return function (locale) {
    return extra.length
        ? exports.fromObject(Object
            .keys(locale.nodes)
            .filter(function (k) { return extra.indexOf(k) == -1; })
            .reduce(function (o, k) { return Object.assign(o, (_a = {}, _a[k] = locale.nodes[k], _a)); var _a; }, {}))
        : locale;
}; };
exports.addMissing = function (missing) { return function (locale) {
    return missing.length
        ? exports.fromObject(missing.reduce(function (o, k) { return Object.assign(o, (_a = {}, _a[k] = '@@@@ TODO @@@@', _a)); var _a; }, Object.assign({}, locale.nodes)))
        : locale;
}; };
