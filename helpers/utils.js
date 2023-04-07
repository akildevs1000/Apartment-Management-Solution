const fs = require("fs");

const { v4: uuidv4 } = require("uuid");


const checkExistence = (Model, col) => async (v) => {
  let qs = {};
  qs[col] = v;
  return !(await Model.findOne({ where: qs }));
};

const processPhoto = async (photo, ext) => {
  let base64DataWithoutPrefix = photo.replace(/^data:image\/\w+;base64,/, "");

  let buffer = Buffer.from(base64DataWithoutPrefix, "base64");

  let imageName = `${uuidv4()}.${ext}`;

  fs.writeFile("./uploads/images/" + imageName, buffer, (err) =>
    !err ? true : false
  );

  return imageName;
};

const errors = async (inner) => {
  const errors = {};
  const processedKeys = {};
  for (const obj of inner) {
    const key = obj.path;
    if (!processedKeys[key]) {
      processedKeys[key] = true;
      errors[key] = obj.message;
    }
  }
  return errors;
};

const paginate = async ({ page = 1, per_page = 5, orderBy = "DESC" }) => {
  return {
    offset: (page - 1) * per_page,
    limit: per_page,
    order: [["createdAt", orderBy]],
  };
};

const toTitle = (str) => {
  return (
    str.charAt(0).toUpperCase() +
    str.substring(1, str.length).replace("_", " ")
  );
};

module.exports = {
  processPhoto,
  errors,
  paginate,
  checkExistence,
  toTitle
};
