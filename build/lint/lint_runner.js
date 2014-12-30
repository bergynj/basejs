/* 
 *  @file Basic lint runner for JSHint.
 *  Based on https://github.com/jamesshore/Lessons-Learned-Lint-Javascript
 *  @author Nathanael Utama <nathan.utama@gmail.com>
 *  @version 0.1
 */

MY_GLOBALS = "test";

(function() {
    
    "use strict";
    
    var jshint = require("jshint").JSHINT;
    var fs = require("fs");
    
    var options = {
        bitwise: true,
        curly: true,
        strict: true,
        node: true
    };

    // set allowed global vars
    var globals = {
        MY_GLOBAL : true
    };

    function lintFileList(filenameList, options, globals) {
        var allPass = true;
        filenameList.forEach(function(filename){
            var pass = lintFile(filename, options, globals);
            allPass = allPass && pass;
        });
        return allPass;
    }

    function lintFile(filename, options, globals) {
        var sourceCode = fs.readFileSync(filename, "utf8");
        var pass = jshint(sourceCode, options, globals);

        if (pass) {
          console.log(filename + " ok");
        } else {
            console.log(filename + " failed");
            for (var i=0; i< jshint.errors.length; i++) {
                var error = jshint.errors[i];
                if (error) {
                   if (error.evidence) console.log(error.line + ": " + error.evidence.trim());
                   console.log("   " + error.reason);
                }
            }
        }

        return pass;
    }

    // main lint runner
    var filenames = [
        //"./example.js",
        "../../jakefile.js"
    ];

    lintFileList(filenames, options, globals);
    
}());
