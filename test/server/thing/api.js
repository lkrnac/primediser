'use strict';

var should = require('should'),
  request = require('supertest');
var requireHelper = require('../requireHelper');
var app = requireHelper('server/server');

describe('GET /api/awesomeThings', function() {
  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/awesomeThings')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
