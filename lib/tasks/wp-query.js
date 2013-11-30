module.exports = function(grunt) {


  // Simple query for all latest post - titles and dates only.. 
  grunt.registerTask( 'wp-latest-content', 'Simple query for all latest.', function() {
    console.log( 'wp-get-images', grunt.config( 'client.url' ) );
    
    var done = this.async();

    client.authenticatedCall( 'wp.getPosts', { orderby: "post_date", order: "desc", offset: 0, number: 15 }, [ "post_id", "post_date", "post_title" ], function( error, data ) {
      console.log( data );
      done();
     });

  });

  // Simple query for all latest post - full body. 
  grunt.registerTask( 'wp-latest-content', 'Simple query for all latest.', function() {
    console.log( 'wp-get-images', grunt.config( 'client.url' ) );
    
    var done = this.async();

    client.authenticatedCall( 'wp.getPosts', { orderby: "post_date", order: "desc", offset: 0, number: 15 }, function( error, data ) {
      console.log( data );
      done();
     });

  });

};
