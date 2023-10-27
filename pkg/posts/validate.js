const { Validator } = require("node-input-validator");

const postCreate = {
  username: "required|string|minLength:3",
  post: "required|string|minLength:3",
};

const postUpdate = {
  username: "string",
  post: "string",
};

const validate = async (data, schema) => {
  const v = new Validator(data, schema);
  const e = await v.check();
  if (!e) {
    throw {
      code: 400,
      error: v.errors
    };
  }
};

module.exports = {
  postCreate,
  postUpdate,
  validate
};

