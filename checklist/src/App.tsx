import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GetNavBar, GetSideBar } from "./components/GetNav";
import type { CheckList, CheckListItem } from "./types/types";
import { GetMainBody } from "./components/GetMainBody";
import { GetModal } from "./components/GetModel";

function App() {
  const [checklists, setChecklists] = useState<CheckList[]>([]);
  const [item, setItem] = useState<CheckList | null>(null);
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    const effect = async () => {
      const res = await fetch("http://localhost:3000/init");
      const res2 = await fetch("http://localhost:3000/checklists");
      const objectData: any = await res2.json();
      const realData = objectData.data;
      setChecklists(realData);
    };
    effect();
  }, []);
  return (
    <div className="container">
      <div className="d-flex flex-row">
        <GetNavBar show={show} setShow={setShow} />
      </div>
      <div className="d-flex flex-column">
        <GetSideBar
          checklists={checklists}
          setter={setItem}
          setCheckList={setChecklists}
          setItem={setItem}
        />
      </div>
      <div className="main-body">
        <GetMainBody
          setCheckList={setChecklists}
          item={item}
          setItem={setItem}
        ></GetMainBody>
      </div>
      <div className="d-flex flex-column">
        <GetModal
          setCheckList={setChecklists}
          show={show}
          setShow={setShow}
        ></GetModal>
      </div>
    </div>
  );
}

export default App;
