/*
 * grunt-awspublish
 * https://github.com/pgherveou/awspublish
 *
 * Copyright (c) 2013 PG
 * Licensed under the MIT license.
 */
module.exports = function( grunt ) {

  var joinPath  = require( 'path' ).join;
  var findup    = require( 'findup-sync' );

  // Automatically Load Tasks.
  require( 'load-grunt-tasks' )( grunt, {
    config: './package.json',
    scope: 'devDependencies'
  });

  //grunt.log.writeln( 'asdf' );
  grunt.initConfig({

    wpClient: {
      url: 'http://my-site.com',
      blog: 1,
      username: 'admin',
      password: 'password'
    },

    package: grunt.file.readJSON( 'package.json' ),

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
        src: [ 'test/basic-*.js' ]
      },
      advanced: {
        src: [ 'test/advanced-*.js' ]
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
  grunt.loadTasks( 'tasks' );

  // Default Task.
  grunt.registerTask( 'default',         [ 'mochaTest' ]);

};
