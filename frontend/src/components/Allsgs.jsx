import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
 

function AllSubGreddits() {
  const [email, setEmail] = React.useState("");
  const [sgs, setSgs] = React.useState([]);

  const [search, setSearch] = React.useState("");
  const [array, setArray] = React.useState([]);
  const [arr1, setarr1] = React.useState([]);
  const [arr2, setarr2] = React.useState([]);
  const [arr3, setarr3] = React.useState([]);
  const [render1, setrender1] = React.useState(true);
  const [render2, setrender2] = React.useState(false);

  const mail = localStorage.getItem("email");
  const [gg, setGg] = React.useState(false);
  const nav = useNavigate();

  function handleJoin(m, n) {
    // e.preventDefault();
    // alert("requested")
    console.log("join");
    const mail = localStorage.getItem("email");
    // setEmail(m);

    axios
      .post("/api/joinreq", {
        reqemail: mail,
        name: n,
        email: m,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("Could not join");
        
      });
  }
  function def(e) {
    e.preventDefault();
  }

  function handleOpen(name) {
    let path = "/allsubgreddits/" + name;
    console.log(path);
    nav(path);
  }

  function handleLeave(name) {
    axios
      .post("/api/leave", { email: mail, name: name })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAscending(e) {
    e.preventDefault();
    sgs.sort((a, b) => a.name.localeCompare(b.name));
    setSgs(sgs);
    setrender1(false);
    setrender2(true);
    setarr1(sgs);
    setArray([]);
    setarr2([]);
    setarr3([]);
  }

  function handleDescending(e) {
    e.preventDefault();
    sgs.sort((a, b) => b.name.localeCompare(a.name));
    setSgs(sgs);
    setrender1(false);
    setrender2(true);
    setArray(sgs);
    setarr1([]);
    setarr2([]);
    setarr3([]);
  }

  function handleUsers(e) {
    e.preventDefault();
    sgs.sort((a, b) => b.users.length - a.users.length);
    setSgs(sgs);
    setrender1(false);
    setrender2(true);
    setarr2(sgs);
    setarr1([]);
    setArray([]);
    setarr3([]);
  }

  function creationTime(e) {
    e.preventDefault();
    sgs.sort(
      (a, b) =>
        new Date(b.creationtime).getTime() - new Date(a.creationtime).getTime()
    );
    setSgs(sgs);
    setrender1(false);
    setrender2(true);
    setarr3(sgs);
    setarr2([]);
    setarr1([]);
    setArray([]);
  }

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      nav("/");
    }
    axios
      .post("/api/allsgs")
      .then((res) => {
        setSgs(res.data);

        // setSgs(array)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {render1 && (
        <div>
          <Navbar />
          <div>
            <form
              class="d-flex horizontal-center"
              role="search"
              style={{ width: "50%" }}
            >
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>

          <div class="horizontal-center">
            <button
              type="button"
              class="btn btn-light"
              style={{
                width: "250px",
                marginBottom: "20px",
                marginRight: "10px",
              }}
              onClick={handleAscending}
            >
              Sort By Name Ascending
            </button>
            <button
              type="button"
              class="btn btn-light"
              style={{ width: "250px", marginBottom: "20px" }}
              onClick={handleDescending}
            >
              Sort By Name Descending
            </button>
            <br />
            <button
              type="button"
              class="btn btn-light"
              style={{
                width: "250px",
                marginBottom: "20px",
                marginRight: "10px",
              }}
              onClick={handleUsers}
            >
              Sort By Followers
            </button>
            <button
              type="button"
              class="btn btn-light"
              style={{ width: "250px", marginBottom: "20px" }}
              onClick={creationTime}
            >
              Sort By Creation Time
            </button>
          </div>

          {/* SubGreddit */}

          {/* To show the persons subgreddits first */}
          {console.log(sgs)}
          <div className="horizontal-center">
            {sgs
              ? sgs.map((e, i) => {
                  if (
                    !search ||
                    e.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return (
                      <div>
                        {e.email === mail && (
                          <div style={{ marginTop: "10px" }}>
                            <div class="card sgscard">
                              <div
                                class="card-header"
                                style={{ fontSize: "30px", fontWeight: "bold" }}
                              >
                                {e.name}
                              </div>
                              <div class="card-body">
                                <h3 class="card-text">{e.desc}</h3>
                                <h3 class="card-text">
                                  No of Posts : {e.No_of_posts}
                                </h3>
                                <h4>{e.keywords.toString()}</h4>
                                <div>
                                  {e.users.includes(mail) && (
                                    <div>
                                      <button
                                        className="btn btn-dark dbtn"
                                        onClick={() => {
                                          handleOpen(e.name);
                                          def();
                                        }}
                                      >
                                        Open
                                      </button>
                                      <button
                                        className="btn btn-dark"
                                        disabled={e.email === mail}
                                        onClick={() => {
                                          handleLeave(e.name);
                                          def();
                                        }}
                                      >
                                        Leave
                                      </button>
                                    </div>
                                  )}
                                  {!e.users.includes(mail) && (
                                      <div>
                                        <button
                                          className="btn btn-dark"
                                          onClick={() => {
                                            handleJoin(e.email, e.name);
                                            def();
                                          }}
                                        >
                                          Join
                                        </button>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                })
              : null}
          </div>

          {/* To show the joined subgreddits */}
          <div className="horizontal-center">
            {sgs
              ? sgs.map((e, i) => {
                  if (
                    !search ||
                    e.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return (
                      <div>
                        {!(e.email === mail) && e.users.includes(mail) && (
                          <div style={{ marginTop: "10px" }}>
                            <div class="card sgscard">
                              <div
                                class="card-header"
                                style={{ fontSize: "30px", fontWeight: "bold" }}
                              >
                                {e.name}
                              </div>
                              <div class="card-body">
                                <h3 class="card-text">{e.desc}</h3>
                                <h3 class="card-text">
                                  No of Posts : {e.No_of_posts}
                                </h3>
                                <h4>{e.keywords.toString()}</h4>
                                <div>
                                  {e.users.includes(mail) && (
                                    <div>
                                      <button
                                        className="btn btn-dark dbtn"
                                        onClick={() => {
                                          handleOpen(e.name);
                                          def();
                                        }}
                                      >
                                        Open
                                      </button>
                                      <button
                                        className="btn btn-dark"
                                        disabled={e.email === mail}
                                        onClick={() => {
                                          handleLeave(e.name);
                                          def();
                                        }}
                                      >
                                        Leave
                                      </button>
                                    </div>
                                  )}
                                  {!e.users.includes(mail) &&
                                      (
                                      <div>
                                        <button
                                          className="btn btn-dark"
                                          onClick={() => {
                                            handleJoin(e.email, e.name);
                                            def();
                                          }}
                                        >
                                          Join
                                        </button>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                })
              : null}
          </div>

          {/* To show the other subgreddits */}
          <div className="horizontal-center">
            {sgs
              ? sgs.map((e, i) => {
                  if (
                    !search ||
                    e.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return (
                      <div>
                        {!(e.email === mail) && !e.users.includes(mail) && (
                          <div style={{ marginTop: "10px" }}>
                            <div class="card sgscard">
                              <div
                                class="card-header"
                                style={{ fontSize: "30px", fontWeight: "bold" }}
                              >
                                {e.name}
                              </div>
                              <div class="card-body">
                                <h3 class="card-text">{e.desc}</h3>
                                <h3 class="card-text">
                                  No of Posts : {e.No_of_posts}
                                </h3>
                                <h4>{e.keywords.toString()}</h4>
                                <div>
                                  {e.users.includes(mail) && (
                                    <div>
                                      <button
                                        className="btn btn-dark dbtn"
                                        onClick={() => {
                                          handleOpen(e.name);
                                          def();
                                        }}
                                      >
                                        Open
                                      </button>
                                      <button
                                        className="btn btn-dark"
                                        disabled={e.email === mail}
                                        onClick={() => {
                                          handleLeave(e.name);
                                          def();
                                        }}
                                      >
                                        Leave
                                      </button>
                                    </div>
                                  )}
                                  {!e.users.includes(mail) &&
                                      (
                                      <div>
                                        <button
                                          className="btn btn-dark"
                                          onClick={() => {
                                            handleJoin(e.email, e.name);
                                            def();
                                          }}
                                        >
                                          Join
                                        </button>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                })
              : null}
          </div>
        </div>
      )}
      {render2 && (
        <div>
          <Navbar />
          <div>
            <form
              class="d-flex horizontal-center"
              role="search"
              style={{ width: "50%" }}
            >
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>

          <div class="horizontal-center">
            <button
              type="button"
              class="btn btn-light"
              style={{
                width: "250px",
                marginBottom: "20px",
                marginRight: "10px",
              }}
              onClick={handleAscending}
            >
              Sort By Name Ascending
            </button>
            <button
              type="button"
              class="btn btn-light"
              style={{ width: "250px", marginBottom: "20px" }}
              onClick={handleDescending}
            >
              Sort By Name Descending
            </button>
            <br />
            <button
              type="button"
              class="btn btn-light"
              style={{
                width: "250px",
                marginBottom: "20px",
                marginRight: "10px",
              }}
              onClick={handleUsers}
            >
              Sort By Followers
            </button>
            <button
              type="button"
              class="btn btn-light"
              style={{ width: "250px", marginBottom: "20px" }}
              onClick={creationTime}
            >
              Sort By Creation Time
            </button>
          </div>

          {/* SubGreddit */}

          {/* To show the persons subgreddits first */}
          {console.log(sgs)}
          <div className="horizontal-center">
            {sgs
              ? sgs.map((e, i) => {
                  if (
                    !search ||
                    e.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return (
                      <div>
                        <div style={{ marginTop: "10px" }}>
                          <div class="card sgscard">
                            <div
                              class="card-header"
                              style={{ fontSize: "30px", fontWeight: "bold" }}
                            >
                              {e.name}
                            </div>
                            <div class="card-body">
                              <h3 class="card-text">{e.desc}</h3>
                              <h3 class="card-text">
                                No of Posts : {e.No_of_posts}
                              </h3>
                              <h4>{e.keywords.toString()}</h4>
                              <div>
                                {e.users.includes(mail) && (
                                  <div>
                                    <button
                                      className="btn btn-dark dbtn"
                                      onClick={() => {
                                        handleOpen(e.name);
                                        def();
                                      }}
                                    >
                                      Open
                                    </button>
                                    <button
                                      className="btn btn-dark"
                                      disabled={e.email === mail}
                                      onClick={() => {
                                        handleLeave(e.name);
                                        def();
                                      }}
                                    >
                                      Leave
                                    </button>
                                  </div>
                                )}
                                {!e.users.includes(mail) &&
                                    (
                                    <div>
                                      <button
                                        className="btn btn-dark"
                                        onClick={() => {
                                          handleJoin(e.email, e.name);
                                          def();
                                        }}
                                      >
                                        Join
                                      </button>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })
              : null}
          </div>
        </div>
      )}
    </>
  );
}

export default AllSubGreddits;
