'use strict';

var os = require('os');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').execSync;
var assert = require('assert');

module.exports = function() {

  var files;
  var tmpDir;
  var bakeCmd;
  function tmpFile(file) { return path.join(tmpDir, file); }

  this.registerHandler('BeforeFeatures', function(features) {
    if (!features.length) return;
    bakeCmd = path.normalize(
      path.join(
        path.dirname(features[0].getUri()),
        '..',
        'bin',
        'bake-i18n'
      )
    );
  });
  this.registerHandler('BeforeScenario', function(s) {
    files = [];
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'baked-i18n-tests--'));
  });
  this.registerHandler('AfterScenario', function() {
    fs.readdirSync(tmpDir).forEach(function(file) {
      fs.unlinkSync(tmpFile(file));
    });
    fs.rmdirSync(tmpDir);
  });

  this.Given(/^a file (.*) with$/, function(file, text) {
    fs.writeFileSync(tmpFile(file), text);
    files.push(file);
  });

  function runBake(args) {
    var expandedArgs = files.reduce(
      function(a, f) { return a.replace(f, tmpFile(f)); },
      args
    );
    exec(bakeCmd + ' ' + expandedArgs);
  }
  this.When(/^running bake\-i18n (.*)$/, runBake);
  this.When(/^running$/, function(cmd) {
    var args = cmd.replace(/^\s*bake-i18n +/, '');
    assert(
      args !== cmd,
      `When running command must start with 'bake-i18n'`
    );
    runBake(args);
  });

  this.Then(/^the file (.*) is$/, function(file, expectedText) {
    var actualText = fs.readFileSync(tmpFile(file), { encoding: 'utf8' });
    assert.equal(actualText, expectedText, `

      Expected ${file} to be:

      ${expectedText}

      but it is:

      ${actualText}

      `);
  });
};
