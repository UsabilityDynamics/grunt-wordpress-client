/**
 *
 * @param grunt
 */
function multiCall( grunt ) {

  grunt.registerMultiTask( 'wordpress', 'General WordPress XML-RPC call.', function wordpress( ) {
    grunt.log.writeln( 'Running wordpress task.', this.target );

    // Get dependencies.
    var async     = require( 'async' );
    var client    = require( 'wordpress-client' );
    var path      = require( 'path' );

    // Setup Instance.
    var task      = this;
    var target    = task.target;
    var name      = task.name;
    var done      = task.async();
    var options   = task.options({
      blog: 1,
      url: 'http://localhost/xmlrpc.php'
    });

    // Create Session.
    var session = client.create({
      url: options.url,
      blog: options.blog,
      username: options.username,
      password: options.password
    });

    session.once( 'connected', function( error, event ) {
      // console.log('Connect:', error ? error.message : this.get( 'methods' ) );

      if( error ) {
        return done( false );
      }

      // system.getCapabilities always used as first call
      var _items = [
        { methodName: 'system.getCapabilities' }
      ];

      if( task.target === 'getPostTypes' ) {

        _items.push({
          methodName: 'wp.getPostTypes',
          params: [ session.get( 'blog' ), session.get( "username" ), session.get( "password" ) ]
        });

      }

      // Parse Files to upload.
      if( task.target === 'uploadFile' ) {

        task.filesSrc.forEach( function eachFile( filePath ) {

          // console.log( 'filePath', filePath );

          _items.push({
            methodName: 'wp.uploadFile',
            params: [ session.get( 'blog' ), session.get( "username" ), session.get( "password" ), {
              name: path.basename( filePath ),
              type: 'image/jpeg',
              bits: require( 'fs' ).readFileSync( filePath )
            }]
          });

        })

      }

      session.multiCall( _items, function( err, results ) {

        // Omit first result which is for capabilities
        var result = results.slice( 1 );

        console.log( require( 'util' ).inspect( result, { showHidden: false, colors: true, depth: 3 } ) )

        // @todo Write result to destination.

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
