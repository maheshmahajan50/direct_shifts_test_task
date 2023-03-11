import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import LoginForm from "./login_form";
import SignupForm from "./sign_up_form";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./dashboard";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            {token ? (
              <Route path="/" element={<Dashboard />} />
            ) : (
              <Route path="/" element={<LoginForm setToken={setToken} />} />
            )}
            <Route
              path="/sign_up"
              element={<SignupForm setToken={setToken} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("root");
  ReactDOM.render(<App />, rootEl);
});
