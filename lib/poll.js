const generateId = require('./generate-id');
const _ = require('lodash');

function Poll(formData) {
  this.title = formData.title;
  this.question = formData.question;
  this.responses = formData.responses;
  this.private = this.privacyCheck(formData);
  this.open = true;
  this.id = generateId();
  this.adminUrl = '/polls/' + this.id;
  this.votePageId = generateId();
  this.voterUrl = '/vote/' + this.votePageId;
  this.voters = {};
  this.responseVotes = _.reduce(this.responses, function(result, key) {
                             result[key] = 0;
                             return result;
                           }, {});

}

Poll.prototype.privacyCheck = (formData) => {
  if (formData.private) {
    return true;
  } else {
    return false;
  }
};

Poll.prototype.saveResponse = function (data) {
  if (!this.voters[data.voter]) {
    this.voters[data.voter] = true;
    this.addResponse(data.response);
  }
};

Poll.prototype.addResponse = function (response) {
  this.responseVotes[response]++;
};

module.exports = Poll;