const mongoose = require("mongoose");
const connectionStr =
  "mongodb+srv://admin:fRgonCXd8RxXs9Jr@cluster0.3pyhzah.mongodb.net/coffeeGame";

mongoose
  .connect(connectionStr, { connectTimeoutMS: 2000 })
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));
