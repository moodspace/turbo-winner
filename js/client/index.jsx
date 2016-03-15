import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, IndexRoute, RouteHandler, Router, Route} from 'react-router';
import Landing from './landing';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Empty shell of App
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      {this.props.children}
    </div>;
  }
}

let routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Landing}/>
  </Route>
);

ReactDOM.render(
  <Router history={browserHistory} routes={routes}/>, document.getElementById("top-frame"));
