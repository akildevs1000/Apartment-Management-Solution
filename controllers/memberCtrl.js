const db = require("../models");
const fs = require("fs");

const { destroy,processPhoto } = require("../helpers/utils.js");

const Tennant = db.tennant;
const Member = db.member;

const { v4: uuidv4 } = require("uuid");

const show = async (req, res) => {
  try {
    const member = await Member.findAll({
      include: Tennant,
      where: {
        tennant_id: req.params.id,
      },
    });
    if (member) {
      res.json(member);
    } else {
      res.status(404).json({ message: "member not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve data", error });
  }
};

const store = async ({ body, params }, res) => {
  try {
    await destroy(Member, "tennant_id", params.id);

    await body.forEach((e) => {
      let imageName = `${uuidv4()}.${e.ext}`;
      processPhoto(e.photo, imageName);
      e.photo = imageName;
    });
    await Member.bulkCreate(body);
    let response = { status: true, message: "Member created" };

    return res.status(200).json(response);
  } catch ({ message }) {
    res.status(500).json({ status: false, message });
  }
};



module.exports = {
  store,
  show,
  destroy,
};
