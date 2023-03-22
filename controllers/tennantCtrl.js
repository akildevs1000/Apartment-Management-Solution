const db = require("../models");

const Flat = db.flat;
const Floor = db.floor;
const Tennant = db.tennant;

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

const store = async (req, res) => {
  try {
    let payload = {
      name: req.body.name,
      floor_id: req.body.floor_id,
      flat_id: req.body.flat_id,
      photo: req.body.photo,
      email: req.body.email,
      gender: req.body.gender,
      tel: req.body.tel,
      mobile: req.body.mobile,
      from: req.body.from,
      to: req.body.to,
    };

    res.send(await Tennant.create(payload));
  } catch (error) {
    res.send(error);
  }

  //   res.send(
  //     await Tennant.findAll({
  //       include: [Floor, Flat],
  //     })
  //   );

  //   res.send({ id: req.params.id, logo: req.body.logo });
};

module.exports = {
  store,
  index,
  show,
  destroy,
};
