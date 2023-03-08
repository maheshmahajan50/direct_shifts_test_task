import React, { useState } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(8),
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  button: {
    width: "100%",
  },
}));

const LoginForm = ({ setToken }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/auth/sign_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (response.ok) {
        for (let entry of response.headers.entries()) {
          if (entry[0] === "access-token") {
            localStorage.setItem("access-token", entry[1]);
            setToken(entry[1]);
          }
          if (entry[0] === "client") {
            localStorage.setItem("client", entry[1]);
          }
        }
      } else {
        // Handle failed login
      }
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <TextField
        className={classes.textField}
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <Button
        className={classes.button}
        type="submit"
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
