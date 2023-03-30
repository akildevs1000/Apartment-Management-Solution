export const useTenantValidations = () => {
  const isRequired = (value: string, msg: string) => {
    return !value ? msg : false;
  };

  const isLength = (field: string, min: number, max: number, msg: string) => {
    return field && (field.length < min || field.length > max) ? msg : false;
  };

  const isVAlidEmail = (field: string) => {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field)
      ? "Email is invalid"
      : false;
  };

  const validateField = (v: any) => {
    const errors: any = [];

    const required = (msg: string = "This field is required") => {
      const error = isRequired(v, msg);
      if (error) errors.push(error);
      return validator;
    };

    const length = (
      min: number,
      max: number,
      msg: string = "Name must be between 3 and 20 characters long"
    ) => {
      const error = isLength(v, min, max, msg);
      if (error) errors.push(error);
      return validator;
    };

    const emailvalid = () => {
      const error = isVAlidEmail(v);
      if (error) errors.push(error);
      return validator;
    };

    const validator = {
      required,
      length,
      emailvalid,
      validate: () => errors[0],
    };

    return validator;
  };

  const rules = (payload: any) => {
    const errors: Error = {};

    let { name, floor_id, flat_id, email, photo, gender, mobile, from, to } =
      payload;

    let json: any = {
      name: validateField(name).required().length(3, 20).validate(),
      floor_id: validateField(floor_id).required().validate(),
      flat_id: validateField(flat_id).required().validate(),
      email: validateField(email).required().emailvalid().validate(),
      photo: validateField(photo).required().validate(),
      gender: validateField(gender).required().validate(),
      mobile: validateField(mobile).required().validate(),
      from: validateField(from).required().validate(),
      to: validateField(to).required().validate(),
    };

    for (const prop in json) {
      if (json[prop] && json.hasOwnProperty(prop)) {
        errors[prop] = json[prop];
      }
    }

    return errors;
  };

  interface Error {
    [key: string]: string;
  }
  let obj: check = {};

  obj.msg = "francis";
  interface check {
    msg?: string;
  }
  return { rules };
};
