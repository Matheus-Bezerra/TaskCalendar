import { Task } from "../../../interfaces";

export interface TableContainerProps {
  isLoading: boolean;
  dataItem: { data: Task[]; foundDataItem: Task[] };
  handleToggleTaskCompletion: (id: number | string) => void;
  setsFunctions: {
    setIdTaskSelected: React.Dispatch<React.SetStateAction<string>>;
    setHandleAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
  };
  prepareEdit: (id: string | number) => void;
}