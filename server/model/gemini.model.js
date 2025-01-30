const { Schema, model } = require("mongoose");

const GeminiSchema = new Schema({
  question: {
    type: String,
  },
  answer: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});
const Gemini = new model("gemini_q", GeminiSchema);
module.exports = Gemini;
