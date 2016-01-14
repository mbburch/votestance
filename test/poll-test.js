const assert = require('assert');
const fixtures = require('./fixtures');
const Poll = require('../lib/poll');

describe('Poll', () => {

  it('should exist', () => {
    assert(Poll);
  });

  it('should have a title', () => {
    var pollData = fixtures.validPoll;
    var poll = new Poll(pollData);

    assert.equal(poll.title, 'Test Poll');
  });

  it('should have a question', () => {
    var pollData = fixtures.validPoll;
    var poll = new Poll(pollData);

    assert.equal(poll.question, 'What is your favorite color?');
  });

  it('should have responses', () => {
    var pollData = fixtures.validPoll;
    var poll = new Poll(pollData);

    assert.equal(poll.responses[0], ['blue']);
    assert.equal(poll.responses[1], ['red']);
    assert.equal(poll.responses[2], ['yellow']);
  });

});


