// Generated on 2014-03-24 using generator-angular-fullstack 1.3.2
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
var fs = require('fs');

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    dirs: {
      // configurable paths
      dist: 'dist',

      //child projects
      server: 'primediser-server',
      client: 'primediser-client',
      srcClient: '<%= dirs.client %>/app',
      jsServer: '<%= dirs.server %>/src',
      jsClient: '<%= dirs.srcClient %>/scripts',
      distServer: '<%= dirs.server %>/dist',
      distClient: '<%= dirs.client %>/dist',

      //coverage related paths
      coverageE2E: 'coverage/e2e',
      instrumentedE2E: '<%= dirs.coverageE2E %>/instrumented',
      instrumentedE2Etmp: '<%= dirs.coverageE2E %>/tmp',
    },
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      coverageE2E: {
        options: {
          script: '<%= dirs.instrumentedE2E %>/server.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: '<%= dirs.dist %>/server.js',
          node_env: 'production'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },

    // Empties folders to start fresh
    clean: {
      coverageE2E: {
        src: ['<%= dirs.coverageE2E %>/'],
      },
      dist: {
        src: ['<%= dirs.dist %>/'],
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      coverageStatic: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dirs.srcClient %>',
          dest: '<%= dirs.instrumentedE2E %>/app',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/**/*',
            'fonts/**/*',
            'views/**/*',
            'styles/**/*'
          ]
        }]
      },
      coverageJsClient: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dirs.instrumentedE2Etmp %>/<%= dirs.client %>',
          dest: '<%= dirs.instrumentedE2E %>',
          src: [
            '**'
          ]
        }]
      },
      coverageJsServer: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dirs.instrumentedE2Etmp %>/<%= dirs.server %>',
          dest: '<%= dirs.instrumentedE2E %>',
          src: [
            '**'
          ]
        }]
      },
      distServer: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dirs.distServer %>',
          dest: '<%= dirs.dist %>',
          src: [
            '**'
          ]
        }]
      },
      distClient: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dirs.distClient %>',
          dest: '<%= dirs.dist %>',
          src: [
            '**'
          ]
        }]
      }
    },

    instrument: {
      files: [
        '<%= dirs.jsServer %>/**/*.js',
        '<%= dirs.jsClient %>/**/*.js'
      ],
      options: {
        lazy: true,
        basePath: '<%= dirs.instrumentedE2Etmp %>/'
      }
    },

    makeReport: {
      src: '<%= dirs.instrumentedE2E %>/*.json',
      options: {
        type: 'lcov',
        dir: '<%= dirs.coverageE2E %>/reports',
        print: 'detail'
      }
    },

    protractor_coverage: {
      options: {
        configFile: 'test/protractor/protractorConf.js',
        coverageDir: '<%= dirs.instrumentedE2E %>',
        args: {}
      },
      phantom: {
        options: {
          args: {
            baseUrl: 'http://localhost:3000/',
            'browser': 'phantomjs'
          }
        }
      },
      chrome: {
        options: {
          args: {
            baseUrl: 'http://localhost:3000/',
            'browser': 'chrome'
          }
        }
      },
    },

    hub: {
      client: {
        src: ['<%= dirs.client %>/Gruntfile.js'],
        tasks: ['build'],
      },
      server: {
        src: ['<%= dirs.server %>/Gruntfile.js'],
        tasks: ['build'],
      },
    },

    shell: {
      npmInstallServer: {
        options: {
          stdout: true,
          stderr: true
        },
        command: 'cd <%= dirs.server %> && npm install && cd ..'
      },
      npmInstallClient: {
        options: {
          stdout: true,
          stderr: true
        },
        command: 'cd <%= dirs.client %> && npm install && bower install && cd ..'
      }
    },
    gitclone: {
      cloneServer: {
        options: {
          repository: 'https://github.com/lkrnac/<%= dirs.server %>',
          directory: '<%= dirs.server %>'
        },
      },
      cloneClient: {
        options: {
          repository: 'https://github.com/lkrnac/<%= dirs.client %>',
          directory: '<%= dirs.client %>'
        },
      },
    },
  });

  var cloneIfMissing = function (subTask) {
    var directory = grunt.config.get('gitclone')[subTask].options.directory;
    var exists = fs.existsSync(directory);
    if (!exists) {
      grunt.task.run('gitclone:' + subTask);
    }
  };

  grunt.registerTask('cloneSubprojects', function () {
    cloneIfMissing('cloneClient');
    cloneIfMissing('cloneServer');
  });

  grunt.registerTask('npmInstallSubprojects', [
    'shell:npmInstallServer',
    'shell:npmInstallClient'
  ]);

  grunt.registerTask('buildSubprojects', [
    'hub:server',
    'hub:client'
  ]);

  grunt.registerTask('coverage', [
    'cloneSubprojects',
    'clean:coverageE2E',
    'copy:coverageStatic',
    'instrument',
    'copy:coverageJsServer',
    'copy:coverageJsClient',
    'express:coverageE2E',
    'protractor_coverage:chrome',
    'makeReport'
  ]);

  grunt.registerTask('default', [
    'cloneSubprojects',
    'clean:dist',
    'npmInstallSubprojects',
    'buildSubprojects',
    'copy:distServer',
    'copy:distClient',
    'express:prod'
  ]);
};