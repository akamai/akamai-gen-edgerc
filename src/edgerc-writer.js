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
var fsUtils = require('./fs-utils');
var ini = require('ini');

/**
 * Creates a new section in the .edgerc file or overwrites an existing 
 * section if found, using the provided paremeter values to fill in the
 * properties of the section.
 * @param  {String}     path        Full file path to the .edgerc file to write
 * @param  {String}     section     Title of the section to write to the .edgerc 
 *                                  file
 * @param  {String}     host        Value of the host property
 * @param  {String}     secret      Value of the client_secret property
 * @param  {String}     accessToken Value of the accest_token property
 * @param  {String}     clientToken Value of the client_token property
 * @param  {Function}   callback    The function to call when finished writing
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
  var block = this.createSectionBlock(
    section,
    host,
    secret,
    accessToken,
    clientToken);

  // Read .edgerc file
  var edgercData = ini.parse(fs.readFileSync(path, 'utf-8'));
  console.log(edgercData);

  // Check for existing section, notify user if overwriting
  if (edgercData[section]) {
    console.log("Section [" + section + "] already exists and will be updated.");
  }

  this.writeEdgercBlock(path, block, function(err, data) {
    if (err) callback(err, null);
    callback(null, data);
  });
};

/**
 * Creates a new section in the .edgerc file or overwrites an existing section
 * if found, using the provided block as the value to be written.
 * 
 * @param  {String}   path     Full file path to the .edgerc file to write
 * @param  {String}   block    The section block to be written to the .edgerc
 *                             file
 * @param  {Function} callback Function to accept error and data info
 */
exports.writeEdgercBlock = function(path, block, callback) {
  // Create file if it does not exists
  if (fsUtils.fileExists(path) === false) {
    var fileCreated = fsUtils.createFileSync(path);
    if (!fileCreated) callback(err, null);
  }

  // Write block to file
  fsUtils.writeFile(path, block, false, function(err, data) {
    if (err) callback(err, null);
    callback(null, true);
  });
};


/**
 * Creates a properly formatted .edgerc section string
 * 
 * @param  {String} section     The section title
 * @param  {String} host        The host value
 * @param  {String} secret      The secret value
 * @param  {String} accessToken The access token value
 * @param  {String} clientToken The client token value
 * @return {String}             A properly formated section block ready to write
 *                              to the .edgerc file
 */
exports.createSectionBlock = function(
  section,
  host,
  secret,
  accessToken,
  clientToken) {

  // Example Section Block
  // ==============================
  // [default]
  // client_secret = xxxxxxxxxxxxxxxxxxxxxxxxxxxx+xxxxxxxxxxxxxx=
  // host = xxxx-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx.luna.akamaiapis.net/
  // access_token = akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx
  // client_token = akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx
  // client_token = akab-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx
  // max-body = 131072 

  var block = "";
  block += "[" + section + "]\n";
  block += "client_secret = " + secret + "\n";
  block += "host = " + host + "\n";
  block += "access_token = " + accessToken + "\n";
  block += "client_token = " + clientToken + "\n";
  block += "client_token = " + clientToken + "\n";
  block += "max-body = 131072 \n\n";
  return block;
};
