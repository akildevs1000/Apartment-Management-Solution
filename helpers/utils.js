const fs = require("fs");

const { v4: uuidv4 } = require("uuid");

const destroy = async (Member, col, id) => {
  let qs = {};
  qs[col] = id;
  try {
    await Member.destroy({ where: qs });
  } catch (error) {
    return { message: "Failed to retrieve data", error };
  }
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

module.exports = {
  destroy,
  processPhoto,
  errors,
};
