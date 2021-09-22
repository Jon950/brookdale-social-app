// React
import React, { useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Redux
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import {actionCreators} from "./dataLayer/actionCreators";

// Firebase
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebaseConfigDoc";

// CSS
import './App.css';


// Icons


// Pages
import Home from "./components/pages/Home"
import SignIn from './components/pages/SignIn';
import UserProfile from "./components/pages/UserProfile";
import SearchTable from "./components/pages/SearchTable"


function App() {
console.log("REACT_APP_Test", process.env.REACT_APP_Test)

const dispatch = useDispatch();
const {actionOne} = bindActionCreators(actionCreators, dispatch);
const userData = useSelector((state: any) => state.user);

useEffect(() =>{

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      actionOne(user);
    } else {
      // User is signed out
      
    }
  });
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])



  return (
    <Router>
    <div className="app">
      {userData.payload === undefined ? <SignIn /> : 
      
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/userprofile">
          <UserProfile />
        </Route>

        <Route exact path="/searchtable">
          <SearchTable />
        </Route>
       </Switch>
}
    </div>
    </Router>
  );
}
export default App;
