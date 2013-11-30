var wp      = require( 'wordpress' );
var fm      = require( 'wordpress/lib/fields' );
var util    = require( '../utility' );
var request = require( 'request' );
var fs      = require( 'fs' );
var async   = require( 'async' );
var path    = require( 'path' );


// Get type and size befoe downloading
// Stream to file.
var download = function(uri, filename, done ){
  request.head( uri, function( err, res, body ){
    var _stream = fs.createWriteStream(filename) ;
    console.log( 'content-type: [%s]; content-length: [%s]', res.headers['content-type'], res.headers['content-length'] );
    request( uri ).pipe( _stream );
    _stream.on( 'finish', done );
  });
};

module.exports = function (grunt) {
  grunt.log.writeln( 'wp-get-images' );

  var client = wp.createClient({
    url: grunt.config( 'client.url' ),
    username: grunt.config( 'client.username' ),
    password: grunt.config( 'client.password' ),
    blogId: grunt.config( 'client.blogId' )
  });

  /**
   * Check Sites availableility and XML-RPC Endpoint. (Credentials not required.)
   *
   */
  grunt.registerTask( 'wp-check-client', 'asfdsaf', function() {
    grunt.log.writeln( 'wp-check-client', grunt.config( 'client.url' ) );

    var done = this.async();

    client.call( 'system.listMethods', function( error, data ) {
      grunt.log.writeln( 'Got [%d] methods.', data.length );
      grunt.option( 'methods', data );
      done();
    });

  });

  grunt.registerMultiTask( 'wp-get-media', 'Loads images, most recently updated being first.', function() {
    grunt.log.writeln( 'Rnning [wp-get-media] on [%s] with query [%s].', grunt.config( 'client.url' ), this.data );
    var done = this.async();
        
    // Runn multi-task parts.
    client.authenticatedCall( 'wp.getMediaLibrary', this.data, function( error, data ) {

      var q = async.queue( function ( data, callback ) {
        download( data.link, './temp/' + data.attachment_id + '.jpg', callback );
      });

      q.push( data );
      q.drain = done;

    });

  });

};
