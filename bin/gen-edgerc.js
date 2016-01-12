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


// AUTHROIZATIN INPUT FORMAT
// Client Information

// Name: Kyle Purge
// Base URL: https://akab-eqmhvsc2nagrbmcg-za5rclzuep23by7l.purge.akamaiapis.net/

// Access Tokens:

//     akab-pgnuvfzh74rsp2dw-pkx63avp4e5qyuko


// Client Credentials:

//     Client token: akab-73lzpbyfbybg6uen-s2rbgh74zwnbsbkr     Secret: K+KuCAcWgkGU3n4g4Pb8hAjWQlamQw1cO0vRSVIsbEQ=




// OUTPUT FORMAT TO EDGERC
// client_secret = /FGrs75SdJxqAKxzUEE9ymQoJ+d74hoLNW6Mny1Yui0=
// host = akab-w52mdmawb6zlksg3-xxtcr7cvj55v5tno.luna.akamaiapis.net/
// access_token = akab-amcrjo45s2tiixp3-p37rjgpuuuy66tlr
// client_token = akab-56x2koc4pqdwxe4u-g2jhsuxdyfka45n7
// max-body = 131072

if( args.file ){
  var fieldList;
  var fields = [];

  // Read the file
  fs.readFile( args.file, 'utf8', function(err, data){
    if( err ){
      console.log("Error: ", err);
    }

    if( data ){
      // Strip out newlines and carriage returns
      data = data.replace(/(?:\r\n|\r|\n)/,"");

      // Split the data up into fields by whitespace
      fieldList = data.split(/\s+/); 

      // console.log("Split Data: ", fieldList);
      console.log(fieldList.length);

      // Find the indeces that end with a ":" character, thus delineating
      // that the index to follow will contain a value.
      var i = 0;
      while( i < fieldList.length ){
        if( fieldList[i].search(/:$/) !== -1 ){
          console.log(fieldList[i]);
          fields[fieldList[i]] = fieldList[i+1];
        }
        i++;
      }

      console.log("Fields: ", fields);
    }

    //console.log("File Data:\n ", data);
  });
}

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
