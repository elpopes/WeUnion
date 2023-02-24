import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./reset.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/store";
import jwtFetch from "./store/jwt";
import * as sessionActions from "./store/session";
import * as griefActions from "./store/griefs";
import * as unionActions from "./store/unions";
import * as errorActions from "./store/errors";


let store = configureStore({});

if (process.env.NODE_ENV !== "production") {
  window.store = store;
  window.jwtFetch = jwtFetch;
  window.sessionActions = sessionActions;
  window.griefActions = griefActions;
  window.unionActions = unionActions;
  window.errorActions = errorActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
