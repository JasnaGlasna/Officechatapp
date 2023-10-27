const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const config = require("./pkg/config");
require("./pkg/db");

const { accountRegister, accountLogin, refreshToken, resetPassword } = require("./handlers/auth");
const {createPost,getAllPosts,updatePost,removePost} = require('./handlers/posthandler');
const app = express(); // Define the app instance before setting view engine and adding routes
app.post("/api/v1/posts", async (req, res) => {
  try {
    const newPost = await createPost(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).send("Failed to create a new post");
  }
});

// Retrieve all posts
app.get("/api/v1/posts", async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send("Failed to retrieve posts");
  }
});

// Update a post by ID
app.put("/api/v1/posts/:id", async (req, res) => {
  try {
    const updatedPost = await updatePost(req.params.id, req.body);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).send("Failed to update the post");
  }
});

// Remove a post by ID
app.delete("/api/v1/posts/:id", async (req, res) => {
  try {
    await removePost(req.params.id);
    res.status(204).send("Post removed successfully");
  } catch (err) {
    res.status(500).send("Failed to remove the post");
  }
});


app.set('view engine', 'ejs'); // Set EJS as the view engine

app.use(express.json());

app.get('/', (req, res) => {
  res.render('default'); // Renders the 'default.ejs' 
});

app.get('/login', (req, res) => {
  res.render('login'); // Renders the "login.ejs"
});

app.get('/register', (reg, res) => {
  res.render('register');
});

app.use(
  jwt({
    secret: config.getSection("development").jwt,
    algorithms: ["HS256"]
  }).unless({
    path: [
      "/api/v1/auth/register",
      "/api/v1/auth/login",
      "/api/v1/auth/refreshToken",
      "/api/v1/auth/resetPassword",
      "/views/login.ejs",
      "/register",
      "/" 
    ],
  })
);

app.post("/api/v1/auth/register", accountRegister);
app.post("/api/v1/auth/login", accountLogin);
app.post("/api/v1/auth/refreshToken", refreshToken);
app.post("/api/v1/auth/resetPassword", resetPassword);


app.use(function (err, req, res, next) {
  if (err.name === "Unauthorized Access") {
    res.status(401).send("Invalid token");
  }
  res.status(err.status).send(err.inner.message);
});

app.listen(config.getSection("development").port, (err) => {
  err 
  ? console.log(err)
  : console.log(`Server started successfully at port ${config.getSection("development").port}`);
});
