"use strict";
var fs_1 = require('fs');
var args = "_(('(?:[^']|\\')*'|\"(?:[^']|\\')*\"))";
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
        ret.push({ key: m[1] });
    }
    return ret;
};
exports.fromFile = function (fnName, file) {
    return exports.fromString(fnName, fs_1.readFileSync(file, { encoding: 'utf8' }));
};
