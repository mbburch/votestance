const Nightmare = require('nightmare');
const assert = require('chai').assert;
const should = require('chai').should;
const app = require('../server');
const request = require('request');
const Poll = require('../lib/poll');
const fixtures = require('./fixtures');
const io = require('socket.io-client');

require('mocha-generators').install();

const base = 'http://localhost:7500/';

describe('Nightmare', function () {

  before((done) => {
    this.port = 7500;

    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:7500/'
    });
  });

  after(() => {
    this.server.close();
  });

  it('should be constructable', function*() {
    var nightmare = new Nightmare();
    nightmare.should.be.ok;
    yield nightmare.end();
  });

  describe('test filling out a form', function () {
    var nightmare;

    beforeEach(function() {
      nightmare = new Nightmare();
    });

    afterEach(function*() {
      yield nightmare.end();
    });

    it('should be redirected to poll admin page when poll is submitted', function*() {
      var title = yield nightmare
        .goto('http://localhost:7500')
        .evaluate(function () {
          return document.title;
        });
      assert.equal(title, 'Votestance');
    });
  });

  describe('navigation', function () {
    var nightmare;

    beforeEach(function() {
      nightmare = Nightmare();
    });

    afterEach(function*() {
      yield nightmare.end();
    });

    it('should click on a link and then go back', function*() {
      var title = yield nightmare
        .goto('http://localhost:7500/')
        .click('Create a Poll')
        .title();

      title.should.equal('A');

      var title = yield nightmare
        .back()
        .title();

      title.should.equal('Navigation');
    });

  });
});