// Generated on 2014-03-24 using generator-angular-fullstack 1.3.2

// jshint node: true
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
var fs = require('fs');

//jshint camelcase: false
//some Grunt plugins use underscore in their API
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
      testServer: '<%= dirs.server %>/test',
      jsClient: '<%= dirs.srcClient %>/scripts',
      distServer: '<%= dirs.server %>/dist',
      distClient: '<%= dirs.client %>/dist',

      //test related directories
      test: 'test',

      //coverage related paths
      coverageE2E: 'coverage',
      instrumentedE2E: '<%= dirs.coverageE2E %>/instrumented',
      instrumentedE2Etmp: '<%= dirs.coverageE2E %>/tmp',
      coverageReportsE2E: '<%= dirs.coverageE2E %>/reports',
      instrumentedClientPath: '<%= dirs.instrumentedE2E %>/' +
        '<%= dirs.srcClient %>'
    },

    //jshint camelcase: false
    express: {
      options: {
        port: process.env.PORT || 9000,
        fallback: function (error) {
          console.log('lalaho error' + error);
        }
      },
      coverageE2E: {
        options: {
          script: '<%= dirs.instrumentedE2E %>/<%= dirs.jsServer %>/server.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: '<%= dirs.dist %>/<%= dirs.jsServer %>/server.js',
          node_env: 'production'
        }
      },
      dev: {
        options: {
          script: '<%= dirs.jsServer %>/server.js',
          node_env: 'development'
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
        src: ['<%= dirs.coverageE2E %>'],
      },
      dist: {
        src: ['<%= dirs.dist %>'],
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      coverageStatic: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dirs.srcClient %>',
          dest: '<%= dirs.instrumentedClientPath %>',
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
          cwd: '<%= dirs.instrumentedE2Etmp %>/<%= dirs.srcClient %>',
          dest: '<%= dirs.instrumentedClientPath %>',
          src: [
            '**'
          ]
        }]
      },
      coverageJsServer: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= dirs.instrumentedE2Etmp %>/<%= dirs.jsServer %>',
          dest: '<%= dirs.instrumentedE2E %>/<%= dirs.jsServer %>',
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
          dest: '<%= dirs.dist %>/<%= dirs.server %>',
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
          dest: '<%= dirs.dist %>/<%= dirs.client %>',
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
        dir: '<%= dirs.coverageReportsE2E %>',
        print: 'detail'
      }
    },

    env: {
      coverageClientPath: {
        PRIMEDISER_CLIENT_PATH: '<%= dirs.instrumentedClientPath %>'
      },
      devClientPath: {
        PRIMEDISER_CLIENT_PATH: '<%= dirs.srcClient %>'
      },
      distClientPath: {
        PRIMEDISER_CLIENT_PATH: '<%= dirs.dist %>/<%= dirs.srcClient %>'
      }
    },

    //measure client side code coverage by protractor end-to-end tests
    protractor_coverage: {
      options: {
        configFile: '<%= dirs.test %>/protractor/protractorConf.js',
        coverageDir: '<%= dirs.instrumentedE2E %>',
        keepAlive: false
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

    //send code coverage stats to coveralls.io server
    coveralls: {
      options: {
        force: true
      },
      client: {
        src: '<%= dirs.coverageReportsE2E %>/lcov.info'
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
      serverTests: {
        src: ['<%= dirs.server %>/Gruntfile.js'],
        tasks: ['test'],
      }
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
        command: 'cd <%= dirs.client %> && npm install && ' +
          'bower install && cd ..'
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

    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      express: {
        files: ['<%= dirs.jsServer %>/**/*.{js,json}'],
        tasks: ['env:devClientPath','express:dev', 'wait'],
        options: {
          livereload: true,
          //Without this option specified express won't be reloaded
          nospawn: true
        }
      },
      serverTests:{
        files: ['<%= dirs.jsServer %>/**/*.{js,json}',
                '<%= dirs.testServer %>/**/*.{js,json}'],
        tasks: ['hub:serverTests']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
      },
      all: [
        '<%= dirs.test %>/**/*.js'
      ],
    },

  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 500);
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
    'clean:coverageE2E',
    'copy:coverageStatic',
    'instrument',
    'copy:coverageJsServer',
    'copy:coverageJsClient',
    'env:coverageClientPath',
    'express:coverageE2E',
    'protractor_coverage:chrome',
    'makeReport',
    'express:coverageE2E:stop',
    'coveralls'
  ]);

  grunt.registerTask('buildDist', [
    'cloneSubprojects',
    'npmInstallSubprojects',
    'buildSubprojects',
    'clean:dist',
    'copy:distServer',
    'copy:distClient',
  ]);

  grunt.registerTask('startDist', [
    'buildDist',
    'env:distClientPath',
    'express:prod',
    'watch',
    'express:prod:stop',
  ]);

  grunt.registerTask('startDev', [
    'env:devClientPath',
    'express:dev',
    //'open',
    'watch',
    'express:dev:stop',
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'cloneSubprojects',
    'npmInstallSubprojects',
    'buildSubprojects',
    //'build',
    'coverage'
  ]);
};
