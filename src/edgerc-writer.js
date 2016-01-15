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

var path = require('path');
var fs = require('fs');

/**
 * writeEdgercParams Creates a new section in the .edgerc file or overwrites
 * an existing section if found, using the provided paremeter values to fill
 * in the properties of the section.
 * @param  {String}     path        Full file path to the .edgerc file to write
 * @param  {String}     section     Title of the section to write to the .edgerc file
 * @param  {String}     host        Value of the host property
 * @param  {String}     secret      Value of the client_secret property
 * @param  {String}     accessToken Value of the accest_token property
 * @param  {String}     clientToken Value of the client_token property
 * @param  {Function}   callback    The callback to call when finished writing
 */
exports.writeEdgercParams = function(
  path,
  section,
  host,
  secret,
  accessToken,
  clientToken,
  callback) {

  var fileData;

  // Read the file at filepath
  // fs.readFile(path, 'utf8', function(err, data) {
  //   if (err && err.code == "ENOENT") {
  //     // Create the data section and write the file. The file will be
  //     // created automatically during write.
  //     console.log("Do nothing, file will be created during write operation.");
  //     console.log(err);
  //   } else {
  //     fileData = data;
  //     console.log(".edgerc File Data: ", data);
  //     callback(null, data);
  //   }
  // });

  // Open file for reading and writing, creating it if it doesn't exist
  fs.open(path, 'w+', function(err, fd) {
    if (err) callback(err, null);
    var block = createSectionBlock(section, host, secret, accessToken, clientToken);
    var buf = new Buffer(block);
    fs.write(fd, block, 0, block.length, null, function(err, written, buffer) {
      if (err) throw err;
      console.log(err, written, buffer);
      fs.close(fd, function() {
        console.log('Done');
      });
    });
    callback(null, fd);
  });

  // Check for existing section, notify user if overwriting

};

/**
 * [writeEdgercBlock Creates a new section in the .edgerc file or overwrites
 * an existing section if found, using the provided block as the value to be
 * written.]
 * @param  {[type]}   path     [description]
 * @param  {[type]}   block    [description]
 * @param  {Function} callback [description]
 */
exports.writeEdgercBlock = function(path, block, callback) {

};



function createSectionBlock(
  section,
  host,
  secret,
  accessToken,
  clientToken) {
  var block = "";
  block += "[" + section + "]\n";
  block += "client_secret = " + secret + "\n";
  block += "host = " + host + "\n";
  block += "access_token = " + accessToken + "\n";
  block += "client_token = " + clientToken + "\n";
  block += "client_token = " + clientToken + "\n";
  block += "max-body = 131072 \n\n";
  return block;
}

// [default]
// client_secret = X6lpdoGBT3RnkF5BGTCVQq20lpTYsz1xFp43a7CDYgE=
// host = akab-onuzphpk5jotmfmj-couz3cnikiderksx.luna.akamaiapis.net/
// access_token = akab-km6yeorfbbmc6g2e-lz22p4nksvah5vhk
// client_token = akab-zxhviyo3itu3dh4g-xubwmuzfq6veetfo
// max-body = 131072
