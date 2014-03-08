module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        files: {
          'public/bundle.js': ['public/js/app.js']
        },
        options: {
            alias: ['public/js/Workspace.js:Workspace', 'public/js/hx.js:hx']
        }
      }
    },
    watch: {
      scripts: {
        files: ['public/js/**/*.js', 'public/templates/**/*.hogan'],
        tasks: ['browserify'],
        options: {
          spawn: false,
          debounceDelay: 250
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['browserify']);
};
