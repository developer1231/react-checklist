export type CheckListItem = {
  id: number;
  checklist_id: number;

  item_title: string;
  completed: boolean;
};
export type CheckList = {
  id: number;
  title: string;
  items: CheckListItem[];
};

export type ModalProps = {
  show: boolean;
  setCheckList: React.Dispatch<React.SetStateAction<CheckList[]>>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export type NavProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export type typeProps = {
  setter: React.Dispatch<React.SetStateAction<CheckList | null>>;
  checklists: CheckList[];
};

export type sideProps = {
  setter: React.Dispatch<React.SetStateAction<CheckList | null>>;
  checklists: CheckList[];
  setCheckList: React.Dispatch<React.SetStateAction<CheckList[]>>;
  setItem: React.Dispatch<React.SetStateAction<CheckList | null>>;
};
export type BodyProps = {
  item: CheckList | null;
  setCheckList: React.Dispatch<React.SetStateAction<CheckList[]>>;
  setItem: React.Dispatch<React.SetStateAction<CheckList | null>>;
};
