"use strict";
var fs_1 = require('fs');
exports.fromObject = function (translation) {
    return function (_a) {
        var key = _a.key;
        return ({
            key: key,
            text: "\"" + (translation[key] || key).replace(/"/g, '\\"') + "\"",
            found: !!translation[key]
        });
    };
};
exports.fromString = function (s) {
    return exports.fromObject(JSON.parse(s.trim()));
};
exports.fromFile = function (file) {
    var content = fs_1.readFileSync(file, { encoding: 'utf8' });
    try {
        return exports.fromString(content);
    }
    catch (e) {
        console.error("Error loading " + file + ":", e);
        throw e;
    }
};
