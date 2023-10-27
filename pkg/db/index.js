const mongoose = require("mongoose");
const config = require("../config");

const { MONGO_USERNAME, MONGO_PASSWORD } = config.getSection("development");

//* ova uri zameni go so tvoeto uri od mongodb, vo connect vo drivers mozes da go najdes
//* na mestoto pomegju kosata crta i prasalnikot kaj sto stoi wbs-g2 stavi ja tvojata databaza za office app
const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.sqzgyh1.mongodb.net/officeappbase?retryWrites=true&w=majority`
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected!");
  } catch (err) {
    console.error(err);
  }
}

connect()