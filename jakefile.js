/* 
 *  @file Build automation with jake.
 *  @author Nathanael Utama <nathan.utama@gmail.com>
 *  @version 0.1
 */

/*global desc, task, jake, fail, complete */

(function () {
    
    "use strict";

    task("default", ["lint"]);

    desc("Lint everything!");

    task("lint",[], function(){
        console.log("==== Start linting.. ====");
        var lint = require("./build/lint/lint_runner_lib.js");
        // lint.validateFile("jakefile.js", {}, {}); // single .js lint sample
 
        var options = {
            bitwise: true,
            curly: false,
            eqeqeq: true,
            forin: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            noempty: true,
            nonew: true,
            regexp: true,
            undef: true,
            strict: true,
            trailing: true,
            node: true
	};

        // get all js
        var files = new jake.FileList();
        files.include("**/*.js");   // double asterisk to include subfolders
        files.exclude("node_modules");
        files.exclude("build");
        lint.validateFileList(files.toArray(), options, {});
        
    });

    
}());


