/**
 *
 * @param grunt
 */
function taskGroup( grunt ) {

  // grunt.registerTask( 'wordpress-synchronize', 'Login into WP site via XML-RPC.', taskGroup.someTask );
  // grunt.registerTask( 'wp-another-task', 'Login into WP site via XML-RPC.', taskGroup.anotherTask );

}

Object.defineProperties( module.exports = taskGroup, {
  someTask: {
    value: function someTask( options ) {

      var done    = this.async();
      var fs      = require( 'fs' );
      var async   = require( 'async' );
      var path    = require( 'path' );

      // Required args.
      grunt.config.requires('wpClient.url');
      grunt.config.requires('wpClient.username');
      grunt.config.requires('wpClient.password');

      var client = require( '../lib/wordpress-client' ).create( grunt.config( 'wpClient' ) );

      grunt.log.error('Some login issue, but no big deal.');
      grunt.log.writeln('Logged into WP site!');
      done();

    },
    enumerable: true,
    configurable: true,
    writable: true
  },
  anotherTask: {
    value: function someTask( options ) {

      var done    = this.async();
      var fs      = require( 'fs' );
      var async   = require( 'async' );
      var path    = require( 'path' );

      // Required args.
      grunt.config.requires('wpClient.url');
      grunt.config.requires('wpClient.username');
      grunt.config.requires('wpClient.password');

      setTimeout(function() {
        grunt.log.error('Some login issue, but no big deal.');
        grunt.log.writeln('Logged into WP site!');
        done();
      }, 6000);

    },
    enumerable: true,
    configurable: true,
    writable: true
  }
});
