// React

// Icons
import {FaUserFriends} from 'react-icons/fa';
import {BiNetworkChart} from 'react-icons/bi';

// Pages

// components
import ProfileBox from "../subComponents/ProfileBox"
import Widget from '../subComponents/Widget';


function UserProfile() {
    const numberOfFriends = 10;
    const numberOfGroups = 3;
  
 
    return (
      <>
        <ProfileBox deslpayName={"John Smith"} profilePicUrl={""} numberOfStars={3.5}/>
      
      <section className="widgetBox">
        <Widget type={"Friends"} numberOf={numberOfFriends} icon={<FaUserFriends size="30px" title="Friends"/>}/>
        <Widget type={"Group"} numberOf={numberOfGroups} icon={<BiNetworkChart size="30px" title="Friends"/>}/>
      </section>
     
      </>
    );
  }
  
  export default UserProfile;
  