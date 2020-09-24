#! /usr/bin/env node

/**
Copyright 2015 Akamai Technologies, Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.

You may obtain a copy of the License at 

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/

var mocha = require('mocha');
var chai = require('chai');
var assert = require('chai').assert;
var child = require('child_process');
var path = require('path');
var fs = require('fs-extra');
var concat = require('concat-stream');

var usage;

var exec;

describe('gen-edgerc', function() {

  before(function() {
    exec = path.join(__dirname, "..", "bin", "gen-edgerc.js");
  });

  it("Outputs a usage guide when the --help argument is passed.", function() {
    var proc = child.spawn(exec, ["--help"]);

    proc.stdout.pipe(concat(function(output) {
      var d = output.toString('utf8');
      var u = fs.readFileSync(path.join(__dirname, "data/usage.txt"), "utf-8");
      assert.equal(d, u);
    }));
  });

  it("Outputs a usage guide when the -h argument is passed.", function() {
    var proc = child.spawn(exec, ["-h"]);

    proc.stdout.pipe(concat(function(output) {
      var d = output.toString('utf8');
      var u = fs.readFileSync(path.join(__dirname, "data/usage.txt"), "utf-8");
      assert.equal(d, u);
    }));
  });

  // TODO: Write tests to cover remaining arguments
  // -f, --file string      Full path to the credentials file.                           
  // -s, --section string   Title of the section that will be added to the .edgerc file. 
  // -p, --path string      Full path to the .edgerc file.  
});
