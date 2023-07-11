import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Input from "./Input";
import Profile from "./Profile";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (data.user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", email);
      nav("/profile");
    }else{
      alert("Invalid Credentials");
    }

    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleLogin} className="login">
        <div className="form-floating">
          <input
            className="form-control"
            name="name"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            autoComplete="off"
            value={email}
          />
          <label for="floatingInput">Email</label>
        </div>
        <br />
        <div className="form-floating">
          <input
            className="form-control"
            name="pass"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
          />
          <label for="floatingInput">Password</label>
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-light home-btn"
          disabled={!(email != "" && password != "")}
          id="signin"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Login;
