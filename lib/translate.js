"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (translation) {
    return function (_a) {
        var start = _a.start, end = _a.end, key = _a.key;
        return ({
            start: start,
            end: end,
            key: key,
            text: "\"" + (translation[key] || key).replace(/"/g, '\\"') + "\"",
            found: !!translation[key]
        });
    };
};
