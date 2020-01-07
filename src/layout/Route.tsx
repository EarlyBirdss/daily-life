import React from 'react';
import dva from 'dva';
import { Route, Router } from 'dva/router';
// TODO: indexRoute
// import { IndexRoute } from 'react-router-dom';
import { createHashHistory } from 'history';
import { message } from 'antd';

import routeConfig from './route.config';
import App from './Layout';

const history = createHashHistory();

function WithDav() {
  const app = dva({
    history,
    onError: e => message.error(e.message),
  });
  app.router(({ history }) => {
    return (
      <Router history={history}>
        <App>
          {
            routeConfig.map(({ path, component }) => (
              <Route path={path} component={component} key={path} />
            ))
          }
        </App>
      </Router>
    )
  });
  return app.start()();
};

export default WithDav;
