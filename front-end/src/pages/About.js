import '../assets/styles/About.css';
import '../assets/styles/App.css';
import logo from '../assets/images/dreamer-1-Alternate.png';

const About = props => {
  return (
    <div>
      <h1 className='font-bold'>About Us</h1>


      <div className='w-[90vw] md:w-[60vw] text-center md:text-lg'>
        <h3 className='text-2xl mb-2 text-purpleMedium'>While We Were Dreaming</h3>
        <p className=''><i>While We Were Dreaming</i> was created to bridge the disconnect often felt on an open-city campus like NYU.
          By pinning personal moments to a dynamic, anonymous map, all NYU students (past, present, and future) can reflect on their college journey and
          explore the memories of others.
          <br></br><br></br>
          The name, <i>While We Were Dreaming</i>, is inspired by the iconic
          "Dream Until It's Your Reality" graffiti that can be found scattered everywhere among campus and other places in the city
          that is often one of the first sights that greets students upon their arrival in New York. It resonates with the spirit of
          NYU, where the city and campus serve as the backdrop for countless dreams — thus, one can say this platform serves as a collective
            of all our memories and the things we did here "while we were dreaming".
        </p>
        <br></br>
        <h3 className='text-2xl mb-2 text-purpleMedium'>Meet The Team</h3>

        <i>While We Were Dreaming</i> was created by Team Dreamers, a group of six NYU students blending design and technology to bring campus memories to life. 
        Explore our individual contributions and work on <a class="underline" href="https://github.com/agiledev-students-fall2024/4-final-project-while-we-were-dreaming">GitHub</a>.
      </div>
      <br></br><br></br>
      <div className="aboutpg-buttoncontainer">
        <button type="button" className="feedback-btn" onClick={() => window.location.href = '/feedback'}>Feedback</button>
        <button type="button" className="contact-btn" onClick={() => window.location.href = '/contact'}>Contact</button>
      </div>
    </div>
  )
}

export default About;
