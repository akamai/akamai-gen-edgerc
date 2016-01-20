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

var edgercWriter = require('../src/edgerc-writer');
var fsUtils = require('../src/fs-utils');
var mocha = require('mocha');
var chai = require('chai');
var assert = require('chai').assert;
var path = require('path');
var os = require('os');
var fs = require('fs');

// Sample section block to use for testing
var sectionBlock = "[default]\n" +
  "client_secret = xxxxxxxxxxxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxx=\n" +
  "host = xxxx-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx.luna.akamaiapis.net/\n" +
  "access_token = akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx\n" +
  "client_token = akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx\n" +
  "client_token = akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx\n" +
  "max-body = 131072 \n\n";


describe("edgerc-writer", function() {
  var testEdgerc = path.join(__dirname, "/data/.edgercTest");
  var edgercPath = path.join(__dirname, "/data/.edgerc");
  var section = "default";
  var host = "xxxx-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx.luna.akamaiapis.net/";
  var secret = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxx=";
  var accessToken = "akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx";
  var clientToken = "akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx";

  ///////////////////////////
  // createSectionBlock
  ///////////////////////////
  describe("#createSectionBlock()", function() {
    it("Returns a properly formatted section block string.",
      function() {
        var block = edgercWriter.createSectionBlock(
          section,
          host,
          secret,
          accessToken,
          clientToken);

        assert.equal(block, sectionBlock);
      });
  });


  ///////////////////////////
  // writeEdgercParams
  ///////////////////////////
  describe("#writeEdgercParams()", function() {


    beforeEach(function() {
      // Remove section from .edgerc if it exists
      // edgercWriter.writeEdgercParams(
      //   edgercPath,
      //   section,
      //   host,
      //   secret,
      //   accessToken,
      //   clientToken,
      //   function(err, data) {
      //     if (err) throw err;
      //     console.log(data);
      //   });
    });

    it("Creates an .edgerc file if it does not exist.",
      function(done) {
        // Remove .edgerc test file if it exists
        fsUtils.removeFile(testEdgerc);
        assert.isFalse(fsUtils.fileExists(testEdgerc));

        // Call writeEdgercParam which should create the file
        edgercWriter.writeEdgercParams(
          testEdgerc,
          section,
          host,
          secret,
          accessToken,
          clientToken,
          function(err, data) {
            if (err) assert.fail(error);
            assert.isTrue(fsUtils.fileExists(testEdgerc));
            done();
          });
      });

    it("Writes a section block to the .edgerc file.",
      function(done) {
        edgercWriter.writeEdgercParams(
          testEdgerc,
          section,
          host,
          secret,
          accessToken,
          clientToken,
          function(err, data) {
            if (err) assert.fail(error);

            // Verify block was written
            var readBlock = fsUtils.readFileSync(testEdgerc);
            assert.equal(readBlock, sectionBlock);
            done();
          });
      });
  });

  ///////////////////////////
  // writeEdgercBlock
  ///////////////////////////
  describe("#writeEdgercBlock()", function() {
    var edgercPath = path.join(__dirname, "/data/.edgerc");
    var section = "default";
    var host = "xxxx-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx.luna.akamaiapis.net/";
    var secret = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxx=";
    var accessToken = "akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx";
    var clientToken = "akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx";

    beforeEach(function() {
      // Remove section from .edgerc if it exists
      // edgercWriter.writeEdgercParams(
      //   edgercPath,
      //   section,
      //   host,
      //   secret,
      //   accessToken,
      //   clientToken,
      //   function(err, data) {
      //     if (err) throw err;
      //     console.log(data);
      //   });
    });

    it("Creates an .edgerc file if it does not exist.",
      function(done) {
        // Remove .edgerc test file if it exists
        fsUtils.removeFile(testEdgerc);
        assert.isFalse(fsUtils.fileExists(testEdgerc));

        // Call writeEdgercBlock which should create the file
        edgercWriter.writeEdgercBlock(testEdgerc, sectionBlock,
          function(err, data) {
            if (err) assert.fail(error);
            assert.isTrue(fsUtils.fileExists(testEdgerc));
            done();
          });
      });

    it("Writes a section block to the .edgerc file.",
      function(done) {
        edgercWriter.writeEdgercBlock(testEdgerc, sectionBlock,
          function(err, data) {
            if (err) assert.fail(error);

            // Verify block was written
            var readBlock = fsUtils.readFileSync(testEdgerc);
            assert.equal(readBlock, sectionBlock);
            done();
          });
      });
  });
});
