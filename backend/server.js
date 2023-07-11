const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/usermodel.js");
const Subgreddit = require("./models/sgsmodel.js");
const Post = require("./models/postmodel.js");
const Report = require("./models/reportmodel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const cors = require("cors");
const saltrounds = 10;

app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://pavanipenumalla:pavani123@cluster0.fyhaz0r.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("connected"));

app.post("/api/register", async function (req, res) {
  console.log(req.body);
  try {
    bcrypt.hash(req.body.password, saltrounds, function (err, hash) {
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        age: req.body.age,
        number: req.body.number,
        email: req.body.email,
        password: hash,
      });
    });

    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate Email" });
  }
});

app.post("/api/login", async function (req, res) {
  const user = await User.findOne({
    email: req.body.email,
    // password: req.body.password,
  });
  if (user) {
    bcrypt.compare(req.body.password, user.password).then((match) => {
      if (match) {
        const token = jwt.sign(
          {
            email: user.email,
            password: user.password,
          },
          "secret123"
        );
        return res.json({ status: "ok", user: token });
      }
    });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/mysgs", (req, res) => {
  const email = req.body.email;
  Subgreddit.find({ email: email }).then((users) => {
    if (!users) {
      res.status(400).send("Email not found");
    } else {
      res.status(200).json(users);
    }
  });
});

app.post("/api/allsgs", (req, res) => {
  Subgreddit.find().then((users) => {
    if (!users) {
      res.status(400).send("Email not found");
    } else {
      res.status(200).json(users);
    }
  });
});

app.post("/api/mysgs/add", (req, res) => {
  const newSg = new Subgreddit({
    email: req.body.email,
    name: req.body.name,
    desc: req.body.desc,
    tags: req.body.tags,
    keywords: req.body.keywords,
    users: req.body.email,
  });

  newSg
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/api/savereport", (req, res) => {
  const rep = new Report({
    s_name: req.body.s_name,
    post_id: req.body.post_id,
    report: req.body.report,
    reported_on: req.body.reported_on,
    reported_by: req.body.reported_by,
    post: req.body.post,
  });

  rep
    .save()
    .then((report) => {
      res.status(200).json(report);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/api/getreports", (req, res) => {
  const s_name = req.body.name;
  Report.find({ s_name: s_name }).then((reports) => {
    if (!reports) {
      res.status(400).send("Email not found");
    } else {
      res.status(200).json(reports);
    }
  });
});

app.post("/api/getUsers", (req, res) => {
  Subgreddit.findOne({ email: req.body.email, name: req.body.name }).then(
    (user) => {
      let u = user;
      if (!u) {
        return res.status(401).json({
          error: "User not found",
        });
      } else {
        res.status(200).json(u);
      }
    }
  );
});

app.post("/api/addpost", (req, res) => {
  const newPost = new Post({
    posted_by: req.body.posted_by,
    s_name: req.body.s_name,
    text: req.body.text,
  });

  newPost
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.post("/api/getpost", async (req, res) => {
  Post.find({ s_name: req.body.name }).then((post) => {
    if (!post) {
      return res.status(401).json({
        error: "User not found",
      });
    } else {
      Subgreddit.findOne({ name: req.body.name }).then((subg) => {
        if (req.body.email === subg.email) {
          res.status(200).json(post);
        } else {
          const array = post;
          for (let i = 0; i < array.length; i++) {
            if (subg.blocked_users.includes(array[i].posted_by)) {
              array[i].posted_by = "Blocked User";
            }
          }
          res.status(200).json(array);
        }
      });
    }
  });
});

app.post("/api/getsavedpost1", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    let u = user;
    if (!u) {
      return res.status(401).json({
        error: "User not found",
      });
    } else {
      res.status(200).json(u);
    }
  });
});

app.post("/api/deletepost", (req, res) => {
  Post.deleteMany({ s_name: req.body.name }).then((user) => {
    let u = user;
    if (!u) {
      return res.status(401).json({
        error: "User not found",
      });
    } else {
      res.status(200).json(u);
    }
  });
});

app.post("/api/del2", (req, res) => {
  Report.deleteMany({ post_id: req.body.post_id }).then((user) => {
    let u = user;
    if (!u) {
      return res.status(401).json({
        error: "User not found",
      });
    } else {
      res.status(200).json(u);
    }
  });
});

app.post("/api/deleterep", (req, res) => {
  Report.deleteMany({ s_name: req.body.name }).then((user) => {
    let u = user;
    if (!u) {
      return res.status(401).json({
        error: "User not found",
      });
    } else {
      res.status(200).json(u);
    }
  });
});

app.post("/api/getsavedpost2", (req, res) => {
  console.log(req.body.postId);
  Post.find({ _id: { $in: req.body.postId } }).then((user) => {
    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    } else {
      res.status(200).json(user);
    }
  });
});

app.post("/api/leave", (req, res) => {
  Subgreddit.findOneAndUpdate(
    { name: req.body.name },
    {
      $pull: { users: req.body.email },
      $push: { left_users: req.body.email },
    },
    { new: true, useFindAndModify: false },
    function (err, val) {
      if (err) {
        return res.status(404).json({
          err: "Not found",
        });
      } else {
        return res.status(200).json(val);
      }
    }
  );
});

app.post("/api/block1", (req, res) => {
  Subgreddit.findOne({
    name: req.body.name,
    blocked_users: req.body.email,
  }).then((p) => {
    if (!p) {
      Subgreddit.findOneAndUpdate(
        { name: req.body.name },
        {
          $pull: { users: req.body.email },
          $push: { blocked_users: req.body.email },
        },
        { new: true, useFindAndModify: false },
        function (err, val) {
          if (err) {
            return res.status(404).json({
              err: "Not found",
            });
          } else {
            return res.status(200).json(val);
          }
        }
      );
    } else {
      return res.status(404).json({
        err: "User Already Blocked",
      });
    }
  });
});

app.post("/api/upvote", (req, res) => {
  Post.findOne({ _id: req.body.id, upvotes: req.body.email }).then((p) => {
    if (!p) {
      Post.findOneAndUpdate(
        { _id: req.body.id },
        {
          $push: { upvotes: req.body.email },
        },
        { new: true, useFindAndModify: false },
        function (err, val) {
          if (err) {
            return res.status(404).json({
              err: "Not found",
            });
          } else {
            return res.status(200).json(val);
          }
        }
      );
    } else {
      return res.status(404).json({
        err: "User Already Liked",
      });
    }
  });
});

app.post("/api/save", (req, res) => {
  User.findOne({ email: req.body.email, saved_posts: req.body.id }).then(
    (p) => {
      if (!p) {
        User.findOneAndUpdate(
          { email: req.body.email },
          {
            $push: { saved_posts: req.body.id },
          },
          { new: true, useFindAndModify: false },
          function (err, val) {
            if (err) {
              return res.status(404).json({
                err: "Not found",
              });
            } else {
              return res.status(200).json(val);
            }
          }
        );
      } else {
        return res.status(404).json({
          err: "Post already saved",
        });
      }
    }
  );
});

app.post("/api/downvote2", (req, res) => {
  Post.findOne({ _id: req.body.id, downvotes: req.body.email }).then((p) => {
    if (!p) {
      Post.findOneAndUpdate(
        { _id: req.body.id },
        {
          $push: { downvotes: req.body.email },
        },
        { new: true, useFindAndModify: false },
        function (err, val) {
          if (err) {
            return res.status(404).json({
              err: "Not found",
            });
          } else {
            return res.status(200).json(val);
          }
        }
      );
    } else {
      return res.status(404).json({
        err: "User Already disiked",
      });
    }
  });
});

app.post("/api/mysgs/delete", (req, res) => {
  Subgreddit.deleteOne(
    { email: req.body.email, name: req.body.name },
    function (err, sg) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(sg);
      }
    }
  );
});

