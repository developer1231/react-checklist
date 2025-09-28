import { execute, run } from "./database.js";

export async function retrieveChecklists() {
  const checklists = await execute(`SELECT * FROM checklists`);
  for (const cl of checklists) {
    const items = await execute(
      `SELECT * FROM checklist_items WHERE checklist_id = ?`,
      [cl.id]
    );
    cl.items = items.map((i) => ({
      id: i.id,
      item_title: i.item_title,
      completed: !!i.completed,
    }));
  }
  return checklists;
}

export async function retrieveSpecificChecklist(id) {
  const checklistArray = await execute(
    `SELECT * FROM checklists WHERE id = ?`,
    [id]
  );
  const checklist = checklistArray[0];
  if (!checklist) return null;

  const items = await execute(
    `SELECT * FROM checklist_items WHERE checklist_id = ?`,
    [id]
  );
  checklist.items = items.map((i) => ({
    id: i.id,
    item_title: i.item_title,
    completed: !!i.completed,
  }));
  return checklist;
}

export async function setItemAsCompleted(itemId) {
  await run(`UPDATE checklist_items SET completed = 1 WHERE id = ?`, [itemId]);
  const [item] = await execute(`SELECT * FROM checklist_items WHERE id = ?`, [
    itemId,
  ]);
  return await retrieveSpecificChecklist(item.checklist_id);
}

export async function resetItem(itemId) {
  await run(`UPDATE checklist_items SET completed = 0 WHERE id = ?`, [itemId]);

  const [item] = await execute(`SELECT * FROM checklist_items WHERE id = ?`, [
    itemId,
  ]);
  return await retrieveSpecificChecklist(item.checklist_id);
}

export async function addChecklist(title) {
  const result = await run(`INSERT INTO checklists (title) VALUES (?)`, [
    title,
  ]);
  return { id: result.lastID, title };
}

export async function removeCheckList(id) {
  await run(`DELETE FROM checklists WHERE id = ?`, [id]);
  return await retrieveChecklists();
}

export async function addChecklistItem(checklistId, itemTitle) {
  const result = await run(
    `INSERT INTO checklist_items (checklist_id, item_title) VALUES (?, ?)`,
    [checklistId, itemTitle]
  );
  return {
    id: result.lastID,
    checklist_id: checklistId,
    item_title: itemTitle,
    completed: 0,
  };
}
