import React from 'react';
import { Tab, Text } from '@chakra-ui/react';

interface Props {
  icon: JSX.Element;
  title: string;
  selected?: boolean;
}

export const SidebarTab = ({
  icon,
  title,
  selected = false,
}: Props): JSX.Element => {
  return (
    <Tab display="flex" justifyContent="left">
      {icon}
      <Text fontWeight={selected && 'bold'}>{title}</Text>
    </Tab>
  );
};

export default SidebarTab;
