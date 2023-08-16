import Wrapper from "../assets/wrappers/LandingWrapper";
import main from '../assets/images/main.svg'
import Logo from '../components/Logo'
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/register')
  }

  return (
    <Wrapper>
      <nav>
        <Logo />   
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Task <span>Managing</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam
            similique corrupti modi dolorum optio, harum ut, fugiat
            necessitatibus possimus aliquam mollitia illum eaque doloremque
            ipsam molestiae adipisci at reprehenderit aspernatur exercitationem
            totam vel odio aperiam nam officiis. Possimus, aliquam impedit!
          </p>
          <button className="btn btn-hero" onClick={handleClick}> 
            register/login
          </button>
        </div>
        <img src={main} alt="img" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
