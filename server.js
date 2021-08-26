const express = require("express");
const app = express();
const fs = require("fs");
const myModule = "./myModule";
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/trees", (req, res) => {
  res.status(200).send({
    tree: "🌳",
    type: "Oak",
  });
});

app.post("/trees/:id", (req, res) => {
  const id = req.params.id;
  const { type } = req.body;

  if (req.body) {
    res.status(201).send({
      tree: `🌳 is this type: ${type} and has an ID of ${id}`,
    });
  } else {
    res.status(418).send({ message: "We need a logo!" });
  }
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
