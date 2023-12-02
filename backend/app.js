const express = require("express");
const cors = require("cors");
const bookRouter = require("./routes/booksRoute");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/book", bookRouter);

app.listen(process.env.PORT);
