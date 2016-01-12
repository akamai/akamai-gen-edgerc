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

var cliConfig = require('../src/cli-config');
var mocha = require('mocha');
var chai = require('chai');
var assert = require('chai').assert;

// Expected default args object: 
// { file: '', section: 'default', path: '~/.edgerc' }

describe('cli-config', function() {
  describe("#getArguments()", function() {
    var args;

    // Get arguments before starting tests
    before(function() {
      args = cliConfig.getArguments();
    });

    it("Should return an object containing properties 'file', 'section', and 'path'", function() {
      assert.isObject(args);
      assert.property(args, "file");
      assert.property(args, "section");
      assert.property(args, "path");
    });

    it("Default value for 'file' property should be an empty string", function() {
      assert.equal(args.file, "");
    });

    it("Default value for 'section' property should be 'default'", function() {
      assert.equal(args.section, "default");
    });

    it("Default value for 'path' property should be '~/.edgerc'", function() {
      assert.equal(args.path, "~/.edgerc");
    });
  });

  describe("#getUsage()", function() {
    var usage;

    before(function() {
      usage = cliConfig.getUsage();
    });

    it("Should return a string containing the usage guidelines", function() {
      assert.isString(usage);
    });
  });
});
