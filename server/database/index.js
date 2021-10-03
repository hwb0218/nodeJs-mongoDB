const mongoose = require("mongoose");

module.exports = {
  connectDB: async function () {
    try {
      await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connection SUCCESS");
    } catch (error) {
      console.error("MongoDB connection FAIL");
      process.exit(1);
    }
  },
};
