/**
 *
 * @param grunt
 */
function taskGroup( grunt ) {

  // grunt.registerTask( 'wordpress:media', 'Login into WP site via XML-RPC.', taskGroup.someTask );

}

Object.defineProperties( module.exports = taskGroup, {
  mediaTask: {
    value: function mediaTask( grunt ) {

      console.log( require( 'util' ).inspect( grunt.config( 'wpClient' ), { showHidden: true, colors: true, depth: 2 } ) )

      var client = require( '../lib/wordpress-client' ).create( grunt.config( 'wpClient' ) );

    },
    enumerable: true,
    configurable: true,
    writable: true
  }
});
