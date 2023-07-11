import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
// import user from "../../../backend/models/usermodel";

function Profile() {
  const nav = useNavigate();

  // user details
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [age, setAge] = useState();
  const [number, setNumber] = useState();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  function handleEdit(event) {
    const email = localStorage.getItem("email");
    const user = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      age: setAge,
      number: setNumber,
      email: email,
      followers: followers,
      following: following,
    };

    axios
      .put("/api/editprofile", user)
      .then((res) => {
        alert("Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //rememail = email to be removed
  function handleRemove(data) {
    const email = localStorage.getItem("email");

    axios
      .put("/api/handleremove1", { rememail: data, email: email })
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .put("/api/handleremove2", { rememail: data, email: email })
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUnfollow(data) {
    const email = localStorage.getItem("email");

    axios
      .put("/api/handleunfollow1", { rememail: data, email: email })
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .put("/api/handleunfollow2", { rememail: data, email: email })
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function def(e) {
    e.preventDefault();
  }

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      nav("/");
    }
    const email = localStorage.getItem("email");
    axios
      .get("/api/getprofile", { params: { email: email } })
      .then((res) => {
        setFirstName(res.data.firstname);
        setLastName(res.data.lastname);
        setUserName(res.data.username);
        setAge(res.data.age);
        setNumber(res.data.number);
        setFollowers(res.data.followers);
        setFollowing(res.data.following);
        console.log(firstname, lastname, username, age, number);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <div className="card card2 center justify-content-center">
        <div className="card-body">
          <div className="dp">
            <img
              src="https://i.pinimg.com/originals/de/99/93/de9993e752fc52646579448542c411d3.jpg"
              className="card-img"
            ></img>
          </div>
          {/* <span className="btn btn-outline-light profile-btn"> 7 Posts</span> */}
          <span
            className="btn btn-outline-light profile-btn"
            data-bs-toggle="modal"
            data-bs-target="#Followers"
          >
            {followers.length} Followers
          </span>

          <span
            className="btn btn-outline-light profile-btn"
            data-bs-toggle="modal"
            data-bs-target="#Following"
          >
            {following.length} Following
          </span>
          <div>
            <i
              class="fa-sharp fa-solid fa-user fa-2x"
              data-bs-toggle="modal"
              data-bs-target="#editProfile"
            ></i>
          </div>
          <div className="bio">
            <h2>
              {firstname} {lastname}{" "}
            </h2>
            <p>{username}</p>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <div
        class="modal fade modal-dialog-scrollable"
        id="editProfile"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Profile
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div>
                <form>
                  <div className="form-floating">
                    <input
                      className="form-control"
                      name="firstname"
                      type="text"
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="off"
                      value={firstname}
                    />
                    <label for="floatingInput">First Name</label>
                  </div>
                  <br />
                  <div className="form-floating">
                    <input
                      className="form-control"
                      name="lastname"
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="off"
                      value={lastname}
                    />
                    <label for="floatingInput">Last Name</label>
                  </div>
                  <br />
                  <div className="form-floating">
                    <input
                      className="form-control"
                      name="username"
                      type="text"
                      placeholder="User Name"
                      onChange={(e) => setUserName(e.target.value)}
                      autoComplete="off"
                      value={username}
                    />
                    <label for="floatingInput">User Name</label>
                  </div>
                  <br />
                  <div className="form-floating">
                    <input
                      className="form-control"
                      name="age"
                      type="text"
                      placeholder="Age"
                      onChange={(e) => setAge(e.target.value)}
                      autoComplete="off"
                      value={age}
                    />
                    <label for="floatingInput">Age</label>
                  </div>
                  <br />
                  <div className="form-floating">
                    <input
                      className="form-control"
                      name="number"
                      type="text"
                      placeholder="Phone Number"
                      onChange={(e) => setNumber(e.target.value)}
                      autoComplete="off"
                      value={number}
                    />
                    <label for="floatingInput">Phone Number</label>
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-outline-dark home-btn button-center"
                    onClick={handleEdit}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Followers */}
      <div
        class="modal fade modal-dialog-scrollable modal-sm"
        id="Followers"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Followers
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {followers.map((e) => (
                <div style={{ paddingBottom: "1em" }}>
                  <span className="names">{e}</span>
                  <button
                    className="remove-btn btn-outline-secondary btn"
                    onClick={() => {
                      handleRemove(e);
                      def();
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Following */}
      <div
        class="modal fade modal-dialog-scrollable modal-sm"
        id="Following"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Following
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {following.map((e) => (
                <div style={{ paddingBottom: "1em" }}>
                  <span className="names">{e}</span>
                  <button
                    className="unfollow-btn btn-outline-secondary btn"
                    onClick={() => {
                      handleUnfollow(e);
                      def();
                    }}
                  >
                    Unfollow
                  </button>
                </div>
              ))}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
