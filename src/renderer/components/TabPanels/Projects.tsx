import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { MdArrowDropDown, MdSearch } from 'react-icons/md';
import { ProjectData } from 'renderer/common/types';
import ProjectsTable from './Projects/ProjectsTable';
import { TabPanelLayout } from './TabPanelLayout';

const SAMPLE_PROJECTS: ProjectData[] = [
  {
    filename: 'Test project.blend',
    path: '/Users/sleonhart/Projects/',
    last_modified: new Date(),
    cli: '',
  },
  {
    filename: 'Test.blend',
    path: '/Users/ryo/Downloads/',
    last_modified: new Date(),
    cli: '',
  },
];

interface Props {}

export const Projects = (props: Props) => {
  const [projects, setProjects] = useState<ProjectData[]>(SAMPLE_PROJECTS);

  return (
    <TabPanelLayout
      title="Projects"
      buttons={
        <>
          <Flex>
            <Button borderRightRadius={0} paddingRight={6}>
              Open
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<MdArrowDropDown />}
                borderLeftRadius={0}
                paddingLeft={2}
              />
              <MenuList>
                <MenuItem>Add project from disk</MenuItem>
                <MenuItem>Add remote project</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Button>New Project</Button>
        </>
      }
    >
      <Stack paddingTop={5}>
        <Flex justifyContent="flex-end">
          <InputGroup maxWidth="350px">
            <InputLeftElement pointerEvents="none" color="gray.300">
              <MdSearch />
            </InputLeftElement>
            <Input placeholder="Search projects..." />
          </InputGroup>
        </Flex>

        <ProjectsTable projects={projects} />
      </Stack>
    </TabPanelLayout>
  );
};

export default Projects;
