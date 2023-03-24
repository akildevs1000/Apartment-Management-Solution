const db = require("../models");
const fs = require("fs");

const Flat = db.flat;
const Floor = db.floor;
const Tennant = db.tennant;

const path = require("path");
const { v4: uuidv4 } = require("uuid");

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

const processPhoto = async (photo, imageName) => {
  const base64DataWithoutPrefix = photo.replace(/^data:image\/\w+;base64,/, "");

  const buffer = Buffer.from(base64DataWithoutPrefix, "base64");

  // creating image
  fs.writeFile("./uploads/images/" + imageName, buffer, (err) =>
    !err ? true : false
  );
};

const store = async ({ body }, res) => {
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];

  if (!allowedExtensions.includes(body.ext)) {
    let response = {
      status: false,
      message: "Invalid file extension",
    };
    return res.status(422).json(response);
  }

  try {
    let imageName = `${uuidv4()}.${body.ext}`;
    processPhoto(body.photo, imageName);
    body.photo = imageName;
    await Tennant.create(body);
    let response = { status: true, message: "Tennant created" };
    return res.status(200).json(response);
  } catch ({ message }) {
    res.status(500).json({ status: false, message });
  }
};

module.exports = {
  store,
  index,
  show,
  destroy,
};
