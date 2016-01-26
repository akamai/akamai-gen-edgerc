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

var cliConfig = require('../src/cli-config');
var authParser = require('../src/auth-parser');
var edgercWriter = require('../src/edgerc-writer');
var prompt = require('prompt');
var fs = require('fs-extra');
var readline = require('readline');

var clientAuthData;
var clientAuthParsed;
var args;

/**
 * Initialize the script, setting up default values, and prepping the
 * CLI params.
 */
function init() {
  // Retrieve any arguments passed in via the command line
  args = cliConfig.getArguments();

  // Supply usage info if help argument was passed
  if (args.help) {
    console.log(cliConfig.getUsage());
    process.exit(0);
  }

  getClientAuth(function(data) {
    parseClientAuth(data, function(err, data) {
      if (err) {
        console.error(err.message);
        process.exit(0);
      }
      writeEdgerc(data, function(err) {
        if (err) {
          if (err.errno == -13) {
            console.error("Unable to access " + err.path + ". Please make sure you " +
              "have permission to access this file or perhaps try running the " +
              "command as sudo.");
            process.exit(0);
          }
        }
        console.log("The section '" + args.section + "' has been succesfully added to " + args.path + "\n");
      });
    });
  });
}

init();

/**
 * Gets the client authorization data by either reading the file path
 * passed in by the user or requesting the user to copy and paste the
 * data directly into the command line.
 * 
 * @param  {Function} callback Callback function accepting a data param 
 *                             which will be called once the data is ready.
 */
function getClientAuth(callback) {
  console.log("This script will create a section named '" + args.section + "'" +
    "in the local " + args.path + " file.\n");

  // Read the client authorization file. If not found, notify user.
  if (args.file) {
    clientAuthData = fs.readFileSync(args.file, 'utf8');
    console.log("+++ Found authorization file: " + args.file);
    callback(clientAuthData);
  } else {
    // Present user with input dialogue requesting copy and paste of
    // client auth data.
    var input = [];

    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    var msg = "After authorizing your client in the OPEN API Administration " +
      "tool, \nexport the credentials and paste the contents of the export file " +
      "below (making sure to include the final blank line). \nThen enter " +
      "control-D to continue: \n\n>>>\n";

    rl.setPrompt(msg);
    rl.prompt();

    rl.on('line', function(cmd) {
      input.push(cmd);
    });

    rl.on('close', function(cmd) {
      if (input.length < 1) {
        // Data was not input, assumed early exit from the program.
        console.log("Kill command received without input. Exiting program.");
        process.exit(0);
      }
      console.log("\n<<<\n\n");
      clientAuthData = input.join('\n');
      callback(clientAuthData);
    });
  }
}

/**
 * Parses the client authorization file.
 * 
 * @param  {String}   data     Parsed array of client authorization data
 * @param  {Function} callback Callback function accepting an error parameter
 */
function parseClientAuth(data, callback) {
  authParser.parseAuth(data, function(err, data) {
    if (err) callback(err, null);
    callback(null, data);
  });
}

/**
 * Writes the parsed client auth data to the .edgerc file.
 * 
 * @param  {Array}   data       Array of parsed client auth data
 * @param  {Function} callback  unction to receive errors and handle completion
 */
function writeEdgerc(data, callback) {
  try {
    edgercWriter.writeEdgercSection(
      args.path,
      args.section,
      data["URL:"],
      data["Secret:"],
      data["Tokens:"],
      data["token:"],
      data["max-body"]
    );
  } catch (err) {
    callback(err);
  }

  return callback();
}
