/**
 *
 * @param grunt
 */
function taskGroup( grunt ) {

  grunt.registerMultiTask( 'wordpress.newPost', 'WordPress RPC.', function wpPushPosts( type ) {
    grunt.log.writeln(this.target + ': ' + this.data);

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
