import sqlite3 from "sqlite3";
const db = new sqlite3.Database("database.db");
export function execute(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

export function run(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }
    });
  });
}

export async function Initialization() {
  try {
    await run(`CREATE TABLE IF NOT EXISTS checklists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL
);`);
    await run(`CREATE TABLE IF NOT EXISTS checklist_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  checklist_id INTEGER NOT NULL,
  item_title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 0,
  FOREIGN KEY (checklist_id) REFERENCES checklists(id));
`);

    console.log("created table checklists");
  } catch (err) {
    console.error("Initialization error:", err);
  }
}
