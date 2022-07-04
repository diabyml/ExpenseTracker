require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => console.log("MongoDB ready!"));
mongoose.connection.on("error", (err) => console.log(`MongoDB err:`, err));

function mongoConnect() {
  mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
