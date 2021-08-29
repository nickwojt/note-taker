const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const { randomUUID } = require("crypto");
const util = require("util");
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const writeToFile = util.promisify(fs.writeFile);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(data);
  });
});

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  let newNote = {};
  if (title && text) {
    newNote = {
      title,
      text,
      id: randomUUID(),
    };
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      const allNotes = [].concat(JSON.parse(data));
      allNotes.push(newNote);
      console.log(typeof data);
      console.log(allNotes);
      writeToFile("./db/db.json", JSON.stringify(allNotes), (err) => {
        err ? console.log(err) : console.log("Success. File was written!");
      })
        .then(
          res.status(201).sendFile(path.join(__dirname, "./public/notes.html"))
        )
        .catch(err ? console.log(err) : console.log("Woo!"));
    });
  }
});

// app.delete("/api/notes/:id", (req, res) => {
//   const id = req.params.id;
//   if id
// });

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

//let arr = [1, 3, 5, 4]
// let newArr = [...arr, 5] <== [1, 3, 5, 4, 5]
