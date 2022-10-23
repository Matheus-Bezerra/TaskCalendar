import { FormEvent } from "react";
import { campsFormTaskProps } from "../../../interfaces";

export interface ModalEditProps {
  handleShowModalEdit: boolean;
  setHandleShowModalEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditTask: (e: FormEvent) => Promise<void>;
  campsFormTask: campsFormTaskProps;
  changeValuesCampsTask: (
    dataType: keyof campsFormTaskProps,
    value: string,
  ) => void;
  isLoadingEditingTask: boolean;
}