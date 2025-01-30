const express = require("express");
const Gemini = require("./router/geimini.router.js");
const AuthRoute = require("./router/auth.router.js");
const ConnectDB = require("./utils/Db.js");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api", Gemini);
app.use("/api", AuthRoute);

app.listen(process.env.PORT || 8080, () => {
  ConnectDB();
  console.log(`http://127.0.0.1:${process.env.PORT || 8080}`);
});
