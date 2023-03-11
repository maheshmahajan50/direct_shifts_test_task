import React, { useState } from "react";
import SendReferral from "./send_referral";
import ReferralsList from "./referrals_list";
import Button from "@mui/material/Button";

const Dashboard = ({ setToken, token }) => {
  const [checkReferral, setCheckReferral] = useState();

  const logoutHandler = () => {
    fetch("/auth/sign_out", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
      },
    }).then((response) => {
      if (response.ok) {
        localStorage.removeItem("access-token");
        localStorage.removeItem("client");
        localStorage.removeItem("uid");
        setToken(null);
      } else {
        // Handle failed Signup
      }
    });
  };

  return (
    <>
      <Button variant="contained" onClick={logoutHandler}>
        LogOut
      </Button>
      <SendReferral setCheckReferral={setCheckReferral} />
      <ReferralsList checkReferral={checkReferral} token={token} />
    </>
  );
};

export default Dashboard;
