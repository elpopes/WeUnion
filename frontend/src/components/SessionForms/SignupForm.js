import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup, clearSessionErrors } from "../../store/session";
import "./SessionForm.css";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [unionName, setUnionName] = useState("World Union by Default");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "unionName":
        setState = setUnionName;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unknown field in Signup Form");
    }

    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalUnion =
      unionName === "World Union by Default"
        ? "6401194415a95dbbd9eb3bab"
        : unionName;
    const user = {
      email,
      username,
      unionName: finalUnion,
      password,
    };

    dispatch(signup(user));
  };

  return (
    <div className="signup-background">
      <div className="form-container">
        <div className="signup-form-container">
          <form className="session-form">
            <h2>Sign Up</h2>
            <div className="errors">{errors?.email}</div>
            <label>Email </label>

            <input
              type="text"
              value={email}
              onChange={update("email")}
              placeholder="Email"
            />

            <div className="errors">{errors?.username}</div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={update("username")}
              placeholder="Username"
            />

            <div className="errors">{errors?.union}</div>
            <label>Union Number</label>
            <input
              type="text"
              value={unionName}
              onChange={update("unionName")}
              placeholder="World Union by Default"
            />

            <div className="errors">{errors?.password}</div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={update("password")}
              placeholder="Password"
            />

            <div className="errors">
              {password !== password2 && "Confirm Password field must match"}
            </div>
            <label>Confirm Password</label>
            <input
              type="password"
              value={password2}
              onChange={update("password2")}
              placeholder="Confirm Password"
            />

            <button
              className="login-button"
              type="button"
              onClick={handleSubmit}
              disabled={
                !email || !username || !password || password !== password2
              }
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
