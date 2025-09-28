import type { BodyProps, CheckList, CheckListItem } from "../types/types";

const onChangeHandler = async (
  e: React.ChangeEvent<HTMLInputElement>,
  itemId: number,
  setCheckList: React.Dispatch<React.SetStateAction<CheckList[]>>,
  item: CheckList,
  setItem: React.Dispatch<React.SetStateAction<CheckList | null>>
) => {
  const res = await fetch(`http://localhost:3000/complete/${itemId}`, {
    method: "POST",
  });
  const data = await res.json();
  setCheckList((prev) =>
    prev.map((cl) =>
      cl.id === item.id
        ? {
            ...item,
            items: item.items.map((i) =>
              i.id === itemId ? { ...i, completed: true } : i
            ),
          }
        : cl
    )
  );

  setItem((prev) =>
    prev
      ? {
          ...prev,
          items: prev.items.map((i) =>
            i.id === itemId ? { ...i, completed: true } : i
          ),
        }
      : prev
  );
};

const resetHandler = async (
  itemId: number,
  setCheckList: React.Dispatch<React.SetStateAction<CheckList[]>>,
  item: CheckList,
  setItem: React.Dispatch<React.SetStateAction<CheckList | null>>
) => {
  const res = await fetch(`http://localhost:3000/reset/${itemId}`, {
    method: "POST",
  });
  const data = await res.json();
  setCheckList((prev) =>
    prev.map((cl) =>
      cl.id === item.id
        ? {
            ...item,
            items: item.items.map((i) =>
              i.id === itemId ? { ...i, completed: false } : i
            ),
          }
        : cl
    )
  );
  setItem((prev) =>
    prev
      ? {
          ...prev,
          items: prev.items.map((i) =>
            i.id === itemId ? { ...i, completed: false } : i
          ),
        }
      : prev
  );
};

export function GetMainBody({ item, setCheckList, setItem }: BodyProps) {
  // react here always passes props as {item : actual_content_sent_here}, so it adds an extra object
  return (
    <div className="d-flex flex-column justify-content-center align-items-start">
      {item === null ? (
        <p>
          No Checklist selected yet. Please click on one of the checklists in
          the sidebar.
        </p>
      ) : (
        <p className="checklist-preview-item">
          Project Checklist for:{" "}
          <span className="project-markdown">{item.title}</span>
        </p>
      )}
      <div className="mt-3 d-flex flex-column align-items-start justify-content-start">
        <p className="m-0 p-0">
          Select the checkboxes to mark an item as completed.
        </p>
        <p className="m-0 p-0">
          Click the '⟲' to mark a project as not completed.
        </p>
      </div>
      <div className="mt-3 gap-2 d-flex flex-column align-items-start justify-content-start">
        {item?.items.map((x: CheckListItem, index: number) => {
          return (
            <div className="item-in-checklist d-flex justify-content-center align-items-center flex-row gap-2 px-2 py-1">
              {x.completed ? null : (
                <input
                  onChange={(e) =>
                    onChangeHandler(e, x.id, setCheckList, item, setItem)
                  }
                  type="checkbox"
                  id={x.item_title}
                  value=""
                ></input>
              )}
              <p className=" p-0 m-0 selection-icon w-100">
                {x.completed ? <span style={{ color: "orange" }}>✓</span> : ""}
              </p>
              <p
                className={`${
                  x.completed ? "item-done" : ""
                } p-0 m-0 selection-name`}
              >
                {x.item_title}
              </p>
              {x.completed ? (
                <div
                  onClick={
                    x.completed
                      ? () => resetHandler(x.id, setCheckList, item, setItem)
                      : undefined
                  }
                  style={{ color: "orange" }}
                  className="reset-button"
                >
                  <p className="m-0 p-0 mx-5">⟲</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
