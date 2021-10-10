// React
import React, { useEffect, useState} from 'react';
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
import Home from "./pages/Home/Home";
import SignIn from './pages/SignIn/SignIn';
import UserProfile from "./pages/UserProfile/UserProfile";
import SearchTable from "./pages/SearchTable/SearchTable";
import FormPage from "./pages/Form/FormPage";
import GroupProfile from "./pages/GroupProfile/GroupProfile";

// Loaders
import Loader from "react-loader-spinner";


function App() { 
console.log("REACT_APP_Version", process.env.REACT_APP_Version);

const dispatch = useDispatch();
const {actionOne} = bindActionCreators(actionCreators, dispatch);
const userData = useSelector((state: any) => state.user);

const [isLoading, setIsLoading] = useState<string>("notReady");

useEffect(() =>{
  if(userData.payload === undefined && window.location.pathname !== "/") {
    window.location.replace("/");
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      actionOne(user);
      setIsLoading("userSignedIn");
    } else {
      // User is signed out
      console.log("D")
      setIsLoading("userNotSignedIn");
    }
  });
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  return (
    <Router>
    <div className="app">
      {isLoading === "notReady" ? 
      <div className="loadingScreen">
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
      /> 
      </div>
      : 
      isLoading === "userSignedIn" ? 
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

       : <SignIn />
       }
    </div>
    </Router>
  );
}
export default App;
