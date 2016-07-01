const React = require('react');
const Display = require('../display');

const Ask = React.createClass({
  getInitialState() {
    return {
      choices: [],
      answer: undefined
    };
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
    console.log("choice %s", choice);
    this.setState({ answer: choice });
    console.log(this);
    sessionStorage.answer = choice;
    console.log("state: %j", this.state);
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
              onClick={this.select.bind(this, choice)}>
        {choice}: {this.props.question[choice]} 
      </button>
    );
  },

  render() {
    return (
      <div id="currentQuestion">
        <Display if={this.state.answer !== 'undefined'}>
          <h3>You answered: {this.state.answer}</h3>
          <p>{this.props.question[this.state.answer]}</p>
        </Display>

        <Display if={this.state.answer === 'undefined'}>
          <div className="row">
            {this.state.choices.map(this.addChoiceButton)}
          </div>
        </Display>
      </div>
    );
  }
});

module.exports = Ask;
