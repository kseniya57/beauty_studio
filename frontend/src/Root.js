import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import store from './store';
import App from '@/components/App';
import history from '@/modules/history';

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="*" component={App} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(Root);
