/**
 *
 * @param grunt
 */
function taskGroup( grunt ) {

  grunt.registerTask( 'wpUploadImages', 'WordPress RPC.', function wpUploadImages( type ) {

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
