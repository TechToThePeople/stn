//
// options-test.js - software tests for options.js
//
// by R. S. Doiel, <rsdoiel@gmail.com>
//

var	sys = require("sys"),
	assert = require("assert"),
	options = require("./options");

var help_has_args = false, 
	test_args = [ { args : ['testme', '-h', 'something else'], help_has_args : true, r : 'something else' },
		{ args : ['testme', '--help', 'something else'], help_has_args : true, r : 'something else' },
		{ args : ['testme', '--help="something else"'], help_has_args : true, r : 'something else' },
		{ args : ['testme', "--help='something else'"], help_has_args : true, r : 'something else' },
		{ args : ['testme', '--help=something_else'], help_has_args : true, r : 'something_else' },
		{ args : ['testme', '-h'], help_has_args : false, r : false },
		{ args : ['testme', '--help'], help_has_args : false, r : false },
	],
	test_no = 0;

console.log("Starting (options-test.js) ... " + new Date());

assert.equal(typeof options.set,'function', "Should see an exported set()");
assert.equal(typeof options.parse, 'function', "Should see an exported parse()");

help = function(next_arg) {
	if (next_arg) {
		help_has_args = true;
		assert.equal(next_arg, test_args[test_no].r, next_arg + " != " + test_args[test_no].r + " for " + JSON.stringify(test_args[test_no]));
	}
};

assert.ok(options.set(['-h','--help'], help, "Show the help document."), "set() should return true.");

for (i = 0; i < test_args.length; i += 1) {
	test_no = i;
	help_has_args = false;
	assert.ok(options.parse(test_args[i].args), "Should return true on successful parse(). for args: " + JSON.stringify(test_args[i]));
	assert.equal(help_has_args, test_args[i].help_has_args, "Should have updated help_has_args to " + test_args[i].help_has_args.toString() + " for args: " + JSON.stringify(test_args[i]));
}
console.log("Success! " + new Date());