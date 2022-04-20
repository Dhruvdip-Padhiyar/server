const { Schema, model } = require("mongoose");

const goalSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const goalModel = model("Goals", goalSchema);

module.exports = goalModel;
