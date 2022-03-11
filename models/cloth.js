const mongoose = require("mongoose");
const { Schema } = mongoose;
const clothSchema = new Schema(
  {
    clothName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
    },
    description: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("cloth", clothSchema);
