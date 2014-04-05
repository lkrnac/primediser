// Generated on 2014-03-24 using generator-angular-fullstack 1.3.2
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist',
      e2e: 'coverage/e2e',
      instrumentedServer: 'coverage/server/instrument',
      instrumentedE2E: 'coverage/e2e/instrumented'
    },
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      coverageE2E: {
        options: {
          script: '<%= yeoman.instrumentedE2E %>/lib/server.js',
          debug: true
        }
      },
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },

    // Empties folders to start fresh
    clean: {
      coverageE2E: {
        src: ['<%= yeoman.e2e %>/'],
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      coverageE2E: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.e2e %>/instrumented/app',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/**/*',
            'fonts/**/*',
            'views/**/*',
            'styles/**/*',
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.e2e %>/instrumented/app/images',
          src: ['generated/*']
        }, ]
      },
    },

    // start - code coverage settings
    instrument: {
      files: ['lib/**/*.js', 'app/scripts/**/*.js'],
      options: {
        lazy: true,
        basePath: '<%= yeoman.instrumentedE2E %>/'
      }
    },

    makeReport: {
      src: '<%= yeoman.instrumentedE2E %>/*.json',
      options: {
        type: 'html',
        dir: '<%= yeoman.e2e %>/reports',
        print: 'detail'
        //        type: 'lcov',
        //        dir: 'reports',
        //        print: 'detail'
      }
    },


    protractor_coverage: {
      options: {
        configFile: 'test/protractor/protractorConf.js', // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        coverageDir: '<%= yeoman.instrumentedE2E %>',
        args: {}
      },
      phantom: {
        options: {
          args: {
            baseUrl: 'http://localhost:3000/',
            // Arguments passed to the command
            'browser': 'phantomjs'
          }
        }
      },
      chrome: {
        options: {
          args: {
            baseUrl: 'http://localhost:3000/',
            // Arguments passed to the command
            'browser': 'chrome'
          }
        }
      },
    },
  });

  grunt.registerTask('default', [
    'clean:coverageE2E',
    'copy:coverageE2E',
    'instrument',
    'express:coverageE2E',
    'protractor_coverage:chrome',
    'makeReport'
  ]);
};
