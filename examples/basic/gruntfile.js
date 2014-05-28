/*
 * grunt-awspublish
 * https://github.com/pgherveou/awspublish
 *
 * Copyright (c) 2013 PG
 * Licensed under the MIT license.
 */
module.exports = function( grunt ) {

  var joinPath  = require( 'path' ).join;
  var resolvePath  = require( 'path' ).resolve;
  var dirname   = require( 'path' ).dirname;
  var findup    = require( 'findup-sync' );

  grunt.loadTasks( joinPath( dirname( findup( 'package.json' ) ), 'tasks' ) );

  //grunt.log.writeln( 'asdf' );
  grunt.initConfig({
    settings: {
      some:'setting'
    },
    wordpress: {
      options: {
        url: "http://www.countrylife.co.uk/vendor/libraries/automattic/wordpress/xmlrpc.php",
        username: "api",
        password: "8MQtZqlJtDMl6BjN"
      },
      newPosts: {
        options: {
          test: true
        },
        posts: [
          {},
          {}
        ]
      },
      newTerms: {
        type: 'post',
        limit: 10
      },
      uploadMedia: {
        src: []
      }
    }
  });


  // Default Task.
  grunt.registerTask( 'default',            [ 'wordpress' ] );
  //grunt.registerTask( 'generate-dummy',     [ 'wordpress:dummy' ] );
  //grunt.registerTask( 'sync-posts',         [ 'wordpress:sync' ]) ;
  //grunt.registerTask( 'upload-media',         [ 'wordpress:media' ] );


};
