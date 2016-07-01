const React = require('react');
const Display = require('./display');
const Join = require('./parts/join');
const Ask = require('./parts/ask');

const Audience = React.createClass({
  render() {
    return (
      <div>
        <Display if={this.props.status === "connected"}>

          <Display if={this.props.member.name}>

            <Display if={!this.props.currentQuestion}>
              <h2>Welcome {this.props.member.name}</h2>
              <p>There are {this.props.audience.length} audience members connected</p>
              <p>Questions will be displayed here</p>
            </Display>

            <Display if={this.props.currentQuestion}>
              <h1>{this.props.currentQuestion.q}</h1>
              <Ask question={this.props.currentQuestion} emit={this.props.emit} />
            </Display>

          </Display>

          <Display if={!this.props.member.name}>
            <h1>Join the session</h1>
            <Join emit={this.props.emit} />
          </Display>

        </Display>
      </div>
    );
  }
});

module.exports = Audience;
