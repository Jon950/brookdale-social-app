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

// Pages
import Home from "./components/pages/Home";
import SignIn from './components/pages/SignIn';
import UserProfile from "./components/pages/UserProfile";
import SearchTable from "./components/pages/SearchTable";
import FormPage from "./components/pages/FormPage";
import GroupProfile from "./components/pages/GroupProfile";


function App() {
console.log("REACT_APP_Version", process.env.REACT_APP_Version);

const dispatch = useDispatch();
const {actionOne} = bindActionCreators(actionCreators, dispatch);
const userData = useSelector((state: any) => state.user);

useEffect(() =>{
  if(userData.payload === undefined && window.location.pathname !== "/") {
    window.location.replace("/");
  }

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

        <Route exact path="/creategroup">
          <FormPage formName="Group" formDescription="By creating a group, you will become the author. 
          This means, you will have the responsibility of accepting or blocking any users who wishes to join."/>
        </Route>

        <Route exact path="/groupprofile">
          <GroupProfile />
        </Route>
       </Switch>
       }
    </div>
    </Router>
  );
}
export default App;
