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

var commandLineArgs = require('command-line-args');
var os = require('os');

// Returns an object containing the parameters that were passed in
// via the command line.
exports.getArguments = function() {
  return createArguments().parse();
};

// Returns a string containing the usage guidelines for the command line args
exports.getUsage = function() {
  return createArguments().getUsage();
};

// Create and return an instance of the CommandLineArgs object with the desired 
// arguments specified.
function createArguments() {
  var cli = commandLineArgs([{
    name: 'file',
    alias: 'f',
    type: String,
    defaultValue: "",
    description: "Full path to the credentials file.",
    required: true
  }, {
    name: 'section',
    alias: 's',
    type: String,
    defaultValue: "default",
    description: "Title of the section that will be added to the .edgerc file."
  }, {
    name: 'path',
    alias: 'p',
    type: String,
    defaultValue: os.homedir() + "/.edgerc",
    description: "Full path to the .edgerc file."
  }, {
    name: 'help',
    alias: 'h',
    description: "Display help and usage information."
  }]);

  return cli;
}
