// import React, {useState} from 'react';
// import logo from './brookdale-community-college-mascot-logo.svg';

// CSS
import './App.css';

// Icons
import {FaUserFriends} from 'react-icons/fa';
import {BiNetworkChart} from 'react-icons/bi';

// Pages

// components
import ProfileBox from "./components/subComponents/ProfileBox"
import Widget from './components/subComponents/Widget';

function App() {
  // const [number, setNumber] = useState(0)
  const numberOfFriends = 10;
  const numberOfGroups = 3;

  return (
    <div className="app">
      <ProfileBox/>
      
      <section className="widgetBox">
        <Widget type={"Friends"} numberOf={numberOfFriends} icon={<FaUserFriends size="30px" title="Friends"/>}/>
        <Widget type={"Group"} numberOf={numberOfGroups} icon={<BiNetworkChart size="30px" title="Friends"/>}/>
      </section>
    </div>
  );
}

export default App;
