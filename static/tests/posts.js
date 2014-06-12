module.exports = function (grunt) {

  grunt.initConfig({
    wordpress: {
      options: {
        pageSrc: 'src/pages'
      },
      posts: {
        src: 'posts',
        dest: 'dev',
        layout: 'src/layouts/post.jade',
        url: 'posts/:title/'
      },
      custom: {
        src: 'posts',
        dest: 'dest4',
        layout: 'src/layouts/post.hbs',
        url: 'blog/posts/:title/',
        options: {
          partials: 'src/layouts/partials/**/*.hbs'
        }
      }
    }
  });



};