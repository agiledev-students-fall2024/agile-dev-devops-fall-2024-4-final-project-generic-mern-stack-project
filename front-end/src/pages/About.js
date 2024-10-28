import '../assets/styles/About.css';
import logo from '../assets/images/dreamer-1-Alternate.png';

const About = props => {
    return (
      <div>
        <h1>About Us</h1>

        <img src={logo} alt="Logo" className="Altlogo"/>  

        <h2> While We Were Dreaming is a location-based platform designed to connect NYU students through the shared memories they create on campus. By pinning personal experiences to a dynamic map, students can reflect on key moments of their college journey and explore the memories of others enhanced by anonymity. This platform fosters a sense of community and nostalgia, bridging the emotional gap often felt in an open-city campus like NYU. The map becomes a collective memory, capturing the dreams and experiences of past, present, and future students.</h2>

        <div className= "aboutpg-buttoncontainer">
          <button type="button" className="feedback-btn" onClick={() => window.location.href='/feedback'}>Feedback</button>
          <button type="button" className="contact-btn" onClick={() => window.location.href='/contact'}>Contact</button>
        </div>
      </div>
    )
  }

export default About;
