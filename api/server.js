const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors()); // allow all origins
app.use(express.json());

const { execute, Initialization } = require("./Database/database");
const { json } = require("body-parser");
const {
  retrieveChecklists,
  retrieveSpecificChecklist,
  setItemAsCompleted,
  resetItem,
  addChecklistItem,
  addChecklist,
  removeCheckList,
} = require("./Database/handler");
app.get("/init", async (req, res) => {
  await Initialization();
  res.send("Successfully created the databases!");
});

app.get("/checklists", async (req, res) => {
  const checklists = await retrieveChecklists();
  res.json({ data: checklists });
});

app.get("/checklists/:id", async (req, res) => {
  const id = req.params.id;
  const checklists = await retrieveSpecificChecklist(id);
  res.json({ data: checklists });
});

app.post("/complete/:id", async (req, res) => {
  const id = req.params.id;
  const checklists = await setItemAsCompleted(id);
  res.json({ data: checklists });
});

app.post("/reset/:id", async (req, res) => {
  const id = req.params.id;
  const checklists = await resetItem(id);
  res.json({ data: checklists });
});

app.post("/add-item/:id", async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;
  const checklists = await addChecklistItem(id, title);
  res.json({ data: checklists });
});

app.post("/add-checklist/", async (req, res) => {
  const { title } = req.body;
  const checklists = await addChecklist(title);
  res.json({ data: checklists });
});
app.post("/remove-checklist/:id", async (req, res) => {
  const id = req.params.id;
  const checklists = await removeCheckList(id);
  res.json({ data: checklists });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
