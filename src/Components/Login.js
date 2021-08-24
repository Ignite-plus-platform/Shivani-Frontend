import React, { useState } from "react";
import axios from "axios";

const LoginUser = () => {
  // const [user, setUser] = useState("");
  // const [role, setRole] = useState("");

  const ans = axios
    .get(`http://localhost:8083/login/getUser/shivani.deshmukh@cumminscollege.in`)
    .then((response) => {
      console.log(response.data);
      localStorage.setItem("user", response.data.name);
      localStorage.setItem("role", response.data.role);
      const username = response.data.name;
      const role = response.data.role;
      console.log("name :" + username + " role :" + role);
      if (response.data) {
        console.log("registrered");
      } else {
        console.log("not registered");
      }
    })
    .catch((error) => console.log(error));
  console.log(ans);
  // localStorage.setItem("user",ans)
};

const Login = () => {
  return (
    <div>
      <button onClick={LoginUser}>login</button>
    </div>
  );
};

export default Login;
