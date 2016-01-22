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

var fs = require('fs-extra');

/**
 * [parseAuth Reads the client authorization file provided by path, 
 * parses its' contents, and returns an Array containing pertinent
 * values found in the file.]
 * @param  {[String]}   filePath    [Full path to the client authorization text file]
 * @param  {Function}   callback    [Callback method to accept the returned Array]
 * @return {[Array]}                [Array of field values found in the authorization file]
 *
 * Example authorization file can be found in test/data/sample-auth.txt
 */
exports.parseAuth = function(filePath, callback) {
  var fieldList;
  var fields = [];

  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      return callback(err, null);
    }

    // Strip out newlines and carriage returns
    data = data.replace(/(?:\r\n|\r|\n)/, "");

    // Split the data up into fields by whitespace
    fieldList = data.split(/\s+/);

    // Find the indeces that end with a ":" character, thus delineating
    // that the index to follow will contain a value.
    var i = 0;
    while (i < fieldList.length) {
      if (fieldList[i].search(/:$/) !== -1) {
        fields[fieldList[i]] = fieldList[i + 1];
      }
      i++;
    }

    return callback(null, fields);
  });
};
