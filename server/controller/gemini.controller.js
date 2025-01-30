const run = require("../utils/Api.js");
const Gemini = require("../model/gemini.model.js");

const GetOutPut = async (req, res) => {
  try {
    const { prompt } = req.body;
    const author = req.user.userId;
    if (!author) {
      return res.status(404).send("invalid user");
    }
    const response = await run(prompt);
    const gemini = new Gemini({
      question: prompt,
      answer: response,
      user: author,
    });
    await gemini.save();
    res.status(200).json({ question: prompt, answer: response });
  } catch (error) {
    return res.status(503).json(error.message);
  }
};

const GetUserOutPut = async (req, res) => {
  try {
    const author = req.params.id;
    const q_a_list = await Gemini.find({ user: author }).populate("user");
    res.status(200).send(q_a_list);
  } catch (error) {
    return res.status(503).json(error.message);
  }
};

const DeleteQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const prompt = await Gemini.findById(id);
    if (!prompt) {
      return res.status(404).send({ message: "prompt not found" });
    }
    if (prompt.user.toString() !== userId) {
      return res
        .status(403)
        .send({ error: "Unauthorized , You can only delete your own prompts" });
    }
    await Gemini.findByIdAndDelete(id);
    res.status(200).send({ message: "prompt deleted successfully" });
  } catch (error) {
    res.status(503).send(error.message);
  }
};

module.exports = { GetOutPut, GetUserOutPut, DeleteQuery };
