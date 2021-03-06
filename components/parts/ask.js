import React from 'react';
import Display from './display';
import { Link } from 'react-router';

const Ask = React.createClass({
  getInitialState() {
    return { choices: [], answer: undefined };
  },

  componentWillMount() {
    this.setupChoices();
  },

  componentWillReceiveProps() {
    this.setupChoices();
  },

  setupChoices() {
    const choices = Object.keys(this.props.question);
    choices.shift();
    this.setState({ 
      choices: choices,
      answer: sessionStorage.answer
    });
  },

  select(choice) {
    this.setState({ answer: choice });
    sessionStorage.answer = choice;
    this.props.emit('answer', {
      question: this.props.question,
      choice: choice
    }); 
  },

  addChoiceButton(choice, i) {
    const buttonTypes = ['primary', 'success', 'warning', 'danger'];
    return (
      <button key={i}
              className={"col-xs-12 col-sm-6 btn btn-" + buttonTypes[i]}
              onClick={this.select.bind(null, choice)}>
        {choice}: {this.props.question[choice]} 
      </button>
    );
  },

  render() {
    return (
      <div id="currentQuestion">
        <Display if={this.state.answer}>
          <h3>You answered: {this.state.answer}</h3>
          <p>{this.props.question[this.state.answer]}</p>
          <Link to="/board">See results..</Link>
        </Display>

        <Display if={!this.state.answer}>
          <div className="row">
            {this.state.choices.map(this.addChoiceButton)}
          </div>
        </Display>
      </div>
    );
  }
});

module.exports = Ask;
