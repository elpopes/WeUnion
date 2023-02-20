import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SessionForm.css";

import { login, clearSessionErrors } from "../../store/session";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unionName, setUnionName] = useState("");
  const errors = useSelector((state) => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    return (e) => {
      if (field === "email") {
        setEmail(e.currentTarget.value);
      } else if (field === "password") {
        setPassword(e.currentTarget.value);
      } else if (field === "unionName") {
        setUnionName(e.currentTarget.value);
      }
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, unionName }));
  };

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2>Log In Form</h2>
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
      <div className="errors">{errors?.union}</div>
      <label>
        <span>Union Name</span>
        <input
          type="text"
          value={unionName}
          onChange={update("unionName")}
          placeholder="Union"
        />
      </label>

      <input type="submit" value="Log In" disabled={!email || !password} />
    </form>
  );
}

export default LoginForm;
