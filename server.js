const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const auth = require('./middlewares/auth');

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ extended: true }));

// test
const testCtrl = require("./controllers/testController.js");
app.get("/test", testCtrl.test);

// auth
const authCtrl = require("./controllers/authCtrl.js");
app.post("/login", authCtrl.login);
app.get("/me", auth, authCtrl.me);
app.post("/logout", auth, authCtrl.logout);

// apartment
const apartmentCtrl = require("./controllers/apartmentCtrl.js");
app.get("/apartment", apartmentCtrl.index);
app.get("/apartment/:id", apartmentCtrl.show);
app.put("/apartment/:id", apartmentCtrl.update);
app.delete("/apartment/:id", apartmentCtrl.destroy);
app.post("/apartment", apartmentCtrl.store);

// role
const roleCtrl = require("./controllers/roleCtrl.js");
app.get("/role", roleCtrl.index);
app.get("/role/:id", roleCtrl.show);
app.put("/role/:id", roleCtrl.update);
app.delete("/role/:id", roleCtrl.destroy);
app.post("/role", roleCtrl.store);

// user
const userCtrl = require("./controllers/userCtrl.js");
app.get("/user", userCtrl.index);
app.get("/user/:id", userCtrl.show);
app.put("/user/:id", userCtrl.update);
app.delete("/user/:id", userCtrl.destroy);
app.post("/user", userCtrl.store);

// floor
const floorCtrl = require("./controllers/floorController.js");
app.get("/floor", floorCtrl.index);
app.get("/floor/:id", floorCtrl.show);
app.delete("/floor/:id", floorCtrl.destroy);
app.post("/floor", floorCtrl.store);

// flat
const flatCtrl = require("./controllers/flatController.js");
app.get("/flat", flatCtrl.index);
app.get("/flat/:id", flatCtrl.show);
app.delete("/flat/:id", flatCtrl.destroy);
app.post("/flat", flatCtrl.store);

// tennant
const tennantCtrl = require("./controllers/tennantCtrl.js");
app.get("/tennant", tennantCtrl.index);
app.get("/tennant/:id", tennantCtrl.show);
app.delete("/tennant/:id", tennantCtrl.destroy);
app.post("/tennant", tennantCtrl.store);

// member
const memberCtrl = require("./controllers/memberCtrl.js");
app.get("/member/:id", memberCtrl.show);
app.post("/member/:id", memberCtrl.store);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
