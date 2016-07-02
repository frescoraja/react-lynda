import React from 'react';

const Questions = React.createClass({
  addQuestion(question, i) {
    return (
      <div className="col-xs-12 col-sm-6 col-md-3" key={i}>
        <span onClick={this.askQuestion.bind(null, question)}>{question.q}</span>
      </div>
    );
  },

  askQuestion(question) {
    this.props.emit('ask', question);
  },

  render() {
    return (
      <div id="questions" className="row">
        <h2>Questions</h2>
        {this.props.questions.map(this.addQuestion)}
      </div>
    );
  }
});

module.exports = Questions;
