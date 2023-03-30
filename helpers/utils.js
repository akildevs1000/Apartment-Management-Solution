const destroy = async (Member, col, id) => {
  let qs = {};
  qs[col] = id;
  try {
    await Member.destroy({ where: qs });
  } catch (error) {
    return { message: "Failed to retrieve data", error };
  }
};

const processPhoto = async (photo, imageName) => {
  let base64DataWithoutPrefix = photo.replace(/^data:image\/\w+;base64,/, "");

  let buffer = Buffer.from(base64DataWithoutPrefix, "base64");

  fs.writeFile("./uploads/images/" + imageName, buffer, (err) =>
    !err ? true : false
  );
};

module.exports = {
  destroy,
  processPhoto,
};
