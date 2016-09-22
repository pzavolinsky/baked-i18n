"use strict";
var fs_1 = require('fs');
exports.fromString = function (findMatch, s) {
    var ret = [];
    var start = 0;
    while (true) {
        var m = findMatch.exec(s);
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
exports.fromFile = function (findMatch, file) {
    return exports.fromString(findMatch, fs_1.readFileSync(file, { encoding: 'utf8' }));
};
