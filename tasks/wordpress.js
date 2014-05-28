/**
 *
 * @param grunt
 */
function taskGroup( grunt ) {

  function config() {
    var target = grunt.config( "target" ) || grunt.config( "wordpress._default" ),
      base = grunt.config( "wordpress" );
    if ( target ) {
      return base[ target ];
    }
    return base;
  }

  //console.log( 'wordpress', grunt.options( ) );
  grunt.registerTask( 'wordpress', 'Login into WP site via XML-RPC.', taskGroup.wordpress );


}

Object.defineProperties( module.exports = taskGroup, {
  wordpress: {
    value: function wordpress( type ) {

      var fs        = require( 'fs' );
      var async     = require( 'async' );
      var path      = require( 'path' );
      var client    = require( '../lib/wordpress-client' );

      var task      = this;
      var name      = task.name;
      var done      = task.async();
      var options   = task.options;
      var requires  = task.requires;

      async.waterfall([
        function connect( fn ) {
          console.log('connect');

          client.create( task.options() ).once( 'connected', function() {
            console.log('connect to client');

            fn();

          });

        },
        function syncTerms( fn ) {
          console.log('syncTerms');
          fn();
        },

        function syncPosts( fn ) {
          console.log('syncPosts');
          fn();
        }
      ], function( error ) {

        if ( !error ) {
          return done();
        }

        done( false );

      });


    },
    enumerable: true,
    configurable: true,
    writable: true
  }
});
