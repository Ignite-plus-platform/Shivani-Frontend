import GoogleLogin from "react-google-login";
import React, { useState } from "react";
import Home from "./Pages/Home";
import axios from "axios";

const GoogleAuthentication = () => {
  const [showloginButton, setShowloginButton] = useState(true);

  const onLoginSuccess = (res) => {
    //profile information of user trying to login
    var profile = res.profileObj;
    console.log(profile);

    axios
      .get(`http://localhost:8080/login/getUser/${profile.email}`)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("userid", response.data.userid);
        localStorage.setItem("username", response.data.name);
        localStorage.setItem("role", response.data.role);

        //if response is not null, then the user is registered user. render uer to home page
        if (response.data) {
          console.log("registered user");
          setShowloginButton(false);
        } else {
          //user is not registered user
          console.log("not registered");
          setShowloginButton(true);
          alert("This Email Id is not registered. Try using another Email Id");
        }
      })
      .catch((error) => console.log(error));
  };

  const onLoginFailure = (res) => {
    alert("Login Failed");
  };

  return (
    <div>
      {showloginButton ? (
        <GoogleLogin
          clientId="415218634076-323ovbk93f9jptho379cs6cr7ffnlee2.apps.googleusercontent.com"
          buttonText="Sign"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
        />
      ) : (
        <Home />
      )}
    </div>
  );
};

export default GoogleAuthentication;
