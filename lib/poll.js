const generateId = require('./generate-id');
const _ = require('lodash');

function Poll(formData) {
  this.title = formData.title;
  this.question = formData.question;
  this.responses = formData.responses;
  this.private = privacyCheck(formData);
  this.open = true;
  this.id = generateId();
  this.adminUrl = '/polls/' + this.id;
  this.votePageId = generateId();
  this.voterUrl = '/vote/' + this.votePageId;
  this.responseVotes = _.reduce(this.responses, function(result, key) {
                             result[key] = 0;
                             return result;
                           }, {});

}

function privacyCheck (formData) {
  if (formData.private) {
    return true;
  } else {
    return false;
  }
}

module.exports = Poll;