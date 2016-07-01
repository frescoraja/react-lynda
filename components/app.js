const React = require('react');
const Router = require('react-router');
const io = require('socket.io-client');
const Header = require('./parts/header');

const RouteHandler = Router.RouteHandler;

const App = React.createClass({
  getInitialState() {
    return { 
      status: 'disconnected',
      title: '',
      member: {},
      audience: [],
      speaker: '', 
      questions: [],
      currentQuestion: false
    };
  },

  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.updateState);
    this.socket.on('joined', this.joined);
    this.socket.on('audience', this.updateAudience);
    this.socket.on('start', this.start);
    this.socket.on('end', this.updateState);
    this.socket.on('ask', this.ask);
  },

  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
  },

  ask(question) {
    sessionStorage.answer = undefined;
    this.setState({ currentQuestion: question });
  },

  connect() {
    const member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
    if (member && member.type === 'audience') {
      this.emit('join', member);
    } else if (member && member.type === 'speaker') {
      this.emit('start', { name: member.name, title: sessionStorage.title });
    }
    console.log(`connected: ${this.socket.id}`);
    this.setState({ status: 'connected' });
  },

  disconnect() {
    console.log(`disconnected: ${this.socket.id}`);
    this.setState({ 
      status: 'disconnected',
      title: 'disconnected',
      speaker: ''
    });
  },

  joined(member) {
    sessionStorage.member = JSON.stringify(member);
    this.setState({ member: member });
  },

  start(presentation) {
    if (this.state.member.type === 'speaker') {
      sessionStorage.title = presentation.title;
    }
    this.setState(presentation);
  },

  updateAudience(audience) {
    this.setState({ audience: audience });
  },

  updateState(serverState) {
    this.setState(serverState);
  },

  render() {
    return (
      <div>
        <Header {...this.state} />
        <RouteHandler emit={this.emit} {...this.state} />
      </div>
    );
  }
});

module.exports = App;
