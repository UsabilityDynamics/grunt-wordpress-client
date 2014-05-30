/**
 *
 * @param grunt
 */
function taskGroup( grunt ) {

  grunt.registerTask( 'wpPushMessages', 'WordPress RPC.', function wordpress( type ) {

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
