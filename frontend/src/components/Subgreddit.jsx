import React from "react";
import { useParams } from "react-router";
import Navbar from "./Navbar";
// import Nav from "./Navbar2";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./styles.css";

function SubGreddit() {
  const [users, setUsers] = useState([]);
  const [blockedusers, setBlockedUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [reports, setReports] = useState([]);
  const [posts, setPosts] = useState(0);
  const [ignore, setIgnore] = useState(false);
  const name = useParams();
  const email = localStorage.getItem("email");
  const nav = useNavigate();

  function handleAccept(data) {
    axios
      .post("/api/handleaccept", {
        reqemail: data,
        email: email,
        name: name.id,
      })
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleReject(data) {
    const email = localStorage.getItem("email");
    axios
      .post("/api/handlereject", {
        reqemail: data,
        email: email,
        name: name.id,
      })
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleIgnore(data) {
    axios
      .post("/api/ignore", { post_id: data })
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDel(data) {
    axios
      .post("/api/del1", { post_id: data })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/del2", { post_id: data })
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/num1", { name: name.id, len: posts - 1 })
      .then((res) => {
        // console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleBlock(data) {
    if (!(data === email)) {
      axios
        .post("/api/block1", { name: name.id, email: data })
        .then((res) => {
          window.location.reload();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Cannot block Yourself");
    }

    // axios
    // .post("/api/block2",{name:name.id,report:report})
    // .then((res)=>{
    //    window.location.reload();
    //    console.log(res);
    // })
    // .catch((err)=>{
    //   console.log(err);
    // })
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
      .post("/api/getUsers", { email: email, name: name.id })
      .then((res) => {
        setUsers(res.data.users);
        setRequests(res.data.requests);
        setBlockedUsers(res.data.blocked_users);
        setPosts(res.data.No_of_posts);
        console.log(users);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/getreports", { name: name.id })
      .then((res) => {
        setReports(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <ul
          class="nav nav-tabs nav2 justify-content-center"
          id="myTab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <button
              class="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
            >
              Users
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
            >
              Joining Requests
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#contact-tab-pane"
              type="button"
              role="tab"
              aria-controls="contact-tab-pane"
              aria-selected="false"
            >
              Reports
            </button>
          </li>
          <li class="nav-item" role="presentation">
            <button
              class="nav-link"
              id="stats-tab"
              data-bs-toggle="tab"
              data-bs-target="#stats-tab-pane"
              type="button"
              role="tab"
              aria-controls="stats-tab-pane"
              aria-selected="false"
            >
              Stats
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
            tabindex="0"
          >
            <h1>Users</h1>
            {users.map((e) => (
              <div>
                <span
                  style={{
                    fontSize: "30px",
                    marginRight: "15px",
                    color: "white",
                  }}
                >
                  {e}
                </span>
                {/* </div> */}
              </div>
            ))}
            <h1>Blocked Users</h1>
            {blockedusers.map((e) => (
              <div>
                <span
                  style={{
                    fontSize: "30px",
                    marginRight: "15px",
                    color: "gray",
                  }}
                >
                  {e}
                </span>
                {/* </div> */}
              </div>
            ))}
          </div>
          <div
            class="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabindex="0"
          >
            {console.log(requests)}
            {requests.map((e) => (
              <div>
                {/* <div class="shadow-lg p-3 mb-5 bg-body-tertiary rounded horizontal-center" style={{width:500}}> */}
                <span
                  style={{
                    fontSize: "30px",
                    marginRight: "15px",
                    color: "white",
                  }}
                >
                  {e}
                </span>
                <button
                  type="button"
                  class="btn btn-success"
                  style={{ marginRight: "15px" }}
                  onClick={() => {
                    handleAccept(e);
                    def();
                  }}
                >
                  Accept
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => {
                    handleReject(e);
                    def();
                  }}
                >
                  Reject
                </button>
                {/* </div> */}
              </div>
            ))}
          </div>
          <div
            class="tab-pane fade"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
            tabindex="0"
          >
            {reports.length
              ? reports.map((e, i) => (
                  <div class="card" style={{ width: "40%", marginLeft: "30%" }}>
                    {/* {console.log(post.length)} */}

                    <div class="card-body">
                      <h5 class="card-title">Reported in {e.s_name}</h5>
                      <p class="card-text">Report : {e.report}</p>
                      <p class="card-text">Reported by : {e.reported_by}</p>
                      <p class="card-text">Reported on : {e.reported_on}</p>
                      <p class="card-text">Post: {e.post}</p>
                    </div>

                    <div class="card-footer" style={{ align: "right" }}>
                      <button
                        type="button"
                        class="btn btn-dark"
                        style={{ marginRight: "10px", marginBottom: "5px" }}
                        onClick={() => {
                          handleBlock(e.reported_on);
                          def();
                        }}
                        disabled={e.set_ignore}
                      >
                        Block
                        <i
                          class="fa-sharp fa-solid fa-ban"
                          style={{ color: "white" }}
                        ></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-dark"
                        style={{ marginRight: "10px", marginBottom: "5px" }}
                        onClick={() => {
                          handleIgnore(e.post_id);
                          def(e);
                        }}
                      >
                        Ignore <i class="fa-solid fa-arrow-turn-down"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-dark"
                        style={{ marginRight: "10px" }}
                        disabled={e.set_ignore}
                        onClick={() => {
                          handleDel(e.post_id);
                        }}
                      >
                        DeletePost
                        <i
                          class="fa-solid fa-trash"
                          style={{ color: "white" }}
                        ></i>
                      </button>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div
            class="tab-pane fade"
            id="stats-tab-pane"
            role="tabpanel"
            aria-labelledby="stats-tab"
            tabindex="0"
          >
            <h1>Stats</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubGreddit;
