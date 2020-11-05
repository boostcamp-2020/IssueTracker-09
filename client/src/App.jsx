import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Callback,
  Login,
  Issues,
  IssueNew,
  IssueDetail,
  MilestoneNew,
  Milestones,
} from './pages';
import Layout from './components/Layout';

const App = () => {
  return (
    <>
      <Layout />
      <Switch>
        <Route path="/callback" component={Callback} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Issues} />
        <Route path="/issues/new" component={IssueNew} />
        <Route path="/issues/:id" component={IssueDetail} />
        <Route path="/milestones" component={Milestones} />
        <Route path="/milestone/new" component={MilestoneNew} />
        <Route path="/milestone/:id/edit" component={MilestoneNew} />
        <Route path="/labels" component={Login} />
      </Switch>
    </>
  );
};

export default App;
