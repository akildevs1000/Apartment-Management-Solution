const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middlewares/auth');

const fs = require('fs');
const tokens = JSON.parse(fs.readFileSync('./tokens.json', 'utf-8'));
require('dotenv').config();


const app = express();
const port = 8080;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  // Get the user credentials from the request body
  const { username, password } = req.body;

  // Check if the user credentials are valid
  if (username !== 'admin' || password !== 'password') {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate a JWT token
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });


  // Store the token in a JSON file
  tokens.push(token);
  fs.writeFileSync('./tokens.json', JSON.stringify(tokens));

  // Return the token in the response
  res.json({ token });
});

app.post('/logout', auth, ({ header: { authorization } }, res) => {

  tokens.splice(tokens.indexOf(authorization.split(" ")[1]), 1);

  fs.writeFileSync('./tokens.json', JSON.stringify(tokens));

  res.json({ message: 'Logged out' });
});

app.get("/me", auth, ({ user }, res) => res.json(user));

app.get("/test", auth, (req, res) => {
  res.json({ success: "true", user: req.user });
});

const generateAccessToken = ({ id, username, email }) => {
  return jwt.sign({ id, username, email }, 'secret_key', { expiresIn: '59s' });
}

// controllers
const testCtrl = require("./controllers/testController.js");
const floorCtrl = require("./controllers/floorController.js");
const flatCtrl = require("./controllers/flatController.js");
const tennantCtrl = require("./controllers/tennantCtrl.js");
const memberCtrl = require("./controllers/memberCtrl.js");

const apartmentCtrl = require("./controllers/apartmentCtrl.js");
const roleCtrl = require("./controllers/roleCtrl.js");
const userCtrl = require("./controllers/userCtrl.js");


// app.get("/test", testCtrl.test);

// Define a schema for the request body using Yup

app.get("/test", testCtrl.test);

app.get("/floor", floorCtrl.index);
app.get("/floor/:id", floorCtrl.show);
app.delete("/floor/:id", floorCtrl.destroy);
app.post("/floor", floorCtrl.store);

app.get("/flat", flatCtrl.index);
app.get("/flat/:id", flatCtrl.show);
app.delete("/flat/:id", flatCtrl.destroy);
app.post("/flat", flatCtrl.store);

app.get("/tennant", tennantCtrl.index);
app.get("/tennant/:id", tennantCtrl.show);
app.delete("/tennant/:id", tennantCtrl.destroy);
app.post("/tennant", tennantCtrl.store);

app.get("/member/:id", memberCtrl.show);
app.post("/member/:id", memberCtrl.store);

// role

app.get("/role", roleCtrl.index);
app.get("/role/:id", roleCtrl.show);
app.put("/role/:id", roleCtrl.update);
app.delete("/role/:id", roleCtrl.destroy);
app.post("/role", roleCtrl.store);


// user
app.get("/user", userCtrl.index);
app.get("/user/:id", userCtrl.show);
app.put("/user/:id", userCtrl.update);
app.delete("/user/:id", userCtrl.destroy);
app.post("/user", userCtrl.store);

// apartment
app.get("/apartment", apartmentCtrl.index);
app.get("/apartment/:id", apartmentCtrl.show);
app.put("/apartment/:id", apartmentCtrl.update);
app.delete("/apartment/:id", apartmentCtrl.destroy);
app.post("/apartment", apartmentCtrl.store);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
