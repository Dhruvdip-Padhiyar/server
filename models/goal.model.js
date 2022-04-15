const { Schema, model } = require("mongoose");

const goalSchema = new Schema(
  {
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const goalModel = model("Goals", goalSchema);

module.exports = goalModel;
