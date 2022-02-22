import React from 'react';
import {
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
// import { MdArrowDropDown } from 'react-icons/md';

type Props = {
  deleteProject: any;
  id: number;
  filePath: string;
};

const ProjectsTableRowDropdown = ({ id, filePath, deleteProject }: Props) => {
  const revealFile = () => {
    window.electron.fileOpen(filePath);
  };

  return (
    <Menu>
      {/* <MenuButton as={Button} rightIcon={<MdArrowDropDown />} /> */}
      <MenuButton
        as={Button}
        variant="ghost"
        border="1px"
        borderColor="gray.600"
      >
        ...
      </MenuButton>
      <MenuList>
        <MenuItem onClick={revealFile}>Reveal in file explorer</MenuItem>
        <MenuItem>Add command line arguments</MenuItem>
        <Divider />
        <MenuItem onClick={() => deleteProject(id)}>
          Remove project from list
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProjectsTableRowDropdown;
