const React = require('react');
const Display = require('./display');
const JoinSpeaker = require('./parts/join_speaker');
const Attendance = require('./parts/attendance');
const Questions = require('./parts/questions');

const Speaker = React.createClass({
  render() {
    return (
      <div>
        <Display if={this.props.status === 'connected'}>
          <Display if={this.props.member.name && this.props.member.type === 'speaker'}>
            <Questions questions={this.props.questions} emit={this.props.emit} />
            <Attendance audience={this.props.audience} />
          </Display>
          <Display if={!this.props.member.name}>
            <h2>Start the presentation</h2>
            <JoinSpeaker emit={this.props.emit} />
          </Display>
        </Display>
      </div>
    );
  }
});

module.exports = Speaker;
