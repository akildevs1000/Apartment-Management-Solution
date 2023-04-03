const Yup = require("yup");

const schema = Yup.object().shape({
  name: Yup.string().required().min(3).max(20),
  email: Yup.string().email().required(),
  floor_id: Yup.number().typeError("floor is a required field"),
  flat_id: Yup.number().typeError("flat is a required field"),
  photo: Yup.string().required(),
  tel: Yup.string().required(),
  ext: Yup.string().required(),
  gender: Yup.string().required(),
  mobile: Yup.string().required(),
  from: Yup.string().required(),
  to: Yup.string().required(),
});

module.exports = schema;