app.post("/del1", (req, res) => {
  Post.deleteOne({ _id: req.body.post_id }, function (err, sg) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(sg);
    }
  });
});

app.get("/api/getprofile", (req, res) => {
  User.findOne({ email: req.query.email }).then((user) => {
    let u = user;
    if (!u) {
      return res.status(401).json({
        error: "User not found",
      });
    } else {
      res.json(u);
    }
  });
});

app.post("/api/joinreq", (req, res) => {
  Subgreddit.findOne({
    email: req.body.email,
    name: req.body.name,
    left_users: req.body.reqemail,
  }).then((q) => {
    if (!q) {
      Subgreddit.findOne({
        email: req.body.email,
        name: req.body.name,
        requests: req.body.reqemail,
      }).then((p) => {
        if (!p) {
          Subgreddit.findOneAndUpdate(
            { email: req.body.email, name: req.body.name },
            {
              $push: { requests: req.body.reqemail },
            },
            { new: true, useFindAndModify: false },
            function (err, val) {
              if (err) {
                return res.status(404).json({
                  err: "Not found",
                });
              } else {
                return res.status(200).json(val);
              }
            }
          );
        } else {
          return res.status(404).json({
            err: "Could not join",
          });
        }
      });
    } else {
      return res.status(404).json({
        err: "Could not join",
      });
    }
  });

  // console.log(req.body.reqemail)
});

