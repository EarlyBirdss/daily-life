import React from 'react';
import { Route, Router } from 'react-router';
import { createHashHistory } from 'history';
import { Button } from 'antd/lib/radio';

const Index = () => <Button>Mathilda</Button>;
const NotFund = () =>  <Button>NotFund</Button>;

const hashHistory = createHashHistory();
export default function(props) {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Index}></Route>
      <Route path="/index" component={Index}></Route>
      <Route path="*" component={NotFund}></Route>
    </Router>
  )
}
