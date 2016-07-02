import React from 'react'
import Router from 'react-router'
import App from './components/app'
import Audience from './components/audience'
import Speaker from './components/speaker'
import Board from './components/board'
import Whoops404 from './components/whoops404'
const { Route, DefaultRoute, NotFoundRoute } = Router;

const routes = (
  <Route handler={App}>
    <DefaultRoute handler={Audience} />
    <Route name="speaker" path="speaker" handler={Speaker}></Route>
    <Route name="board" path="board" handler={Board}></Route>
    <NotFoundRoute handler={Whoops404} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById('react-container'));
});
