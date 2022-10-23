import { Flex } from '@chakra-ui/react';
import DielIcon from '../../assets/Dielicon.svg';

export const Header = () => {
  return (
    <Flex pl={[4, 6, 12]} maxH="65px" align="center">
      <Flex as="h1" fontSize="4xl" py={4}>
        <img src={DielIcon} alt="" width={'125px'} /> .
      </Flex>
    </Flex>
  );
};
