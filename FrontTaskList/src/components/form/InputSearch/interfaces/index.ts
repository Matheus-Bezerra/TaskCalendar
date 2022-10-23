import { InputHTMLAttributes } from "react"

export interface InputSearchProps {
  placeholder: string;
  data: string
  setData: React.Dispatch<React.SetStateAction<string>>
}