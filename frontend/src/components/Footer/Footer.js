import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="tech-stack">
        <span>Technologies Used: </span>
        <a href="https://www.mongodb.com/">MongoDB</a>
        <a href="https://expressjs.com/">Express</a>
        <a href="https://reactjs.org/">React</a>
        <a href="https://nodejs.org/en/">NodeJS</a>
        <a href="https://www.css3.info/">CSS3</a>
        <a href="https://www.twilio.com/">Twilio</a>
      </div>
      <div className="creators">
        <span>Created By: </span>
        <p>
          Lorenzo Tijerina
          <a
            href="https://www.linkedin.com/in/lorenzo-tijerina-a144bb6/"
            target="_blank"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/elpopes" target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>
          |
        </p>
        <p>
          Emmanuel Little
          <a href="" target="_blank">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/MannyLittle133s" target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>
          |
        </p>
        <p>
          Cornell Bethea
          <a href="https://www.linkedin.com/in/cornell-bethea-a5349a97/" target="_blank">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/CornellB02" target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>
          |
        </p>
        <p>
          Yosyp Dobosh
          <a href="https://www.linkedin.com/in/yosypdobosh/" target="_blank">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="https://github.com/dobosh28" target="_blank">
            <i className="fa-brands fa-github"></i>
          </a>
        </p>
        
      </div>
    </div>
  );
};

export default Footer;
