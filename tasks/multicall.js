/**
 *
 * @param grunt
 */
function multiCall( grunt ) {

  grunt.registerMultiTask( 'wordpress.multiCall', 'Login into WP site via XML-RPC.', function wordpress( ) {
    grunt.log.writeln( 'Running wp.multiCall task.' );

    // Get dependencies.
    var async     = require( 'async' );
    var client    = require( 'wordpress-client' );

    // Setup Instance.
    var task      = this;
    var name      = task.name;
    var done      = task.async();
    var options   = task.options({ url: '' });

    // Create Session.
    var session    = client.create({
      url: options.url,
      blog: options.blog,
      username: options.username,
      password: options.password
    });

    var _items = [
      {
        methodName: 'wp.getPostTypes',
        params: [ session.get( 'blog' ), session.get( "username" ), session.get( "password" ) ]
      },
      {
        methodName: 'wp.getOptions',
        params: [ session.get( 'blog' ), session.get( "username" ), session.get( "password" ), [ 'large_size_w', 'large_size_h' ]  ]
      },
      {
        methodName: 'wp.getTaxonomies',
        params: [ session.get( 'blog' ), session.get( "username" ), session.get( "password" ) ]
      }
    ];

    session.once( 'connected', function( error, event ) {
      //console.log('Connect:', error ? error.message : this.get( 'methods' ) );

      if( error ) {
        return done( false );
      }

      session.multiCall( _items, function(err, results) {
        console.log( require( 'util' ).inspect( results, { showHidden: false, colors: true, depth: 2 } ) )

        done();

      });

    });

  });

}

Object.defineProperties( module.exports = multiCall, {
  client: {
    value: require( 'wordpress-client' ),
    enumerable: true,
    configurable: true,
    writable: true
  }
});
