import "./MainPage.css";

function MainPage() {
  return (
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

      <div className="features-container">
        <ul className="features-list">
          <li className="main-feature">
            Create Union Easily
            <ul className="feature-details">
              <li>Invite the People to Join</li>
              <li>Establish Rights</li>
              <li>Organize Actions</li>
            </ul>
          </li>
          <li className="main-feature">
            Membership Means
            <ul className="feature-details">
              <li>Digital Membership Card</li>
              <li>Create Grievances</li>
              <li>Start an Action</li>
              <li>Vote!</li>
              <li>Receive Notification</li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="footer-container">
        <footer>Copyright &copy; 2023 NYPU</footer>
      </div>
    </div>
  );
}

export default MainPage;
