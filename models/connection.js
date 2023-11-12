const mongoose = require("mongoose");
const connectionStr = process.env.conString;

mongoose
  .connect(connectionStr, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
