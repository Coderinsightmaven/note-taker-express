const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    newNote.id = notes.length + 1; // Assign a unique id to the new note
    notes.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNotes = notes.filter((note) => note.id !== noteId);
    fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) => {
      if (err) throw err;
      res.json({ ok: true });
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNotes = notes.filter((note) => note.id !== noteId);
    fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) => {
      if (err) throw err;
      res.json({ ok: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
