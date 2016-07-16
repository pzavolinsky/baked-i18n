"use strict";
exports.extract = function (s) {
    var findMatch = /_\('((?:[^']|\\')*)'\)/g;
    var ret = [];
    while (true) {
        var m = findMatch.exec(s);
        if (!m)
            break;
        ret.push({
            start: m.index,
            end: m.index + m[0].length,
            key: m[1]
        });
    }
    return ret;
};
exports.embed = function (s, embeds) {
    var last = 0;
    var items = embeds.map(function (_a) {
        var start = _a.start, end = _a.end, text = _a.text;
        var before = last;
        last = end;
        return { before: before, start: start, text: text };
    });
    return items
        .map(function (i) { return ("" + s.substring(i.before, i.start) + i.text); })
        .concat(s.slice(last))
        .join('');
};
