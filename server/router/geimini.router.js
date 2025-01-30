const express = require("express");
const {
  GetOutPut,
  GetUserOutPut,
  DeleteQuery,
} = require("../controller/gemini.controller.js");
const authmiddleware = require("../middleware/auth.middleware.js");

const router = express.Router();

router.post("/prompt", authmiddleware, GetOutPut);
router.get("/prompt/:id", authmiddleware, GetUserOutPut);
router.delete("/prompt/:id", authmiddleware, DeleteQuery);

module.exports = router;
