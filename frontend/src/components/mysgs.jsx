import React, { useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useState } from "react";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

function MySubgreddits() {
  const [email, setEmail] = useState("");
  const [sgs, setSgs] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);
  const [keywords, setKeywords] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const nav = useNavigate();

  function handleSubgreddit(event) {
    // event.preventDefault();
    const newSg = {
      email: email,
      name: name,
      desc: desc,
      tags: tags,
      keywords: keywords,
      users: users,
    };
    axios
      .post("/api/mysgs/add", newSg)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDelete(i) {
    axios
      .post("/api/mysgs/delete", {
        name: sgs[i].name,
        email: sgs[i].email,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/deletepost", {
        name: sgs[i].name,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/deleterep", {
        name: sgs[i].name,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function def(e) {
    e.preventDefault();
  }

  function handleOpen(name) {
    let path = "/mysubgreddits/" + name;
    console.log(path);
    nav(path);
  }

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      nav("/");
    }
    const emaili = localStorage.getItem("email");
    setEmail(emaili);
    axios
      .post("/api/mysgs", { email: emaili })
      .then((res) => {
        setSgs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <button
          type="button"
          className="btn btn-dark btn-lg"
          style={{ margin: "10px" }}
          data-bs-toggle="modal"
          data-bs-target="#mysgsbutton"
        >
          <h1>+</h1>
        </button>
      </div>
      {/* SubGreddit */}
      <div className="row">
        {sgs
          ? sgs.map((e, i) => (
              <div
                className="col-md-4 col-lg-3 col-sm-6"
                style={{ marginTop: "10px" }}
              >
                <div class="card sgscard">
                  <div
                    class="card-header"
                    style={{ fontSize: "30px", fontWeight: "bold" }}
                  >
                    {e.name}
                  </div>
                  <div class="card-body">
                    <h3 class="card-text">{e.desc}</h3>
                    <h4>{e.keywords.toString()}</h4>
                    <h4>No of Users:{e.users.length} </h4>
                    <h4>No of Posts:{e.No_of_posts} </h4>
                    <div>
                      <button
                        className="btn btn-dark dbtn"
                        onClick={() => {
                          handleDelete(i);
                        }}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-dark"
                        onClick={() => {
                          handleOpen(e.name);
                          def();
                        }}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>

      {/* Edit/Add SubGreddit */}
      <div
        class="modal fade modal-dialog-scrollable"
        id="mysgsbutton"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                SubGreddit
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
                      name="name"
                      type="text"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="off"
                      value={name}
                    />
                    <label for="floatingInput">Name</label>
                  </div>
                  <br />
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      name="desc"
                      placeholder="Description"
                      onChange={(e) => setDesc(e.target.value)}
                      autoComplete="off"
                      value={desc}
                    />
                    <label for="floatingInput">Description</label>
                  </div>
                  <br />
                  <div className="form-floating">
                    <input
                      className="form-control"
                      name="tags"
                      type="text"
                      placeholder="Tags"
                      onChange={(e) => setTags(e.target.value.split(","))}
                      autoComplete="off"
                      value={tags}
                    />
                    <label for="floatingInput">Tags</label>
                  </div>
                  <br />
                  <div className="form-floating">
                    <input
                      className="form-control"
                      name="keywords"
                      type="text"
                      placeholder="Keywords"
                      onChange={(e) => setKeywords(e.target.value.split(","))}
                      autoComplete="off"
                      value={keywords}
                    />
                    <label for="floatingInput">Keywords</label>
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-outline-dark home-btn button-center"
                    onClick={handleSubgreddit}
                    disabled={
                      !(
                        name != "" &&
                        desc != "" &&
                        tags != "" &&
                        keywords != ""
                      )
                    }
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
    </div>
  );
}

export default MySubgreddits;
