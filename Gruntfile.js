/*
 * grunt
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT
 */

'use strict';

var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    livereload: {
      port: 35729 // Default livereload listening port.
    },

    connect: {
      livereload: {
        options: {
          base: 'markup/',
          //hostname: '192.168.1.60',
          port: 9001,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },

    less: {
      development: {
        options: {
          paths: ["markup/css/less"]
        },
        files: {
          "markup/css/core/core6.0.css": "markup/css/less/styles.less"
        }
      }
    },

    regarde: {
      css: {
        files: [
          'markup/**/*.less',
          'markup/**/*.html'
        ],
        tasks: ['reload']
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task.

    grunt.registerTask('build', [ 'less' ]);

    grunt.registerTask('reload', [ 'build', 'livereload' ]);
    grunt.registerTask('live', [ 'build', 'livereload-start', 'connect', 'regarde' ]);


    grunt.registerTask('default', ['live']);

};
