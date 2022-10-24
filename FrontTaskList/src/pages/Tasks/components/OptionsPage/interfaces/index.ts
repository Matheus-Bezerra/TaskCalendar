import { campsFormTaskProps } from "../../../interfaces";

export interface OptionsPageProps {
  campsFormTask: campsFormTaskProps;
  setsFunction: {
    setCampsFormTask: React.Dispatch<React.SetStateAction<campsFormTaskProps>>;
    setHandleShowModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
    setIsVisibleCharts: React.Dispatch<React.SetStateAction<boolean>>;
  };
  clearValues: () => void;
  isVisibleCharts: boolean
}