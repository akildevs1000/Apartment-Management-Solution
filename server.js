const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8080;

// controllers
const testCtrl = require("./controllers/testController.js");
const floorCtrl = require("./controllers/floorController.js");
const flatCtrl = require("./controllers/flatController.js");
const tennantCtrl = require("./controllers/tennantCtrl.js");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(port, () => {
  console.log(`Backend app listening on port http://localhost:${port}`);
});
