"use strict";
var utils_1 = require('./utils');
var args = "\\(('(?:[^']|\\\\')*'|\"(?:[^']|\\\\')*\")\\)";
exports.fromString = function (fnName, s) {
    var ret = [];
    var start = 0;
    var re = new RegExp("" + fnName + args, 'g');
    while (true) {
        var m = re.exec(s);
        if (!m) {
            ret.push({ text: s.slice(start) });
            break;
        }
        if (start != m.index)
            ret.push({ text: s.substring(start, m.index) });
        start = m.index + m[0].length;
        ret.push({ key: m[1].substring(1, m[1].length - 1) });
    }
    return ret;
};
exports.fromFile = function (fnName, file) {
    return exports.fromString(fnName, utils_1.readFile(file));
};
