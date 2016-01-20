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

var cliConfig = require('../src/cli-config'),
  prompt = require('prompt'),
  fs = require('fs');

var args = cliConfig.getArguments();

// If help argument was listed, supply usage info
if (args.help) {
  console.log(cliConfig.getUsage());
}


// Check existance of ~/.edgerc. If it does not exist, create it
// Open file stream to ~/.edgerc
// 





// prompt.message = "#";
// prompt.delimiter = " ";
// prompt.start();

// prompt.get({
//       properties: {
//         authorization: {
//           description: "After authorizing your client in the OPEN API Administration tool,\n export the credentials and paste the contents of the export file below, \n then hit Enter.\n"
//         }
//       }
//     }, function(err, result) {
//       if (err) {
//         return onErr(err);
//       }
//       console.log('Command-line input received:');
//       console.log('  Auth: ' + result.authorization);
//     });


//     function onErr(err) {
//       console.log(err);
//       return 1;
//     }
