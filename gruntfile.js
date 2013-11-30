/*
 * grunt-awspublish
 * https://github.com/pgherveou/awspublish
 *
 * Copyright (c) 2013 PG
 * Licensed under the MIT license.
 */
module.exports = function( grunt ) {
  var task = grunt.task;

  //grunt.log.writeln( 'asdf' );
  grunt.initConfig({
    client: {
      blogId: 12,
      username: 'raas',
      password: 'asdfviskkrdauhxpjrbccddm',
      url: 'http://discodonniepresents.com/system/xmlrpc.php'
    },
    aws: {
      key:'AKIAJD2H5SFPFLTM53OQ',
      secret:'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',
      bucket: 'media.discodonniepresents.com',
      region:'us-east-1'    
    },
    "wp-get-media": {
      1: { offset: 0, number: 10 },
      2: { offset: 10, number: 10 },
      3: { offset: 20, number: 10 },
      4: { offset: 30, number: 10 }
    },    
    concurrent: {
      options: { limit: 2 },
      tasks: [
        'wp-get-media:1', 
        'wp-get-media:2', 
        'wp-get-media:3', 
        'wp-get-media:4'
      ]
    },
    awspublish: {
      upload: {

          options: {
            key:'AKIAJD2H5SFPFLTM53OQ',
            secret:'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',
            bucket: 'media.discodonniepresents.com',
            sync: false
          },
          files: [        
            {
              expand: true,
              src: [ 'temp/*.*' ],
              dest: ''
            }
          ]   
        }
      }
  });

  // grunt.config.set('task.options.foo', 'bar');
  // grunt.option('foo', 'bar');

  // Register Internal Tasks.
  task.loadTasks( 'lib/tasks' );

  // Register External Tasks.
  grunt.loadNpmTasks( 'grunt-awspublish' );
  grunt.loadNpmTasks('grunt-concurrent');

  // Define Task Lists.
  task.registerTask( 'default',         [ 'wp-check-client', 'wp-get-media' ]);
  task.registerTask( 'provision',       [ 'wp-get-media', 'awspublish:upload' ]);

};
