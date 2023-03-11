import React, { useEffect, useState } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
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

const SendReferral = ({ setCheckReferral }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access-token")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/referrals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
      },
      body: JSON.stringify({
        referral: {
          email: email,
        },
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          setCheckReferral(json.referral);
          setEmail("");
        });
      } else {
        // Handle failed Signup
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
      <Button
        className={classes.button}
        type="submit"
        variant="contained"
        color="primary"
      >
        Send Invite
      </Button>
    </form>
  );
};

export default SendReferral;
