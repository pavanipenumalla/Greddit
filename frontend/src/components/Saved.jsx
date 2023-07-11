import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SavedPosts() {
  const [postId, setPostId] = useState([]);
  const [post, setPost] = useState([]);
  const [cmnts, setCmnts] = useState([]);
  const email = localStorage.getItem("email");
  const nav = useNavigate();

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

  function def(e) {
    e.preventDefault();
  }

  function handleUnsave(postid) {
    axios
      .post("/api/unsave", { postid: postid, email: email })
      .then((res) => {
        window.location.reload();
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
      .post("/api/getsavedpost1", { email: email })
      .then((res) => {
        setPostId(res.data.saved_posts);
        console.log(res.data.firstname);
        axios
          .post("/api/getsavedpost2", {
            postId: res.data.saved_posts,
          })
          .then((response) => {
            setPost(response.data);
            // console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Navbar />
      {post
        ? post.map((e, i) => (
            <div class="card" style={{ width: "40%", marginLeft: "30%" }}>
              {console.log(post.length)}
              <div class="card-body">
                <h5 class="card-title">{e.text}</h5>
                <p class="card-text">posted_by : {e.posted_by}</p>
                <p class="card-text">posted_in : {e.s_name}</p>
                <button
                  type="button"
                  class="btn btn-outline-dark"
                  onClick={() => {
                    handleUnsave(e._id);
                    def();
                  }}
                >
                  Unsave
                </button>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

export default SavedPosts;
