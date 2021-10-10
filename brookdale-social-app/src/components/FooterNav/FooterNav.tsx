// React
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
  
// Icons
import { AiFillHome } from 'react-icons/ai';
import { RiArrowGoBackFill } from 'react-icons/ri';

// CSS
import "./footerNav.css";
  

  const FooterNav = () => {
    const history = useHistory();
  
    return (
      <nav className="footerNav">
         
        <div className="btn" onClick={history.goBack}><RiArrowGoBackFill  title="goBack" className="icon"/></div>

        <Link to="/">
          <div className="btn"><AiFillHome  title="Home" className="icon"/></div>
        </Link>
      </nav>
    );
  }
  
  export default FooterNav;
  