const db = require("../models");

const Floor = db.floor;
const Flat = db.flat;

const index = async (req, res) => {
  res.send(
    await Floor.findAll({
      include: Flat,
      attributes: ["id", "floor_number"],
    })
  );
};

const show = async (req, res) => {
  try {
    let floor = await Floor.findOne({
      include: Flat,
      attributes: ["id", "floor_number"],
      where: {
        floor_number: req.params.id,
      },
    });
    if (floor) {
      res.json(floor);
    } else {
      res.status(404).json({ message: "floor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve data", error });
  }
};

const destroy = async (req, res) => {
  try {
    const floor = await Floor.destroy({
      where: {
        floor_number: req.params.id,
      },
    });
    if (floor) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: "floor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve data", error });
  }
};

const store = async (req, res) => {
  let floor = await Floor.create({
    floor_number: req.body.floor_number || "00",
  });

  try {
    floor = await Floor.findOne({
      include: Flat,
      attributes: ["id", "floor_number"],
      where: {
        id: floor.id,
      },
    });
    if (floor) {
      res.json(floor);
    } else {
      res.status(404).json({ message: "floor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve data", error });
  }

  //   res.send({ id: req.params.id, logo: req.body.logo });
};

module.exports = {
  store,
  index,
  show,
  destroy,
};
