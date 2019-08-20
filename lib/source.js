"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var args = "\\(('(?:[^']|\\\\')*'|\\\\\"(?:[^\"]|\\\\\\\\\")*\\\\\"|\"(?:[^\"]|\\\\\")*\")\\)";
exports.fromString = function (fnName, s) {
    var ret = [];
    var re = new RegExp("(?:[^a-zA-Z0-9_])(" + fnName + args + ")", 'g');
    var start = 0;
    while (true) {
        var m = re.exec(s);
        if (!m) {
            ret.push({ text: s.slice(start) });
            break;
        }
        var index = m.index + m[0].indexOf(fnName);
        if (start != index)
            ret.push({ text: s.substring(start, index) });
        start = index + m[1].length;
        ret.push({ key: getKeyFromMatched(m[2]) });
    }
    return ret;
};
exports.fromFile = function (fnName, file) {
    return exports.fromString(fnName, utils_1.readFile(file));
};
var getKeyFromMatched = function (matched) {
    var cleanText = matched.replace(/\\+/g, '');
    return cleanText.substring(1, cleanText.length - 1);
};
