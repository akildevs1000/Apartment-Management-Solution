const db = require("../models");
const fs = require("fs");

const Flat = db.flat;
const Floor = db.floor;
const Tennant = db.tennant;

const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads/images",

  filename: (req, { originalname }, cb) => {
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

    const extension = path.extname(originalname);

    if (!allowedExtensions.includes(extension)) {
      return cb(new Error("Invalid file extension"));
    }

    return cb(null, uuidv4() + extension);
  },
});

const upload = multer({ storage }).single("photo");
const otherUploads = multer({ storage }).none();

const index = async (req, res) => {
  res.send(
    await Tennant.findAll({
      include: [Floor, Flat],
      //   attributes: ["id", "tennant_number"],
    })
  );
};

const show = async (req, res) => {
  try {
    const tennant = await Tennant.findOne({
      include: Floor,
      where: {
        id: req.params.id,
      },
    });
    if (tennant) {
      res.json(tennant);
    } else {
      res.status(404).json({ message: "tennant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve data", error });
  }
};

const destroy = async (req, res) => {
  try {
    const tennant = await Tennant.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (tennant) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: "tennant not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve data", error });
  }
};

const store = (req, res) => {
  const base64Data = req.body.photo;

  // Remove the data:image/png;base64, prefix to get the Base64 encoded data
  const base64DataWithoutPrefix = base64Data.replace(
    /^data:image\/\w+;base64,/,
    ""
  );

  // Create a Buffer object from the Base64 encoded data
  const buffer = Buffer.from(base64DataWithoutPrefix, "base64");

  // Write the decoded image data to a file
  fs.writeFile("decoded-image." + req.body.ext, buffer, (err) => {
    if (err) throw err;
    
    res.send({
      status: true,
      message: "Image file saved!",
    });
  });

  return;
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ status: false, message: err.message });
      }
      req.body.photo = req.file.filename;
      await Tennant.create(req.body);
      res.send({
        status: true,
        message: "Tennant created.",
      });
    } catch ({ message }) {
      res.status(500).json({ status: false, message });
    }
  });
};

module.exports = {
  store,
  index,
  show,
  destroy,
};
