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

var authParser = require('../src/auth-parser');
var mocha = require('mocha');
var chai = require('chai');
var assert = require('chai').assert;
var path = require('path');
var os = require('os');

describe("auth-parser", function() {
  describe("#parseAuth()", function() {
    var authFieldsList;
    var authPath = path.join(__dirname, "/data/sample-auth.txt");

    before(function(done) {
      authFieldsList = authParser.parseAuth(authPath, function(err, data) {
        if (err) throw err;
        authFieldsList = data;
        done();
      });
    });

    it("Should return an array of data parsed from a client authorization file.", function() {
      assert.isArray(authFieldsList);
    });

    it("Should contain property 'URL:' with a String for a value.", function() {
      assert.property(authFieldsList, "URL:");
      assert.isDefined(authFieldsList['URL:']);
      assert.isString(authFieldsList['URL:']);
    });

    it("The 'URL:' property should not contain 'https://' as part of its' value.", function() {
      assert.notInclude(authFieldsList["URL:"], 'https://');
    });

    it("Should contain property 'Tokens:' with a String for a value.", function() {
      assert.property(authFieldsList, "Tokens:");
      assert.isDefined(authFieldsList['Tokens:']);
      assert.isString(authFieldsList['Tokens:']);
    });

    it("Should contain property 'token:' with a String for a value.", function() {
      assert.property(authFieldsList, "token:");
      assert.isDefined(authFieldsList['token:']);
      assert.isString(authFieldsList['token:']);
    });

    it("Should contain property 'Secret:' with a String for a value.", function() {
      assert.property(authFieldsList, "Secret:");
      assert.isDefined(authFieldsList['Secret:']);
      assert.isString(authFieldsList['Secret:']);
    });
  });
});
