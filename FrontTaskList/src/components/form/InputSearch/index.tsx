import { Search2Icon } from '@chakra-ui/icons';
import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { InputSearchProps } from './interfaces';

export const InputSearch = ({
  data,
  setData,
  placeholder,
}: InputSearchProps) => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon color="gray.300" />}
      />
      <Input
        focusBorderColor="#181842"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder={placeholder}
      />
    </InputGroup>
  );
};
