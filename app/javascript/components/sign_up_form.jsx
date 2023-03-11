import React, { useEffect, useState } from "react";
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

const SignUpForm = ({ setToken }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let params = new URL(document.location).searchParams;
    let referral_id = params.get("referral_id");
    try {
      const response = await fetch("/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          referral_id: referral_id,
          password: password,
          password_confirmation: passwordConfirmation,
        }),
      });

      if (response.ok) {
        for (let entry of response.headers.entries()) {
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
        }
        navigate("/");
      } else {
        return response.json().then((json) => {
          setError(json.errors.full_messages);
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
        Sign Up
      </Button>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Sign In
      </Button>
    </form>
  );
};

export default SignUpForm;
