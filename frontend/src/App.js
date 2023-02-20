import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import NavBar from "./components/NavBar/NavBar";

import MainPage from "./components/MainPage/MainPage";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import Griefs from "./components/Griefs/Griefs";
import Profile from "./components/Profile/Profile";
import GriefCompose from "./components/Griefs/GriefCompose";
import UnionForm from "./components/Unions/UnionForm";

import { getCurrentUser } from "./store/session";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <NavBar />
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />

          <ProtectedRoute exact path="/unions/new" component={UnionForm} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/griefs" component={Griefs} />
          <ProtectedRoute exact path="/griefs/new" component={GriefCompose} />
        </Switch>
      </>
    )
  );
}

export default App;
