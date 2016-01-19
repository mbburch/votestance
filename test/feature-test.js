const assert = require('chai').assert;
const Browser = require('zombie');
const app = require('../server');
const io = require('socket.io-client');

describe('index page', () => {
  var server, browser, baseUrl;

  baseUrl = 'http://localhost:9876';

  before(() => {
    server = app.listen(9876);
  });


  	beforeEach(() => {
  		// some useful options when things go wrong:
  		// debug: true  =  outputs debug information for zombie
  		// waitDuration: 500  =  will only wait 500 milliseconds
  		//   for the page to load before moving on
  		browser = new Browser();
  	});

  after(() => {
    server.close();
  });

  it('should show form to create poll', (done) => {
    browser.visit(baseUrl, () => {
      assert(browser.text('.brand-logo') === 'Votestance',
        'page title must match');
      assert(browser.text('.form-heading') === 'Create a New Poll',
        'page must have poll form');
      done();
    });
  });

  it('should have a form to add poll title', (done) => {
    browser.visit(baseUrl, () => {
      browser.assert.elements('form input[name="poll[title]"]', 1);
      done();
    });
  });

  it('should have a form to add the question', (done) => {
    browser.visit(baseUrl, () => {
      browser.assert.elements('form input[name="poll[question]"]', 1);
      done();
    });
  });

  it('should have a checkbox to keep results private', (done) => {
    browser.visit(baseUrl, () => {
      browser.assert.elements('form input[name="poll[private]"]', 1);
      done();
    });
  });

  it('should have a button to add additional responses', (done) => {
    browser.visit(baseUrl, () => {
      browser.assert.element('#add-response');
      done();
    });
  });

  it('should have a button to submit poll', (done) => {
    browser.visit(baseUrl, () => {
      browser.assert.element('#submit-poll');
      assert(browser.text('#submit-poll') == 'Submit Pollsend',
        `page must have submit button. ${browser.text('#submit-poll')}`);
      done();
    });
  });

});
