const React = require('react');
const Router = require('react-router');
const Route = Router.Route;
const DefaultRoute = Router.DefaultRoute;

const App = require('./components/app');
const Audience = require('./components/audience');
const Speaker = require('./components/speaker');
const Board = require('./components/board');

const routes = (
  <Route handler={App}>
    <DefaultRoute handler={Audience} />
    <Route name="speaker" path="speaker" handler={Speaker}></Route>
    <Route name="board" path="board" handler={Board}></Route>
  </Route>
);

const root = document.getElementById('react-container');

Router.run(routes, (Handler) => {
  React.render(<Handler />, root);
});
