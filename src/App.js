import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import SignIn from './pages/login/login.js';
import DoctorPage from './pages/doctor/doctor.js';
import HospitalPage from './pages/hospital/hospital.js';

import './App.css';

import { ApolloProvider } from '@apollo/react-hooks';

const routing = (

  <Router>
    <div>
      <Switch>
        <Route path="/" exact component={SignIn}></Route>
        <Route path="/DoctorPage" component={DoctorPage}></Route>
        <Route path="/HospitalPage" component={HospitalPage}></Route>
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  </Router>

);

function App({ client }) {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        {routing}
      </div>
    </ApolloProvider>
  );
}

export default App;
