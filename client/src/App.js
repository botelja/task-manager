import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Tasks from './components/Tasks';
import SingleTask from './components/SingleTask';
import './App.css';

const App = () => {
  return (
    <div className="container mt-4">
      <Switch>
        <Route exact path="/" component={Tasks} />
        <Route exact path="/task/:id" component={SingleTask} />
      </Switch>
    </div>
  );
};

export default App;
