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

// Sample data block for writing tests
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
  // fileExists
  ///////////////////////////
  describe("#fileExists()", function() {
    it("Returns false if file does not exist", function() {
      assert.isFalse(fsUtils.fileExists(testEdgerc));
    });

    it("Returns true if file does exist", function() {
      fsUtils.createFileSync(testEdgerc);
      assert.isTrue(fsUtils.fileExists(testEdgerc));
    });
  });

  ///////////////////////////
  // createFile
  ///////////////////////////
  describe("#createFile()", function() {
    it("Returns file data if the file is created succesfully", function(done) {
      fsUtils.createFile(testEdgerc, function(err, data) {
        if (err) {
          assert.fail(err);
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
  // createFileSync
  ///////////////////////////
  describe("#createFileSync()", function() {
    it("Returns true if the file is created succesfully", function() {
      assert.isTrue(fsUtils.createFileSync(testEdgerc));
    });

    it("Returns false if an error is received during file creation", function() {
      assert.isFalse(fsUtils.createFileSync(''));
    });
  });

  ///////////////////////////
  // readFile
  ///////////////////////////
  describe("#readFile()", function() {

    it("Returns file data if the file is read succesfully and it contains data", function(done) {
      fsUtils.createFileSync(testEdgerc);
      fsUtils.writeFileSync(testEdgerc, dataBlock);

      fsUtils.readFile(testEdgerc, function(err, data) {
        if (err) {
          assert.fail(err);
        } else if (data) {
          assert.equal(data, dataBlock);
          done();
        }
      });
    });

    it("Returns an error if an error is received during file read", function(done) {
      fsUtils.readFile('', function(err, data) {
        if (err) {
          assert.typeOf(err, 'error');
          done();
        }
      });
    });
  });

  ///////////////////////////
  // readFileSync
  ///////////////////////////
  describe("#readFileSync()", function() {
    it("Returns data if the file is read succesfully", function() {
      fsUtils.createFileSync(testEdgerc);
      assert.isDefined(fsUtils.readFileSync(testEdgerc));
    });

    it("Returns nothing if an error is received during file read", function() {
      assert.isUndefined(fsUtils.readFileSync(''));
    });
  });

  ///////////////////////////
  // writeFile
  ///////////////////////////
  describe("#writeFile()", function() {
    beforeEach(function() {
      fsUtils.createFileSync(testEdgerc);
    });

    it("Returns nothing if file is written succesfully", function(done) {
      fsUtils.writeFile(testEdgerc, dataBlock, false, function(err) {
        if (err) {
          assert.fail(err);
        }

        assert.isUndefined(err);
        done();
      });
    });

    it("Succesfully writes data to the file", function(done) {

      // Write data block to the file
      fsUtils.writeFile(testEdgerc, dataBlock, false, function(err) {
        if (err) {
          assert.fail(err);
        } else {
          // Verify data was written as expected
          var readData = fsUtils.readFileSync(testEdgerc);
          // console.log("Read Data: ", readData);
          assert.equal(readData, dataBlock);
          done();
        }
      });
    });

    ///////////////////////////
    // writeFileSync
    ///////////////////////////
    describe("#writeFileSync()", function() {
      it("Returns true if the file is read succesfully", function() {
        fsUtils.createFileSync(testEdgerc);
        assert.isTrue(fsUtils.writeFileSync(testEdgerc));
      });

      it("Returns false if an error is received during file read", function() {
        assert.isFalse(fsUtils.writeFileSync(''));
      });
    });
  });
});
