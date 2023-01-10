const express = require("express");
const app = express();
const methodOverride = require("method-override");

// ---------------------
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});

app.post("/login", (req, res) => {
  console.log("-- Login Process --");
  console.log(req.body);
  // res.status(200);
  res.status(200).json({ message: "The server received the login data" });
  // res.json(req.body);
});

app.post("/register", (req, res) => {
  console.log("-- Register Process --");
  console.log(req.body);
  // res.json(req.body);
});
