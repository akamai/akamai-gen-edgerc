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

var edgercWrite = require('../src/edgerc-writer');
var mocha = require('mocha');
var chai = require('chai');
var assert = require('chai').assert;
var path = require('path');
var os = require('os');
var fs = require('fs');

describe("edgerc-writer", function() {
  describe("#writeEdgercParams()", function() {
    var edgercPath = path.join(__dirname, "/data/.edgerc");
    var section = "default";
    var host = "xxxx-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx.luna.akamaiapis.net/";
    var secret = "xxxxxxxxxxxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxx=";
    var accessToken = "akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx";
    var clientToken = "akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx";

    beforeEach(function() {
      // Remove data/.edgerc if it exists
      edgercWrite.writeEdgercParams(
        edgercPath,
        section,
        host,
        secret,
        accessToken,
        clientToken,
        function(err, data) {
          if (err) throw err;
          console.log(data);
        });
    });

    it("Creates an .edgerc file if it does not exist.", function(done) {
      fs.stat(edgercPath, function(err, stats) {
        if (err) throw err;
        assert.isTrue(stats.isFile());
        done();
      });
    });

    it("Creates a new default section in .edgerc if one does not exist", function(done) {
      var sectionBlock = "[default]\n" +
        "client_secret = xxxxxxxxxxxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxx=\n" +
        "host = xxxx-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx.luna.akamaiapis.net/\n" +
        "access_token = akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx\n" +
        "client_token = akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx\n" +
        "client_token = akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx\n" +
        "max-body = 131072 \n";

      console.log("Section Block: ", sectionBlock);
    });
  });
});
