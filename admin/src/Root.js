import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import store from './store';
import App from '@/components/App';
import history from '@/modules/history';
import AuthPage from '@/pages/Auth/Page';

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/auth" component={AuthPage} />
            <Route path="*" component={App} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default hot(Root);
