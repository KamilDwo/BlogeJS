const conf = "mongodb://blogejs:blogejs123@ds251332.mlab.com:51332/blogejs";
const express = require("express");
const app = express();
const port = 3002;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

//const Blog = require("./models/Blog");
//const User = require("./models/Password");
const blogRoutes = require("./routes/blog");
//const userRoutes = require("./routes/user");

mongoose.Promise = global.Promise;
mongoose
  .connect(conf)
  .then(() => console.log("Connection succesful"))
  .catch(err => console.error(err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:" + port);
  res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

let users = [
  {
    id: 1,
    username: "test",
    password: "asdf123"
  },
  {
    id: 2,
    username: "test2",
    password: "asdf12345"
  }
];
const salt = "bL0g3";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  for (let user of users) {
    if (username === user.username && password === user.password) {
      let token = jwt.sign({ id: user.id, username: user.username }, salt, {
        expiresIn: 129600
      });
      res.json({
        success: true,
        err: null,
        token
      });
      break;
    } else {
      res.status(401).json({
        success: false,
        token: null,
        err: "Username or password is incorrect"
      });
    }
  }
});

app.use("/post", blogRoutes);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
