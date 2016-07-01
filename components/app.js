const React = require('react');
const Router = require('react-router');
const io = require('socket.io-client');
const Header = require('./parts/header');

const RouteHandler = Router.RouteHandler;

const App = React.createClass({
  getInitialState() {
    return { 
      status: 'disconnected',
      title: ''    
    };
  },

  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
  },

  connect() {
    console.log(`connected: ${this.socket.id}`);
    this.setState({ status: 'connected' });
  },

  disconnect() {
    console.log(`disconnected: ${this.socket.id}`);
    this.setState({ status: 'disconnected' });
  },

  welcome(serverState) {
    this.setState({ title: serverState.title });
  },

  render() {
    return (
      <div>
        <Header title={this.state.title} status={this.state.status} />
        <RouteHandler title={this.state.title} status={this.state.status} />
      </div>
    );
  }
});

module.exports = App;
