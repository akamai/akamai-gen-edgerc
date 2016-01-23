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
var fs = require('fs-extra');
var ini = require('ini');

/**
 * Creates a new section in the .edgerc file or overwrites an existing 
 * section if found, using the provided paremeter values to fill in the
 * properties of the section.
 * @param  {String}     path        Full file path to the .edgerc file to write
 * @param  {String}     title       Title of the section to write to the .edgerc 
 *                                  file
 * @param  {String}     host        Value of the host property
 * @param  {String}     secret      Value of the client_secret property
 * @param  {String}     accessToken Value of the accest_token property
 * @param  {String}     clientToken Value of the client_token property
 * @param  {String}     maxBody     Value of the max-body property
 */
exports.writeEdgercSection = function(
  path,
  title,
  host,
  secret,
  accessToken,
  clientToken,
  maxBody) {

  // Ensure .edgerc file exists, creating it if not
  // fs.ensureFile(path, function(err) {
  //   console.log("Error:", err);
  //   console.log("ensureFileSynce()");
  // });

  try {
    fs.ensureFileSync(path);
  } catch (err) {
    console.log("EnsureFileSync()");
    console.log(err);
  }


  // Read the .edgerc file and parse as an ini Object
  var edgercObj = ini.parse(fs.readFileSync(path, 'utf-8'));

  // Create section Object
  var sectionObj = createSectionObj(
    host,
    secret,
    accessToken,
    clientToken,
    maxBody);

  // Add or update section data to the .edgerc ini Object
  edgercObj = addSection(edgercObj, title, sectionObj);

  // Write the .edgerc ini data back to the file
  fs.writeFileSync(path, ini.encode(edgercObj, {
    "whitespace": true
  }));
};

/**
 * Creates a properly formatted .edgerc section Object
 * 
 * @param  {String} section     The section title
 * @param  {String} host        The host value
 * @param  {String} secret      The secret value
 * @param  {String} accessToken The access token value
 * @param  {String} clientToken The client token value
 * @param  {String} max-body    The max body value
 * @return {String}             A properly formatted section block Object
 */
function createSectionObj(
  host,
  secret,
  accessToken,
  clientToken,
  maxBody) {

  var section = {};
  section.client_secret = secret;
  section.host = host;
  section.access_token = accessToken;
  section.client_token = clientToken;
  section["max-body"] = maxBody ? maxBody : "131072";
  return section;
}

/**
 * Adds a new section or updates an existing section of the supplied ini Object
 * 
 * @param {Object} iniObj      An Object representing the data in the .edgerc
 *                             file
 * @param {String} sectionName The name of the section to add or update
 * @param {Object} sectionObj  An Object representing the data to be written to
 *                             the ini object.
 */
function addSection(iniObj, sectionName, sectionObj) {
  iniObj[sectionName] = sectionObj;
  return iniObj;
}
