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
var mocha = require('mocha');
var chai = require('chai');
chai.use(require('chai-fs'));
var assert = require('chai').assert;
var path = require('path');
var os = require('os');
var fs = require('fs-extra');
var ini = require('ini');

var sectionObj = {
  "default": {
    "access_token": "akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx",
    "client_secret": "xxxxxxxxxxxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxx=",
    "client_token": "akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx",
    "host": "xxxx-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx.luna.akamaiapis.net/",
    "max-body": "131072"
  }
};

describe("edgerc-writer", function() {
  var testEdgerc = path.join(__dirname, "/data/.edgercTest");
  var edgercPath = path.join(__dirname, "/data/.edgerc");
  var section = "default";
  var host = "xxxx-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx.luna.akamaiapis.net/";
  var hostUpdate = "xxxx-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx.update.akamaiapis.net/";
  var secret = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxx=";
  var accessToken = "akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx";
  var clientToken = "akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx";
  var maxBody = "131072"
  var maxBodyCustom = "123456"

  ///////////////////////////
  // writeEdgercSection
  ///////////////////////////
  describe("#writeEdgercSection()", function() {


    beforeEach(function() {
      // Remove .edgerc file
      fs.removeSync(testEdgerc);
    });

    it("Creates an .edgerc file if it does not exist.",
      function() {
        // File does not exist
        // assert.notIsFile does not seem to be functioning properly
        // commenting out until his is fixed.
        // https://github.com/Bartvds/chai-fs/issues/9
        // 
        // assert.notIsFile(testEdgerc, "File does not exist.");

        // Call writeEdgercParam which should create the file
        callCreateSectionObj();

        // File exists
        assert.isFile(testEdgerc, "File was created.");
      });

    it("Adds a new section to the .edgerc file.",
      function() {
        // Create new section
        callCreateSectionObj();

        // Compare newly created section obj to exemplar
        var edgercObj = ini.parse(fs.readFileSync(testEdgerc, 'utf-8'));
        assert.deepEqual(edgercObj, sectionObj);
      });

    it("Updates an existing section of the .edgerc file.",
      function() {
        // Created section "default"
        callCreateSectionObj();

        // Update  section "default"
        edgercWriter.writeEdgercSection(
          testEdgerc,
          section,
          hostUpdate,
          secret,
          accessToken,
          clientToken,
          maxBody);

        // Check that the host property matches the updated value
        var edgercObj = ini.parse(fs.readFileSync(testEdgerc, 'utf-8'));
        assert.equal(edgercObj.default.host, hostUpdate);
      });

    it("Uses default max-body value if none provided.",
      function() {
        // Create new section
        edgercWriter.writeEdgercSection(
          testEdgerc,
          section,
          host,
          secret,
          accessToken,
          clientToken);

        // Compare newly created section obj to exemplar
        var edgercObj = ini.parse(fs.readFileSync(testEdgerc, 'utf-8'));
        assert.equal(edgercObj.default["max-body"], maxBody);
      });

    it("Uses provided max-body value if provided.",
      function() {
        // Create new section
        edgercWriter.writeEdgercSection(
          testEdgerc,
          section,
          host,
          secret,
          accessToken,
          clientToken,
          maxBodyCustom);

        // Compare newly created section obj to exemplar
        var edgercObj = ini.parse(fs.readFileSync(testEdgerc, 'utf-8'));
        assert.equal(edgercObj.default["max-body"], maxBodyCustom);
      });


    function callCreateSectionObj() {
      edgercWriter.writeEdgercSection(
        testEdgerc,
        section,
        host,
        secret,
        accessToken,
        clientToken,
        maxBody);
    }

    // it("Writes a section block to the .edgerc file.",
    //   function(done) {
    //     edgercWriter.writeEdgercSection(
    //       testEdgerc,
    //       section,
    //       host,
    //       secret,
    //       accessToken,
    //       clientToken,
    //       null,
    //       function(err, data) {
    //         if (err) assert.fail(error);

    //         // Verify block was written
    //         var readBlock = fsUtils.readFileSync(testEdgerc);
    //         assert.equal(readBlock, sectionBlock);
    //         done();
    //       });
    //   });
    // });
  });
});
