import { useState } from "react";
import type { CheckList, ModalProps } from "../types/types";

const titleSetter = (
  e: React.ChangeEvent<HTMLInputElement>,
  setTitle: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setTitle(e.target.value);
};
const itemsSetter = (
  e: React.ChangeEvent<HTMLTextAreaElement>,
  setTitle: React.Dispatch<React.SetStateAction<string | null>>
) => {
  setTitle(e.target.value.replaceAll("\n", ""));
};

const handleClose = (
  setShow: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setShow(false);
};
const handleSumbit = async (
  e: React.FormEvent,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  setCheckList: React.Dispatch<React.SetStateAction<CheckList[]>>,
  title: string | null,
  items: string | null
) => {
  e.preventDefault(); // we prevent the default submit handler like refreshing page.
  const itemsDecoded = items
    ? items
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
    : [];

  if (title) {
    const res = await fetch("http://localhost:3000/add-checklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title }),
    });
    const newChecklist = (await res.json()).data; // contains .id and .title
    console.log(newChecklist);
    if (itemsDecoded.length > 0) {
      const newItems = await Promise.all(
        itemsDecoded.map(async (x: string) => {
          const newData = await fetch(
            `http://localhost:3000/add-item/${newChecklist.id}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ title: x.trim() }),
            }
          );
          return (await newData.json()).data;
        })
      );
      newChecklist.items = newItems;
      setCheckList((prev) => [...prev, newChecklist]);
    }
  } else {
    alert("Please enter a title.");
    return;
  }
  setShow(false);
};
// onChange vs Oninput: oninput each time 1 stroke gets updated. Onchange, fires once updated AND lost focus.
export function GetModal({ show, setShow, setCheckList }: ModalProps) {
  const [title, setTitle] = useState<string | null>(null);
  const [items, setItems] = useState<string | null>(null);

  return (
    <div className={`backdrop ${show ? "show" : "hidden"}`}>
      <div className={`modal ${show ? "show" : "hidden"}`}>
        <h1 className="mb-5 modal-title">Add Checklist</h1>
        <form
          className="d-flex flex-column gap-2"
          onSubmit={(e) => handleSumbit(e, setShow, setCheckList, title, items)}
        >
          <label htmlFor="title">Checklist Title:</label>
          <input
            onChange={(e) => titleSetter(e, setTitle)}
            type="text"
            id="title"
            name="title"
          />
          <label htmlFor="items">Add items (seperated by a ',''):</label>
          <textarea
            onChange={(e) => itemsSetter(e, setItems)}
            id="items"
            name="items"
          />

          <div className="d-flex flex-row align-items-end justify-content-between">
            <button className="btns" type="submit">
              Add Checklist
            </button>
            <button onClick={() => handleClose(setShow)} className="btns">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
