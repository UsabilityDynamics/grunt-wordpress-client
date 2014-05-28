/*
 * grunt-awspublish
 * https://github.com/pgherveou/awspublish
 *
 * Copyright (c) 2013 PG
 * Licensed under the MIT license.
 */
module.exports = function( grunt ) {

  var joinPath  = require( 'path' ).join;
  var dirname   = require( 'path' ).dirname;
  var findup    = require( 'findup-sync' );

  grunt.loadTasks( joinPath( dirname( findup( 'package.json' ) ), 'tasks' ) );

  //grunt.log.writeln( 'asdf' );
  grunt.initConfig({

    wordpress: {

      // configure client settings
      options: {
        url: "http://wordpress.dev",
        username: "admin",
        password: "password"
      },

      // Create posts from array of objects
      newPosts: {
        posts: [
          {},
          {}
        ]
      },

      // Create new terms from array of objects
      newTerms: {
        terms: [
          {}
        ]
      },

      // Uplaod media items from array of objects, referencing files
      uploadMedia: {
        upload: [
          {}
        ]
      },

      // Setting settings
      setOptions: {
        options: [
          {},
          {}
        ]

      }

    },

    // Unrelated settings.
    settings: {
      some:'other-setting'
    }

  });

  // Default Task.
  grunt.registerTask( 'default',            [ 'wordpress' ] );
  grunt.registerTask( 'generate-dummy',     [ 'wordpress:newPosts' ] );
  grunt.registerTask( 'sync-posts',         [ 'wordpress:newTerms' ]) ;
  grunt.registerTask( 'upload-media',       [ 'wordpress:uploadMedia' ] );

};
