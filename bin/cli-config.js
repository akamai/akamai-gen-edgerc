var commandLineArgs = require('command-line-args');

// Returns an object containing the parameters that were passed in
// via the command line.
exports.getArguments = function() {
  // Configure accepted arguments
  var cli = commandLineArgs([{
    name: 'file',
    alias: 'f',
    type: String,
    defaultValue: ""
  }, {
    name: 'section',
    alias: 's',
    type: String,
    defaultValue: "default"
  }, {
    name: 'path',
    alias: 'p',
    type: String,
    defaultValue: "~/.edgerc"
  }]);

  // Return the parse arguments
  return cli.parse();
};
