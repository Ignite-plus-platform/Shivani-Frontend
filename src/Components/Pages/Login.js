// import Bgpic1 from "../images/Bgpic1.jpg";
import styled from "styled-components";
import GoogleLogin from "react-google-login";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Home from "./Home";
import Targetpic from "../images/Targetpic.jpg";
//import Error from "../Error";

const AppStyles = styled.div`
.container{
  display:flex;
  height:100%;
  width=100%;
}
.head-text{
  position:relative;
}
.login{
  background:rgb(204,0,0);
  width:780px;
  height:710px;
  
}
.heading{
  position: absolute;
  right: 73%;
  left: 27%;
  bottom: 16%;
  font-size:1.5rem;
  text-align:center;
  height:20%;
  width:30%;
  color:black;
  padding-top:0.3rem;
  margin-top:0.6rem;
}
.innerbox{
  text-align:center;
  font-size:1.1rem;
  background:white;
  width:60%;
  height:60%;
  margin-top:9rem;
  margin-left:10rem;
  font-family:Cursive;//Palatino Linotype;
  padding-top:2rem;
  padding-left:0.5rem;
  padding-right:0.5rem;
  border-radius: 25px
}
`;

const Login = () => {
  const [showloginButton, setShowloginButton] = useState(true);
  //const history = useHistory();

  const onLoginSuccess = (res) => {
    //profile information of user trying to login
    var profile = res.profileObj;
    console.log(profile);
    console.log(profile.givenName);

    axios
      .get(`http://localhost:8080/login/getUser/${profile.email}`)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        localStorage.setItem("userid", response.data.userid);
        localStorage.setItem("username", response.data.name);
        localStorage.setItem("displayname", profile.givenName);
        localStorage.setItem("role", response.data.role);

        // render uer to home page

        setShowloginButton(false);
        console.log("registered user");
      })
      .catch(function (error) {
        if (error?.response?.request?.status === 401) {
          alert("This Email Id is not registered. Try using another Email Id");
        }
        //<Error />;
      });
  };

  const onLoginFailure = (res) => {
    alert("Login Failed");
  };

  return (
    <div>
      {showloginButton ? (
        <AppStyles>
          <div className="container">
            <header>
              <div className="head-text">
                <div className="background">
                  <img
                    src={Targetpic}
                    alt=""
                    style={{ height: "710px", width: "800px" }}
                  />
                </div>
                <div className="heading">
                  <h1>MENTOS</h1>
                </div>
              </div>
            </header>

            <div className="login">
              <div className="innerbox">
                <h1>Connecting Mentors and Mentees.</h1>
                <br></br>
                <br></br>
                <hr></hr>
                <h2>Login </h2>
                <GoogleLogin
                  clientId="415218634076-323ovbk93f9jptho379cs6cr7ffnlee2.apps.googleusercontent.com"
                  buttonText="Sign in via Gmail"
                  onSuccess={onLoginSuccess}
                  onFailure={onLoginFailure}
                  isSignedIn={true}
                  cookiePolicy={"single_host_origin"}
                  theme="dark"
                />
              </div>
            </div>
          </div>
        </AppStyles>
      ) : (
        <Router>
          <Route path="/" component={() => <Home authorized={true} />} />
        </Router>
      )}
    </div>
  );
};
export default Login;
