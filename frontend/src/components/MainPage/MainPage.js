import "./MainPage.css";
import Footer from "../Footer/Footer";

function MainPage() {
  return (
    <>
      <div className="main-page">
        <div className="hero">
          <img src={"weunionlogo2.png"} alt="logo" />
          <div className="quote">
            <div className="words">
              "Never doubt that a small group of thoughtful, committed citizens
              can change the world. Indeed, it is the only thing that ever has."
            </div>
            <div className="attribute">-Margaret Mead</div>
          </div>
        </div>
        <div className="feature-1">
          <div className="feature-1-left">
            <h2 className="feature-title">Establish Rights</h2>
          </div>
          <div className="feature-1-right">
            <ol className="feature-description">
              <li>
                WeUnion enables you to establish your own rights and protections
                as a group
              </li>
              <br />
              <li>
                You can easily draft and publish your union's bylaws and
                governing documents, allowing you to set the rules and standards
                for your members to follow
              </li>
              <br />
              <li>
                With WeUnion, you can ensure that your union is held to the
                highest standards of transparency, accountability, and ethical
                conduct
              </li>
            </ol>
          </div>
        </div>
        <div className="feature-2">
          <div className="feature-2-left">
            <ol className="feature-description">
              <li>
                WeUnion empowers you to file your grievances and take action
                against unfair or unethical practices
              </li>
              <br />
              <li>
                You can easily log your grievances and track their status as
                they are being resolved
              </li>
              <br />
              <li>
                With WeUnion, you can also join other unions and access a
                database of grievances and actions taken by unions across the
                world
              </li>
            </ol>
          </div>
          <div className="feature-2-right">
            <h2 className="feature-title">File Your Grievances</h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
