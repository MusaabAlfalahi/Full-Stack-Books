const express = require("express");
const cors = require("cors");
const bookRouter = require("./routes/booksRoute");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/book", bookRouter);

app.listen(process.env.PORT);
