const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

//! prviot parametar e imeto na modelot
//! vtoriot parametar e shemata ili teloto na dokumentot
//! tretiot parametar e databazata
const Account = mongoose.model("Account", accountSchema, "accounts");

//! crud operacii
const create = async (data) => {
  const account = new Account(data);
  return account.save();
};

const getAll = async () => {
  return await Account.find({});
};

const getById = async (id) => {
  return await Account.findOne({ _id: id });
};

const getByEmail = async (email) => {
  return await Account.findOne({ email });
};

const setNewPassword = async (id, password) => {
  return await Account.findOne({ _id: id }, { password });
};

const update = async (id, data) => {
  return await Account.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return await Account.deleteOne({ _id: id });
};

module.exports = {
  create,
  getById,
  getByEmail,
  getAll,
  setNewPassword,
  update,
  remove
};