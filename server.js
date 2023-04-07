const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "50mb" }));

app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(port, () => {
  console.log(`Backend app listening on port http://localhost:${port}`);
});