app.post("/api/follow1", (req, res) => {
  User.findOne({ email: req.body.data, followers: req.body.email }).then(
    (p) => {
      if (!p) {
        User.findOneAndUpdate(
          { email: req.body.data },
          {
            $push: { followers: req.body.email },
          },
          { new: true, useFindAndModify: false },
          function (err, val) {
            if (err) {
              return res.status(404).json({
                err: "Not found",
              });
            } else {
              return res.status(200).json(val);
            }
          }
        );
      } else {
        return res.status(404).json({
          err: "User Already disiked",
        });
      }
    }
  );
  // console.log(req.body.reqemail)
});

app.post("/api/follow2", (req, res) => {
  User.findOne({ email: req.body.email, following: req.body.data }).then(
    (p) => {
      if (!p) {
        User.findOneAndUpdate(
          { email: req.body.email },
          {
            $push: { following: req.body.data },
          },
          { new: true, useFindAndModify: false },
          function (err, val) {
            if (err) {
              return res.status(404).json({
                err: "Not found",
              });
            } else {
              return res.status(200).json(val);
            }
          }
        );
      } else {
        return res.status(404).json({
          err: "User Already disiked",
        });
      }
    }
  );
  // console.log(req.body.reqemail)
});

app.post("/api/handleaccept", (req, res) => {
  console.log(req.body);
  Subgreddit.findOneAndUpdate(
    { email: req.body.email, name: req.body.name },
    {
      $push: { users: req.body.reqemail },
      $pull: { requests: req.body.reqemail },
    },
    { new: true, useFindAndModify: false },
    function (err, val) {
      if (err) {
        return res.status(404).json({
          err: "Not found",
        });
      } else {
        return res.status(200).json(val);
      }
    }
  );
});

app.post("/api/unsave", (req, res) => {
  console.log(req.body);
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      $pull: { saved_posts: req.body.postid },
    },
    { new: true, useFindAndModify: false },
    function (err, val) {
      if (err) {
        return res.status(404).json({
          err: "Not found",
        });
      } else {
        return res.status(200).json(val);
      }
    }
  );
});

app.post("/api/num", (req, res) => {
  // console.log(req.body);
  Subgreddit.findOneAndUpdate(
    { name: req.body.name },
    { No_of_posts: req.body.len },
    { new: true, useFindAndModify: false },
    function (err, val) {
      if (err) {
        return res.status(404).json({
          err: "Not found",
        });
      } else {
        return res.status(200).json(val);
      }
    }
  );
});

