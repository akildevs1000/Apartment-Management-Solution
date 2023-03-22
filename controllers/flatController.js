const db = require("../models");

const Flat = db.flat;
const Floor = db.floor;

const index = async (req, res) => {
  res.send(
    await Flat.findAll({
      include: Floor,
      attributes: ["id", "flat_number"],
    })
  );
};

const show = async (req, res) => {
  try {
    const flat = await Flat.findOne({
      include: Floor,
      where: {
        flat_number: req.params.id,
      },
      attributes: ["id", "flat_number"],
    });
    if (flat) {
      res.json(flat);
    } else {
      res.status(404).json({ message: "flat not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve data", error });
  }
};

const destroy = async (req, res) => {
  try {
    const flat = await Flat.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (flat) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: "flat not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve data", error });
  }
};

const store = async (req, res) => {
  await Flat.create({
    flat_number: req.body.flat_number || "00",
    floor_id: req.body.floor_id,
  });

  res.send(
    await Flat.findAll({
      include: Floor,
      attributes: ["id", "flat_number"],
    })
  );

  //   res.send({ id: req.params.id, logo: req.body.logo });
};

module.exports = {
  store,
  index,
  show,
  destroy,
};
