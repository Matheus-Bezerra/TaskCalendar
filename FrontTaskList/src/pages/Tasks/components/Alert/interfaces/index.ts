export interface AlertTaskProps {
  handleAlertDialog: boolean;
  setHandleAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleRemoveTask: (id: number | string) => Promise<void>;
  idTaskSelected: string;
  isLoadingDeletingTask: boolean;
}