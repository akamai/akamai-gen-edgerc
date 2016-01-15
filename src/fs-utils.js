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

var fs = require('fs');
var path = require('path');

/**
 * Return `true` if the file exists.
 * 
 * @param   {String}    filePath  The full path to the file in question
 * @return  {Boolean}             Whether or not the file exists
 */
exports.doesFileExist = function(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {}
  return false;
};

/**
 * Asynchronously creates a file at the given path.
 * 
 * @param  {String}   filePath The full path and name of the file to create
 * @param  {Function} callback Callback function that accepts an error and data 
 *                             parameter
 */
exports.createFile = function(filePath, callback) {
  fs.open(filePath, "wx", function(err, fd) {
    if (err) return callback(err, null);
    fs.close(fd, function(err) {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, fd);
      }
    });
  });
};

/**
 * Synchronously creates a file at the given path, returning `true` if 
 * successful and `false` if an error occurs.
 * 
 * @param  {String}   filePath The full path and name of the file to create
 * @return {Boolean} 
 */
exports.createFileSync = function(filePath) {
  try {
    var fd = fs.openSync(filePath, "wx");
    fs.close(fd);
  } catch (err) {
    return false;
  }
  return true;
};

/**
 * Asynchronously read the contents of a file and return the data.
 * 
 * @param  {String}   filePath The full path to the file to be read
 * @param  {Function} callback Callback function that accepts an error and data 
 *                             parameter
 */
exports.readFile = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, data);
    }
  });
};

/**
 * Synchronously read the contents of a file and return the data, returninig 
 * `true` if successful and `false` if an error occurs.
 * 
 * @param  {String}   filePath The full path to the file to be read
 * @param  {Function} callback Callback function that accepts an error and data 
 *                             parameter
 * @return {Boolean} 
 */
exports.readFileSync = function(filePath) {
  try {
    fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    return false;
  }

  return true;
};

/**
 * Asynchronously writes the provided data to the file at the given file path.
 * 
 * @param  {String}     filePath The full path to the file that should be written
 * @param  {String}     data     The data to write to the file
 * @param  {Boolean}    append   If True the data will be appended to the file,
 *                               if False, the data will be written
 * @param  {Function}   callback The callback function to return errors and data
 *                               to
 */
exports.writeFile = function(filePath, data, append, callback) {
  if (append) {
    fs.appendFile(filePath, data, 'utf8', function(err) {
      if (err) {
        return callback(err);
      }
    });
  } else {
    fs.writeFile(filePath, data, 'utf8', function(err) {
      if (err) {
        return callback(err);
      }
    });
  }
};

/**
 * Synchronously writes the provided data to the file at the given file path,
 * returning `true` if successful and `false` if an error occurs.
 * 
 * @param  {String}     filePath The full path to the file that should be written
 * @param  {String}     data     The data to write to the file
 * @param  {Boolean}    append   If True the data will be appended to the file,
 *                               if False, the data will be written
 * @return {Booealn}
 */
exports.writeFileSync = function(filePath, data, append) {
  if (append) {
    try {
      fs.appendFileSync(filePath, data, 'utf8');
    } catch (err) {
      return false;
    }
  } else {
    try {
      fs.writeFileSync(filePath, data, 'utf8');
    } catch (err) {
      return false;
    }
  }

  return true;
};

/**
 * Synchronously removes the file at the given path
 * 
 * @param  {String} filePath Full path to the file to remove
 */
exports.removeFile = function(filePath) {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {}
};
