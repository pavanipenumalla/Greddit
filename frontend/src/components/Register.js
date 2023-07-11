import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [temp, setTemp] = useState("");
  const nav = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        firstname,
        lastname,
        username,
        age,
        number,
        email,
        password,
      }),
    });

    const userData = await res.json();
    console.log(userData);
    if (userData.error) {
      alert("Already registered with the email");
    } else {
      window.location.reload();
    }
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <div className="form-floating">
          <input
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
            type="text"
            placeholder="First Name"
            autoComplete="off"
          />
          <label for="floatingInput">First Name</label>
        </div>
        <br />

        <div className="form-floating">
          <input
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            type="text"
            placeholder="Last Name"
            autoComplete="off"
          />
          <label for="floatingInput">Last Name</label>
        </div>
        <br />
        <div className="form-floating">
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="form-control"
            type="text"
            placeholder="userName"
            autoComplete="off"
          />
          <label for="floatingInput">userName</label>
        </div>
        <br />

        <div className="parallel">
          <div className="form-floating" style={{ width: "25%" }}>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control"
              type="number"
              placeholder="Age"
              autoComplete="off"
            ></input>
            <label for="floatingInput">Age</label>
          </div>

          <div
            className="form-floating"
            style={{ marginLeft: "5%", width: "70%" }}
          >
            <input
              value={number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="form-control"
              type="text"
              placeholder="PhoneNumber"
              autoComplete="off"
            ></input>
            <label for="floatingInput">PhoneNumber</label>
          </div>
        </div>
        <br />

        <div className="form-floating">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            type="mail"
            placeholder="Email"
            autoComplete="off"
          ></input>
          <label for="floatingInput">Email</label>
        </div>
        <br />

        <div className="form-floating">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            type="password"
            placeholder="Password"
            autoComplete="off"
          ></input>
          <label for="floatingInput">Password</label>
        </div>
        <br />

        <div className="form-floating">
          <input
            value={temp}
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setTemp(e.target.value)}
            autoComplete="off"
          ></input>
          <label for="floatingInput">Confirm Password</label>
        </div>
        <br />
        <button
          class="btn btn-dark home-btn"
          disabled={
            !(
              email != "" &&
              password != "" &&
              firstname != "" &&
              lastname != "" &&
              username != "" &&
              age != "" &&
              temp != ""
            )
          }
        >
          {" "}
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Register;
