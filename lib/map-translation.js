"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (translation) {
    return function (_a) {
        var key = _a.key;
        return ({
            key: key,
            text: "\"" + (translation[key] || key).replace(/"/g, '\\"') + "\"",
            found: !!translation[key]
        });
    };
};
