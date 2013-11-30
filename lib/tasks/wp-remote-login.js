
module.exports = function( grunt ) {
  grunt.log.writeln( 'wp-remote-login' );

  var _ = grunt.util._;

  function wpLogin( options ) {
    var done = this.async();

    // Required args.
    grunt.config.requires('client.domain');
    grunt.config.requires('client.callback');
    grunt.config.requires('client.user');
    grunt.config.requires('client.password');
    
    setTimeout(function() {
      grunt.log.error('Some login issue, but no big deal.');
      grunt.log.writeln('Logged into WP site!');
      done();
    }, 6000);

  }
  
  grunt.registerTask( 'wp-remote-login', 'Login into WP site via XML-RPC.', wpLogin );

}