const db = require("../models");
const valdiationSchema = require("../validations/tenantValidation");
const { errors, processPhoto } = require("../helpers/utils.js");

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

const store = async ({ body }, res) => {
  try {
    const validated = await valdiationSchema.validate(body, {
      abortEarly: false,
    });
    validated.photo = await processPhoto(body.photo, body.ext);

    await Tennant.create(validated);
    let response = { status: true, message: "Tennant created" };
    return res.status(200).json(response);
  } catch ({ inner }) {
    res.status(400).send(await errors(inner));
  }
};

module.exports = {
  store,
  index,
  show,
  destroy,
};
