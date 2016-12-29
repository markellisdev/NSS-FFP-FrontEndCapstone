module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['../app/**/*.js'],
      options: {
        predef: ["document", "console", "$", "event", "alert", "module", "require", "firebase"],
        esnext: true,
        globalstrict: true,
        globals: {"angular": true, "app": true},
        //Line below negates JSHint "forgotten debugger" warning
        '-W087': true
      }
    },
    sass: {
      dist: {
        files: {
// target: source
          '../css/styles.css': '../sass/styles.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
   }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};