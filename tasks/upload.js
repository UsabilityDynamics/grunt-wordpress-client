/**
 *
 * @param grunt
 */
function uploadFiles( grunt ) {

  grunt.registerMultiTask( 'wordpress.uploadFile', 'WordPress RPC.', function( type ) {
    grunt.log.writeln( 'Running wordpress:uploadFiles task.' );

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

    _items.uploadFile({
      name: 'sample-cat.jpg',
      type: 'image/jpeg',
      //overwrite: false,
      //post_id: false,
      bits: require( 'fs' ).readFileSync( './fixtures/sample-cat.jpg' )
    }, fileUploaded );

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

Object.defineProperties( module.exports = uploadFiles, {
  client: {
    value: require( 'wordpress-client' ),
    enumerable: true,
    configurable: true,
    writable: true
  }
});
