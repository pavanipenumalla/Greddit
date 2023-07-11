import React from "react";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  // const [state,setState] = React.useState("Login");
  // return (!loggedIn) ? <Form /> : <h1>Hello</h1>;
  const nav=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('isLoggedIn')==='true')
    {
       nav('/profile');
    }
  });

  const [login, setLogin] = React.useState(true);
  const [register, setRegister] = React.useState(false);

  function handleLogin() {
    setRegister(false);
    setLogin(true);
  }

  function handleRegister() {
    setRegister(true);
    setLogin(false);
  }

  return (
    <div className="card center card1">
      <div className="card-body">
        <i class="fa-brands fa-reddit fa-4x icon"></i>
        <br />
        <button
          type="submit"
          className="btn btn-dark home-btn"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          type="submit"
          className="btn btn-dark home-btn"
          onClick={handleRegister}
        >
          Register
        </button>
        {login && <Login />}
        {register && <Register />}
      </div>
    </div>
  );
}

export default Home;
