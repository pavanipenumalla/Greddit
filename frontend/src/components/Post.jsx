import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import axios from "axios";
 
import { useNavigate } from "react-router-dom";

// import './styles.css';

function Post() {
  const name = useParams();
  const [subgreddit, setSubgreddit] = useState([]);
  const [text, setText] = useState("");
  const [post, setPost] = useState([]);
  const [cmnt, setCmnt] = useState("");
  const [cmnts, setCmnts] = useState([]);
  const [report, setReport] = useState("");
  const email = localStorage.getItem("email");
  const nav = useNavigate();

  function handlePost(event) {
    // event.preventDefault();
    const newPost = {
      text: text,
      posted_by: email,
      s_name: name.id,
    };
    axios
      .post("/api/addpost", newPost)
      .then((res) => {
        // console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/num", { name: name.id, len: post.length + 1 })
      .then((res) => {
        // console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleupvote(i) {
    axios
      .post("/api/upvote", { email: email, id: post[i]._id })
      .then((res) => {
        // console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        alert("already liked");
        console.log(err);
      });
  }

  function handlesave(i) {
    axios
      .post("/api/save", { email: email, id: post[i]._id })
      .then((res) => {
        // console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        alert("already saved");
        console.log(err);
      });
  }

  function handleReport(i) {
    if (!(post[i].posted_by === email)) {
      const rep = {
        s_name: name.id,
        post_id: post[i]._id,
        report: report,
        reported_on: post[i].posted_by,
        reported_by: email,
        post: post[i].text,
      };

      axios
        .post("/api/savereport", rep)
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Cannot report your own post");
    }
  }

  function handledownvote(i) {
    axios
      .post("/api/downvote2", {
        email: email,
        id: post[i]._id,
      })
      .then((res) => {
        // console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        alert("already disliked");
        console.log(err);
      });
  }

  function def(e) {
    e.preventDefault();
  }

  function handleCmnt(id) {
    var comment1 = cmnt;
    var comment2;
    for (let i = 0; i < subgreddit.keywords.length; i++) {
      comment2 = comment1.replace(
        new RegExp(subgreddit.keywords[i], "gi"),
        "*".repeat(subgreddit.keywords[i].length)
      );
      comment1 = comment2;
      setCmnt(comment2);
    }
    axios
      .post("/api/addcmnt", { id: id, cmnt: comment2 })
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFollow(data) {
    if (!(data === email)) {
      axios
        .post("/api/follow1", { email: email, data: data })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          alert("Already Following");
          console.log(err);
        });

      axios
        .post("/api/follow2", { email: email, data: data })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Cannot follow Yourself");
    }
  }

  function getcmnts(id) {
    axios
      .post("/api/getcmnts", { id: id })
      .then((res) => {
        setCmnts(res.data.comments);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "false") {
      nav("/");
    }
    axios
      .post("/api/getsg", { name: name.id })
      .then((res) => {
        setSubgreddit(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("/api/getpost", { name: name.id, email: email })
      .then((res) => {
        setPost(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <img
        src="https://play-lh.googleusercontent.com/nlptFyxNsb8J0g8ZLux6016kunduV4jCxIrOJ7EEy-IobSN1RCDXAJ6DTGP81z7rr5Zq"
        width="25%"
        border-radius="50%"
        float="left"
        align="left"
      />
      {/* subgreddit */}
      <div style={{ width: "40%", marginLeft: "30%" }}>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{subgreddit.name}</h5>
            <h3 class="card-text">{subgreddit.desc}</h3>
            <h3 class="card-text">No of Posts : {subgreddit.No_of_posts}</h3>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-dark btn-lg"
        style={{ position: "absolute", marginLeft: "20%" }}
        data-bs-toggle="modal"
        data-bs-target="#postbutton"
      >
        <h4>Add Post</h4>
      </button>
      <br />
      <br />
      <br />
      <h1 style={{ color: "white" }} className="horizontal-center">
        Posts
      </h1>
      {post.length
        ? post.map((e, i) => (
            <div class="card" style={{ width: "40%", marginLeft: "30%" }}>
              {/* {console.log(post.length)} */}

              <div class="card-body">
                <h5 class="card-title">{e.text}</h5>
                <p class="card-text">posted_by : {e.posted_by}</p>
                {/* Accordion */}
                <div
                  class="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div class="accordion-item">
                    <h2
                      class="accordion-header"
                      id={"flush-headingOne" + e._id}
                    >
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#flush-collapseOne" + e._id}
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                        onClick={() => {
                          getcmnts(e._id);
                          def();
                        }}
                      >
                        Comments <i class="fa-solid fa-comments"></i>
                      </button>
                    </h2>
                    <div
                      id={"flush-collapseOne" + e._id}
                      class="accordion-collapse collapse"
                      aria-labelledby={"flush-headingOne" + e._id}
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        {/* {console.log(cmnts)} */}

                        <div>
                          <ul class="list-group list-group-flush">
                            {cmnts
                              ? cmnts.map((ev, ind) => (
                                  <li class="list-group-item">{ev}</li>
                                ))
                              : null}
                          </ul>
                        </div>
                        <form
                          className="login"
                          onSubmit={() => {
                            handleCmnt(e._id);
                            def();
                          }}
                        >
                          <div className="form-floating">
                            <input
                              className="form-control"
                              name="name"
                              onChange={(e) => setCmnt(e.target.value)}
                              type="text"
                              placeholder="Add Comment Here"
                              autoComplete="off"
                              value={cmnt}
                            />
                            <label for="floatingInput">Add Comment Here</label>
                            <button
                              type="submit"
                              className="btn btn-outline-dark home-btn"
                              disabled={!(cmnt != "")}
                            >
                              Add
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-footer" style={{ align: "right" }}>
                <i
                  class="fa-regular fa-thumbs-up"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    handleupvote(i);
                    def();
                  }}
                ></i>{" "}
                <span style={{ fontSize: "25px", marginRight: "10px" }}>
                  : {!e.upvotes.length ? 0 : e.upvotes.length}
                </span>
                <i
                  class="fa-regular fa-thumbs-down"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    handledownvote(i);
                    def();
                  }}
                ></i>{" "}
                <span style={{ fontSize: "25px", marginRight: "10px" }}>
                  : {!e.downvotes.length ? 0 : e.downvotes.length}
                </span>
                <i
                  class="fa-regular fa-bookmark"
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    handlesave(i);
                    def();
                  }}
                ></i>
                <i
                  type="button"
                  class="fa-regular fa-flag"
                  style={{ marginRight: "10px" }}
                  data-bs-toggle="modal"
                  data-bs-target={"#reportbutton" + i}
                ></i>
                {/* Report Dialog */}
                <div
                  class="modal fade modal-sm"
                  id={"reportbutton" + i}
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                          Report
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <form
                          onSubmit={() => {
                            handleReport(i);
                            def();
                          }}
                        >
                          <div className="form-floating">
                            <textarea
                              className="form-control"
                              name="name"
                              placeholder="Text"
                              onChange={(e) => setReport(e.target.value)}
                              autoComplete="off"
                              value={report}
                            />
                            <label for="floatingInput">Text</label>
                            <br />
                            <button
                              type="submit"
                              className="btn btn-outline-dark home-btn button-center"
                              disabled={!(report != "")}
                            >
                              Submit
                            </button>
                          </div>
                        </form>
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
                <i
                  onClick={() => {
                    handleFollow(e.posted_by);
                    def();
                  }}
                  class="fa-solid fa-user-plus"
                ></i>
                <br />
              </div>
            </div>
          ))
        : null}

      {/* post modal */}
      <div
        class="modal fade"
        id="postbutton"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Post
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    name="name"
                    placeholder="Text"
                    onChange={(e) => setText(e.target.value)}
                    autoComplete="off"
                    value={text}
                  />
                  <label for="floatingInput">Text</label>
                  <br />
                  <button
                    type="submit"
                    className="btn btn-outline-dark home-btn button-center"
                    onClick={handlePost}
                    disabled={!(text != "")}
                  >
                    Submit
                  </button>
                </div>
              </form>
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

export default Post;
