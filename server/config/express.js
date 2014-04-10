'use strict';

var express = require('express'),
  path = require('path'),
  config = require('./config');

/**
 * Express configuration
 */
module.exports = function(app) {
  var env = process.env.NODE_ENV || 'development';
  if ('development' === env) {
    app.use(require('connect-livereload')());

    // Disable caching of scripts for easier testing
    app.use(function noCache(req, res, next) {
      if (req.url.indexOf('/scripts/') === 0) {
        res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.header('Pragma', 'no-cache');
        res.header('Expires', 0);
      }
      next();
    });

    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'app')));
    app.set('views', config.root + '/app/views');

    // Error handler
    app.use(require('errorhandler')());

  } else if ('production' === env) {
    app.use(express.favicon(path.join(config.root, 'public', 'favicon.ico')));
    app.use(express.static(path.join(config.root, 'public')));
    app.set('views', config.root + '/views');
  }

  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(require('morgan')('dev'));
  app.use(require('body-parser')());
  app.use(require('method-override')());
};
