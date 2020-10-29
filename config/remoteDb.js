const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose.connect(
    "mongodb+srv://node-rest-shop:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0.nnle7.mongodb.net/user-login-form?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );
  mongoose.Promise = global.Promise;
};

module.exports = dbConnect;