app.post("/api/handlereject", (req, res) => {
  console.log(req.body);
  Subgreddit.findOneAndUpdate(
    { email: req.body.email, name: req.body.name },
    {
      $pull: { requests: req.body.reqemail },
    },
    { new: true, useFindAndModify: false },
    function (err, val) {
      if (err) {
        return res.status(404).json({
          err: "Not found",
        });
      } else {
        return res.status(200).json(val);
      }
    }
  );
});

app.put("/api/handleremove1", (req, res) => {
  console.log(req.body);
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      $pull: { followers: req.body.rememail },
    },
    { new: true, useFindAndModify: false },
    function (err, val) {
      if (err) {
        return res.status(404).json({
          err: "Not found",
        });
      } else {
        return res.status(200).json(val);
      }
    }
  );
});

app.post("/api/ignore", (req, res) => {
  console.log(req.body);
  Report.findOneAndUpdate(
    { post_id: req.body.post_id },
    { set_ignore: true },
    { new: true, useFindAndModify: false },
    function (err, val) {
      if (err) {
        return res.status(404).json({
          err: "Not found",
        });
      } else {
        return res.status(200).json(val);
      }
    }
  );
});

app.put("/api/handleremove2", (req, res) => {
  console.log(req.body);
  User.findOneAndUpdate(
    { email: req.body.rememail },
    {
      $pull: { following: req.body.email },
    },
    { new: true, useFindAndModify: false },
    function (err, val) {
      if (err) {
        return res.status(404).json({
          err: "Not found",
        });
      } else {
        return res.status(200).json(val);
      }
    }
  );
});

app.put("/api/handleunfollow1", (req, res) => {
  console.log(req.body);
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      $pull: { following: req.body.rememail },
    },
    { new: true, useFindAndModify: false },
    function (err, val) {
      if (err) {
        return res.status(404).json({
          err: "Not found",
        });
      } else {
        return res.status(200).json(val);
      }
    }
  );
});

app.put("/api/handleunfollow2", (req, res) => {
  console.log(req.body);
  User.findOneAndUpdate(
    { email: req.body.rememail },
    {
      $pull: { followers: req.body.email },
    },
    { new: true, useFindAndModify: false },
    function (err, val) {
      if (err) {
        return res.status(404).json({
          err: "Not found",
        });
      } else {
        return res.status(200).json(val);
      }
    }
  );
});

app.post("/api/addcmnt", (req, res) => {
  // console.log(req.body)
  Post.findOneAndUpdate(
    { _id: req.body.id },
    {
      $push: { comments: req.body.cmnt },
    },
    { new: true, useFindAndModify: false },
    function (err, val) {
      if (err) {
        return res.status(404).json({
          err: "Not found",
        });
      } else {
        return res.status(200).json(val);
      }
    }
  );
});

app.post("/api/getcmnts", (req, res) => {
  Post.findOne({ _id: req.body.id }).then((user) => {
    let u = user;
    if (!u) {
      return res.status(401).json({
        error: "User not found",
      });
    } else {
      res.json(u);
    }
  });
});

app.post("/api/getsg", (req, res) => {
  const name = req.body.name;
  Subgreddit.findOne({ name: name }).then((users) => {
    if (!users) {
      res.status(400).send("Email not found");
    } else {
      res.status(200).json(users);
    }
  });
});

app.put("/api/editprofile", (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      age: req.body.age,
      number: req.body.number,
    },
    { new: true, useFindAndModify: false },
    function (err, val) {
      if (err) {
        return res.status(404).json({
          err: "Not found",
        });
      } else {
        return res.status(200).json(val);
      }
    }
  );
});

app.listen("5000", function () {
  console.log("server Started");
});
