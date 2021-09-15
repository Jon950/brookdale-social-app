// React
// import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// CSS
import './App.css';


// Icons


// Pages
import Home from "./components/pages/Home"
import SignIn from './components/pages/SignIn';
import UserProfile from "./components/pages/Home";

// components


function App() {


  return (
    <Router>
    <div className="app">
      {false ? <SignIn /> : 
      
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/userprofile">
          <UserProfile />
        </Route>
       </Switch>
}
    </div>
    </Router>
  );
}

export default App;
