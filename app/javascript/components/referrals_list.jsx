import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const ReferralsList = ({ checkReferral, token }) => {
  const classes = useStyles();
  const [referrals, setReferrals] = useState([]);
  const access_token = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    if (token) {
      fetchReferrals();
    }
  }, [checkReferral, token]);

  const fetchReferrals = async () => {
    await fetch("/referrals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "access-token": access_token,
        client: client,
        uid: uid,
      },
    }).then((response) => {
      return response.json().then((json) => {
        setReferrals(json.referrals);
      });
    });
  };

  return (
    <>
      <h2>Sent referral list:</h2>
      <div className={classes.root}>
        <Typography className={classes.heading}>User Emails:</Typography>
        <List component="nav" aria-label="list of items">
          {referrals &&
            referrals.map((item) => (
              <>
                <ListItem key={item.id}>
                  <ListItemText primary={item.email} />
                </ListItem>
              </>
            ))}
        </List>
      </div>
    </>
  );
};

export default ReferralsList;
