import React from 'react';
import dva from 'dva';
import { Route, Router, Switch } from 'dva/router';
import { createHashHistory } from 'history';
import { message } from 'antd';

import GlobalModel from '@/models/global';
import routeConfig from '@/configs/route.config';
import App from '@/Layout';
import Welcome from '@/pages/Welcome';
import NotFound from '@/pages/NotFound';

const history = createHashHistory();

export default function RouteWithDva() {
  const app = dva({
    history,
    onError: e => message.error(e.message),
  });
  app.router(({ history }) => {
    return (
      <Router history={history}>
        <App>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            {
              routeConfig.map(({ path, component }: { path: string, component: any }) => (
                <Route path={path} component={component} key={path} />
              ))
            }
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </App>
      </Router>
    )
  });
  app.model(GlobalModel);
  return app.start()();
};
