const assert = require('assert');
const app = require('../server');
const request = require('request');
const Poll = require('../lib/poll');
const fixtures = require('./fixtures');

describe('Server', () => {

  before((done) => {
    this.port = 9876;

    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  after(() => {
    this.server.close();
  });

  it('should exist', () => {
    assert(app);
  });

  describe('GET /', () => {

    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have a body with the name of the application', (done) => {
      var title = app.locals.title;

      this.request.get('/', (error, response) => {
        if (error) { done(error); }
        assert(response.body.includes(title),
          `"${response.body}" does not include "${title}".`);
        done();
      });
    });

  });

  describe('POST /polls', () => {

    beforeEach(() => {
      app.polls = {};
    });

    it('should not return 404', (done) => {
      var payload = { poll: fixtures.validPoll };

      this.request.post('/polls', { form: payload }, (error, response) => {
        if (error) { done(error); }
        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should receive and store data', (done) => {
      var payload = { poll: fixtures.validPoll };

      this.request.post('/polls', { form: payload }, (error, response) => {
        if (error) { done(error); }

        var pollCount = Object.keys(app.polls).length;

        assert.notEqual(pollCount, 0, `Expected 1 poll, found ${pollCount}`);
        done();
      });
    });

    it('should redirect the user to their new poll admin page', (done) => {
      var payload = { poll: fixtures.validPoll };

      this.request.post('/polls', { form: payload }, (error, response) => {
        if (error) { done(error); }

        var newPollId = Object.keys(app.polls)[0];

        assert.equal(response.headers.location, '/polls/' + newPollId);
        done();
      });
    });

  });

  describe('GET /polls/:id', () => {

    beforeEach(() => {
      var pollData = fixtures.validPoll;
      this.poll = new Poll(pollData);
      app.polls[this.poll.id] = this.poll;
    });

    it('should not return 404', (done) => {
      this.request.get('polls/' + this.poll.id, (error, response) => {
        if (error) { done(error); }

        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should return a page that has poll title and question', (done) => {
      this.request.get('polls/' + this.poll.id, (error, response) => {
        if (error) { done(error); }

        assert(response.body.includes(this.poll.title),
               `"${response.body}" does not include "${this.poll.title}".`);
       assert(response.body.includes(this.poll.question),
              `"${response.body}" does not include "${this.poll.question}".`);
        done();
      });
    });

    it('should display poll options and related votes', (done) => {
      this.request.get('polls/' + this.poll.id, (error, response) => {
        if (error) { done(error); }

        assert(response.body.includes(this.poll.responses[0]),
               `"${response.body}" does not include "${this.poll.responses[0]}".`);
       assert(response.body.includes(this.poll.responseVotes[this.poll.responses[0]]),
              `"${response.body}" does not include "${this.poll.responseVotes[this.poll.responses[0]]}".`);
        done();
      });
    });

    it('should display link to voting page', (done) => {
      this.request.get('polls/' + this.poll.id, (error, response) => {
        if (error) { done(error); }

        assert(response.body.includes(this.poll.voterUrl),
               `"${response.body}" does not include "${this.poll.voterUrl}".`);
        done();
      });
    });

  });

  describe('GET /vote/:votePageId', () => {

    beforeEach(() => {
      var pollData = fixtures.validPoll;
      this.poll = new Poll(pollData);
      app.polls[this.poll.votePageId] = this.poll;
    });

    it('should not return 404', (done) => {
      this.request.get('/vote/' + this.poll.votePageId, (error, response) => {
        if (error) { done(error); }

        assert.notEqual(response.statusCode, 404);
        done();
      });
    });

    it('should return a page that has poll title and question', (done) => {
      this.request.get('/vote/' + this.poll.votePageId, (error, response) => {
        if (error) { done(error); }

        assert(response.body.includes(this.poll.title),
               `"${response.body}" does not include "${this.poll.title}".`);
       assert(response.body.includes(this.poll.question),
              `"${response.body}" does not include "${this.poll.question}".`);
        done();
      });
    });

    it('should display vote option buttons', (done) => {
      this.request.get('/vote/' + this.poll.votePageId, (error, response) => {
        if (error) { done(error); }

        assert(response.body.includes(this.poll.responses[0]),
               `"${response.body}" does not include "${this.poll.responses[0]}".`);
        done();
      });
    });

  });

});