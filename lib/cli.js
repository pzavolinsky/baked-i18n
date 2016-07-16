"use strict";
var fs_1 = require('fs');
var translate_1 = require('./translate');
var index_1 = require('./index');
var fileName = process.argv.slice(1)[1];
var template = fs_1.readFileSync(fileName, { encoding: 'utf8' });
console.log(index_1.default(translate_1.default({ 'select': 'pipi' }), template));
