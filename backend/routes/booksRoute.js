const express = require('express');
const router = express.Router();
const Book = require("../model/book");

router.get("/", async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    return res.status(200).send({ data: book });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(500).send({
        message: "Send all required fields",
      });
    }
    const book = await Book.create(req.body);
    return res.status(201).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(500).send({
        message: "Send all required fields",
      });
    }
    let book = await Book.findByPk(req.params.id);
    if (book === null) {
      return res.status(404).json({ message: "Book not found" });
    }
    book = await book.update(req.body);
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let book = await Book.findByPk(req.params.id);
    if(book === null){
      return res.status(404).json({ message: "Book not found" });
    }
    await book.destroy();
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;