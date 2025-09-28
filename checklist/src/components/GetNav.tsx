import type {
  CheckList,
  CheckListItem,
  ModalProps,
  NavProps,
  sideProps,
  typeProps,
} from "../types/types";

const handleClick = async (
  e: React.FormEvent,
  setCheckList: React.Dispatch<React.SetStateAction<CheckList[]>>,
  id: string,
  setItem: React.Dispatch<React.SetStateAction<CheckList | null>>
) => {
  e.preventDefault(); // we prevent the default submit handler like refreshing page.

  const res = await fetch(`http://localhost:3000/remove-checklist/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log(data);
  setCheckList(data.data);
  setItem(null);
};
const loadInData = (
  key: number,
  setCheckListItem: React.Dispatch<React.SetStateAction<CheckList | null>>,
  checkLists: CheckList[]
) => {
  const selectedView: CheckList = checkLists[key];
  setCheckListItem(selectedView);
};

const onButtonClick = ({ show, setShow }: NavProps) => {
  setShow(!show);
};
export function GetNavBar({ show, setShow }: NavProps) {
  return (
    <div
      style={{ color: "white" }}
      className="nav-bar d-flex flex-row align-items-center justify-content-around"
    >
      <h1 className="title mx-5">Project Checklists</h1>
      <div
        onClick={() => onButtonClick({ show, setShow })}
        className="add-button"
      >
        <p className="m-0 p-0" style={{ color: "white" }}>
          + Add Checklist
        </p>
      </div>
    </div>
  );
}

export function GetSideBar({
  setter,
  checklists,
  setCheckList,
  setItem,
}: sideProps) {
  return (
    <div
      style={{ color: "white" }}
      className="side-bar d-flex flex-column align-items-center justify-content-start"
    >
      {checklists.map((x: any, index: number) => {
        return (
          <div
            onClick={() => loadInData(index, setter, checklists)}
            className="my-2 checklist-item"
            key={index}
          >
            <p className="checklist-title">{x.title}</p>
            <div className="checklist-sidebar">
              <p className="items-amount">{x.items.length} Items</p>
              <p className="mx-2" style={{ color: "gray" }}>
                /
              </p>
              <p className="items-completed">
                {x.items.filter((item: any) => item.completed).length} Completed
              </p>
            </div>
            <div
              onClick={(e) => handleClick(e, setCheckList, x.id, setItem)}
              className="m-2 delete-button"
            >
              Delete
            </div>
          </div>
        );
      })}
    </div>
  );
}
