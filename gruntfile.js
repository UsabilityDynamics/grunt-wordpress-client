"use strict";

/*
 *
 * Copyright (c) 2014 UD
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  var joinPath = require('path').join;
  var findup = require('findup-sync');

  grunt.initConfig({

    package: grunt.file.readJSON('package.json'),

    wordpress: {
      options: {
        username: 'test',
        password: 'test',
        url: 'http://test.com'
      },
      wpNewPost: {
        // this values will be replaced with wpClient settings keys
        args: ['blog', 'username', 'password'],
        src: 'test/fixtures/*.json'
      },
      wpUploadFile: {
        args: ['blog', 'username', 'password'],
        src: 'test/fixtures/img/*.png'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tmp: ['tmp']
    },

    // Codex.
    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: 'readme.md',
            dest: 'static',
            ext: '.html'
          }
        ]
      }
    },

    // Tests.
    mochaTest: {
      options: {
        timeout: 10000,
        log: true,
        require: [ 'should' ],
        reporter: 'list',
        ui: 'exports'
      },
      basic: {
        src: [ 'static/testsbasic-*.js' ]
      },
      advanced: {
        src: [ 'static/testsadvanced-*.js' ]
      }
    },

    // Documentation.
    yuidoc: {
      compile: {
        name: '<%= package.name %>',
        description: '<%= package.description %>',
        version: '<%= package.version %>',
        url: '<%= package.homepage %>',
        logo: 'http://media.usabilitydynamics.com/logo.png',
        options: {
          paths: [ "./lib" ],
          outdir: './static/codex'
        }
      }
    }
  });

  // Register Internal Tasks.
  grunt.loadTasks('tasks');

  // Default Task.
  grunt.registerTask('default', [ '' ]);

};
