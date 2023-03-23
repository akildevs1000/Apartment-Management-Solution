const test = (req, res) => {
  res.send({ message: "api works!", req: req.body });
};

module.exports = {
  test,
};
