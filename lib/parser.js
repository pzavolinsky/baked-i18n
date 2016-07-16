"use strict";
exports.extract = function (s) {
    var findMatch = /_\('((?:[^']|\\')*)'\)/g;
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
