"use strict";
var utils_1 = require('./utils');
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
