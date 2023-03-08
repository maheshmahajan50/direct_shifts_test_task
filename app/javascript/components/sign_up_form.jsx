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

const SignUpForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
      }),
    }).then((response) => {
      if (response.ok) {
      } else {
        // Handle failed login
      }
    });
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        label="First Name"
        type="text"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        required
      />
      <TextField
        className={classes.textField}
        label="Last Name"
        type="text"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        required
      />
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
      <TextField
        className={classes.textField}
        label="Password Confirmation"
        type="password"
        value={passwordConfirmation}
        onChange={(event) => setPasswordConfirmation(event.target.value)}
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

export default SignUpForm;
