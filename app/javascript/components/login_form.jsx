import React, { useState } from "react";
import {
  TextField,
  Button,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

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
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        for (let entry of response.headers.entries()) {
          if (
            entry[0] === "access-token" ||
            entry[0] === "client" ||
            entry[0] === "uid"
          ) {
            localStorage.setItem(entry[0], entry[1]);
            if (entry[0] === "access-token") {
              setToken(entry[1]);
            }
          }
        }
      } else {
        return response.json().then((json) => {
          setError(json.errors);
        });
      }
    } catch (error) {}
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <br />
      {error && <FormHelperText error>{error}</FormHelperText>}
      <br />
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
      <Button
        onClick={() => {
          navigate("/sign_up");
        }}
      >
        {" "}
        Sign Up
      </Button>
    </form>
  );
};

export default LoginForm;
