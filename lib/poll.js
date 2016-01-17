const generateId = require('./generate-id');
const _ = require('lodash');
const moment = require('moment');

function Poll(formData) {
  this.title = formData.title;
  this.question = formData.question;
  this.responses = formData.responses;
  this.private = this.privacyCheck(formData);
  this.endtime = this.findEndTime(formData);
  this.open = true;
  this.id = generateId();
  this.adminUrl = '/polls/' + this.id;
  this.votePageId = generateId();
  this.voterUrl = '/vote/' + this.votePageId;
  this.votes = {};
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

Poll.prototype.findEndTime = function (formData) {
  if (formData.endtime) {
    this.displayEnd = moment(formData.endtime).fromNow();
    this.endOffset = Date.parse(moment(formData.endtime).toDate());
  } else {
    return false;
  }
};

Poll.prototype.saveResponse = function (data) {
  if (!this.votes[data.voter]) {
    this.votes[data.voter] = data.response;
    this.addResponse(data.response);
  } else {
    var oldResponse = this.votes[data.voter];
    this.removeResponse(oldResponse);
    this.votes[data.voter] = data.response;
    this.addResponse(data.response);
  }
};

Poll.prototype.addResponse = function (response) {
  this.responseVotes[response]++;
};

Poll.prototype.removeResponse = function (response) {
  this.responseVotes[response]--;
};

module.exports = Poll;