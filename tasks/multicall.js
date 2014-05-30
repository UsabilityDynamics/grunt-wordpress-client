/**
 *
 * @param grunt
 */
function taskGroup( grunt ) {

  grunt.registerTask( 'wpMultiCall', 'Login into WP site via XML-RPC.', function wordpress( type ) {
    grunt.log.subhead( 'Running task.' )

    var task      = this;
    var name      = task.name;
    var done      = task.async();
    var options   = task.options;
    var requires  = task.requires;

    var _steps = [
      function connect( fn ) {
        console.log('connect');

        client.create( task.options() ).once( 'connected', function( error, event ) {
          console.log('Connect:', error ? error.message : this.get( 'methods' ) );
          fn( error );
        });

      }
    ];

    // detct if "posts" is set, if so, create posts
    // detct if "terms" is set, if so, create terms
    // detct if "upload" is set, if so, upload to media library
    // detct if "options" is set, if so, update options in array

    async.waterfall( _steps, function( error ) {

      if ( !error ) {
        return done();
      }

      done( false );

    });

  });

}

Object.defineProperties( module.exports = taskGroup, {
  client: {
    value: require( 'wordpress-client' ),
    enumerable: true,
    configurable: true,
    writable: true
  }
});
