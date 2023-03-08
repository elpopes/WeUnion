import "./MainPage.css";
import Footer from "../Footer/Footer";

function MainPage() {
  return (
    <>
      <div className="main-page">
        <div className="hero">
          <div className="quote">
            <img src={"weunionlogo2.png"} alt="logo" />
            <div className="words">"If you want to go far, go together."</div>
            <div className="attribute">-Lao Tsu</div>
          </div>
          <div className="feature-1">
            <div className="feature-1-left">
              <h2 className="feature-title">Create your own union</h2>
            </div>
            <div className="feature-1-right">
              <ol className="feature-description">
                <li>
                  WeUnion enables you to establish your own rights and
                  protections as a group
                </li>
                <br />
                <li>
                  You can easily draft and publish your union's bylaws and
                  governing documents, allowing you to set the rules and
                  standards for your members to follow
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
        </div>
      </div>
      <Footer className="footer" />
    </>
  );
}

export default MainPage;
