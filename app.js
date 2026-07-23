const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { createUser, login } = require("./controllers/users");

const { PORT = 3001 } = process.env;
const app = express();
const routes = require("./routes");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(cors());
app.use(express.json());
app.post("/signin", login);
app.post("/signup", createUser);
app.use(routes);

app.listen(PORT);
