import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Callback,
  Login,
  Issues,
  IssueNew,
  IssueDetail,
  MilestoneNew,
  MilestoneEdit,
  Milestones,
  Labels,
} from './pages';
import Layout from './components/Layout';
import { Overlay } from './components/Overlay';
import PrivateRoute from './lib/PrivateRoute';

const App = () => {
  return (
    <>
      <Overlay />
      <Layout />
      <Switch>
        <Route path="/callback" component={Callback} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" exact component={Issues} />
        <PrivateRoute path="/issues/new" component={IssueNew} />
        <PrivateRoute path="/issues/:id" component={IssueDetail} />
        <PrivateRoute path="/milestones" component={Milestones} />
        <PrivateRoute path="/milestone/new" component={MilestoneNew} />
        <PrivateRoute path="/milestone/:id/edit" component={MilestoneEdit} />
        <PrivateRoute path="/labels" component={Labels} />
      </Switch>
    </>
  );
};

export default App;
