import React from 'react';
import { Route, Router } from 'react-router';
// import { IndexRoute } from 'react-router-dom';
import { createHashHistory } from 'history';
import { Button } from 'antd/lib/radio';

import routeConfig from './route.config';
import App from './Layout.jsx';

const Welcome = () => <Button>Mathilda</Button>;
const NotFund = () =>  <Button>NotFund</Button>;

const hashHistory = createHashHistory();

console.log(routeConfig.map(({ path, component }) => (
  <Route path={path} component={component} key={path} />
)))
export default function RoutePage(props) {
  return (
    <Router history={hashHistory}>
      <App>
          {/* <IndexRoute component={Welcome} /> */}
          {
            routeConfig.map(({ path, component }) => (
              <Route path={path} component={component} key={path} />
            ))
          }
      </App>
    </Router>
  )
}
