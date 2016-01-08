var cliConfig = require('../bin/cli-config'),
  mocha = require('mocha'),
  chai = require('chai'),
  assert = require('chai').assert;

// Expected default args object: 
// { file: '', section: 'default', path: '~/.edgerc' }

describe('cli-config', function() {
  var args;

  // Get arguments before starting tests
  before(function() {
    args = cliConfig.getArguments();
  });

  describe("#getArguments()", function() {
    it("Should return an object containing properties 'file', 'section', and 'path'", function() {
      assert.isObject(args);
      assert.property(args, "file");
      assert.property(args, "section");
      assert.property(args, "path");
    });

    it("Default value for 'file' property should be an empty string", function() {
      assert.equal(args.file, "");
    });

    it("Default value for 'section' property should be 'default'", function() {
      assert.equal(args.section, "default");
    });

    it("Default value for 'path' property should be '~/.edgerc'", function() {
      assert.equal(args.path, "~/.edgerc");
    });
  });
});
