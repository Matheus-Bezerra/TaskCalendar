import { FormEvent } from "react";
import { campsFormTaskProps } from "../../../interfaces";

export interface ModalCreateProps {
  handleShowModalCreate: boolean;
  setHandleShowModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateNewTask: (e: FormEvent) => Promise<void>;
  campsFormTask: campsFormTaskProps;
  changeValuesCampsTask: (
    dataType: keyof campsFormTaskProps,
    value: string,
  ) => void;
  isLoadingCreatingTask: boolean;
}