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
      <div className="container">
        <div className="blueBackground">
          <div className="signInBox">
            {/* <h1>Already Have an Account?</h1> */}
            <form className="session-form" onSubmit={handleSubmit}>
              {/* <h2>Log In Form</h2> */}
              <div className="errors">{errors?.email}</div>
              <label>
                <span>Email</span>
                <input
                  type="text"
                  value={email}
                  onChange={update("email")}
                  placeholder="Email"
                />
              </label>
              <div className="errors">{errors?.password}</div>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={update("password")}
                  placeholder="Password"
                />
              </label>
              <input
                type="submit"
                value="Log In"
                disabled={!email || !password}
              />
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
      </div>
    </div>
  );
}

export default LoginForm;
