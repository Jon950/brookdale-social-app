// React
// import React, {useState} from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";

// CSS
import './App.css';

// Icons


// Pages
import Home from "./components/pages/Home"
import SignIn from './components/pages/SignIn';

// components


function App() {


  return (
    // <Router>
    <div className="app">
      {false ? <SignIn /> : 
      
      // <Switch>
      // <Route ex path="/about">
      <Home />
          // </Route>
      // </Switch>
}
    </div>
    // </Router>
  );
}

export default App;
