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

var fsUtils = require('../src/fs-utils');
var mocha = require('mocha');
var chai = require('chai');
var assert = require('chai').assert;
var path = require('path');


var dataBlock = "[default]\n" +
  "client_secret = xxxxxxxxxxxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxx=\n" +
  "host = xxxx-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx.luna.akamaiapis.net/\n" +
  "access_token = akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx\n" +
  "client_token = akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx\n" +
  "client_token = akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx\n" +
  "max-body = 131072 \n\n";


describe("fs-utils", function() {
  var testEdgerc;

  beforeEach(function() {
    testEdgerc = path.join(__dirname, "/data/.edgercTest");

    // Remove test files
    fsUtils.removeFile(testEdgerc);
  });

  ///////////////////////////
  // DOESFILEEXIST
  ///////////////////////////
  describe("#doesFileExist()", function() {
    it("Returns false if file does not exist", function() {
      assert.isFalse(fsUtils.doesFileExist(testEdgerc));
    });

    it("Returns true if file does exist", function() {
      fsUtils.createFileSync(testEdgerc);
      assert.isTrue(fsUtils.doesFileExist(testEdgerc));
    });
  });

  ///////////////////////////
  // CREATEFILE
  ///////////////////////////
  describe("#createFile()", function() {
    it("Returns file data if the file is created succesfully", function(done) {
      fsUtils.createFile(testEdgerc, function(err, data) {
        if (err) {
          console.log("Error creating file: ", err);
        } else if (data) {
          assert.isOk(data);
          done();
        }
      });
    });

    it("Returns an error if an error is received during file creation", function(done) {
      fsUtils.createFile('', function(err, data) {
        if (err) {
          assert.typeOf(err, 'error');
          done();
        }
      });
    });
  });

  ///////////////////////////
  // CREATEFILESYNC
  ///////////////////////////
  describe("#createFileSync()", function() {
    it("Returns true if the file is created succesfully", function() {
      assert.isTrue(fsUtils.createFileSync(testEdgerc));
    });

    it("Returns false if an error is received during file creation", function() {
      assert.isFalse(fsUtils.createFileSync(''));
    });
  });
});
