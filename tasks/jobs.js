/**
 *
 * @param grunt
 */
function taskGroup( grunt ) {

  grunt.registerTask( 'wpJobUpdate', 'WordPress RPC.', function wpJobUpdate( type ) {

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
