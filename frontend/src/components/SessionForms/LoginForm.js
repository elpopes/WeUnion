import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.css";

import { login, clearSessionErrors } from "../../store/session";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail("");
    setPassword("");
    dispatch(clearSessionErrors());
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleDemoUser = () => {
    setEmail("demo-user@appacademy.io");
    setPassword("starwars");
    dispatch(login({ email: "demo-user@appacademy.io", password: "password" }));
  };

  return (
    <div className="login-background">
      <div className="form-container">
        {/* <h1>Already Have an Account?</h1> */}
        <form className="session-form">
          <h2>Log In</h2>
          <div className="errors">{errors?.email}</div>
          <label>Email</label>
          <input
            // className="login-input"
            type="text"
            value={email}
            onChange={update("email")}
            placeholder="Email"
          />
          <div className="errors">{errors?.password}</div>
          <label>Password</label>
          <input
            // className="login-input"
            type="password"
            value={password}
            onChange={update("password")}
            placeholder="Password"
          />
          <button
            className="login-button"
            type="button"
            value="Log In"
            onClick={handleSubmit}
            disabled={!email || !password}
          >
            Log In
          </button>
          <br />
          <br />
          <button
            type="button"
            className="demo-button"
            onClick={handleDemoUser}
          >
            Demo User
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
