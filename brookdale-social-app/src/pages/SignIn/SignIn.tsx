// Icons
import {FcGoogle} from 'react-icons/fc';
import logo from '../../images/brookdale-community-college-mascot-logo.svg';

// Firebase
import { auth, provider } from "../../firebaseConfigDoc";
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

// CSS
import "./signIn.css";


function SignIn() {

 const signInWithGoole = () => {
  
   signInWithRedirect(auth, provider);
   
   getRedirectResult(auth)
    .then((result: any) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential: any = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;

      console.log("token user",token, user);
    
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...

      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);
      console.log("email", email);
      console.log("credential", credential);
    });
  }
 
    return (
      <div className="signInPage">
      <section className="welcomeSection">
      <img src={logo} alt="BsocialX Logo" width="250" height="250"></img>
        <h1>Welcome To BsocialX</h1>
      </section>

      <section className="signInBtnBox">
        <button onClick={signInWithGoole} className="signInBtn"><FcGoogle size="40"/> SignIn With Google</button>
        <p>The Brookdale Social Experiment or BsocialX, is a research app designed to study the response of a particular policy.</p>
      </section>
      </div>
    );
  }
  
  export default SignIn;
  