import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";

function NavBar() {
  const loggedIn = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="nav-bar">
          <div className="links-nav">
            {/* <Link to={"/griefs"}>Grievances</Link> */}
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/griefs/new"}>Lodge a Grievance</Link>
            <Link to={"/unions/new"}>Create a New Union</Link>
            <Link to={"/unions"}>All Unions</Link>
            <button onClick={logoutUser}>Logout</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="nav-bar">
          <div className="links-auth">
            <Link to={"/signup"}>Signup</Link>
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="nav-container">
      <a href="/">
        <img src={"/weUnionArmy.png"} alt="logo" />
      </a>
      {getLinks()}
    </div>
  );
}

export default NavBar;
