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

type Props = any;

export const Projects = (props: Props) => {
  const [projects, setProjects] = useState<ProjectData[]>(SAMPLE_PROJECTS);
  const [searchTerm, setSearchTerm] = useState('');

  const deleteProject = (projectId: number) => {
    setProjects((prevProjects) =>
      prevProjects.filter((_, id) => id !== projectId)
    );
    // @TODO: Sync with electron-store
  };

  const openProject = async () => {
    const newProjectPaths = await window.electron.showDialog();
    console.log('new project', newProjectPaths);
    if (!newProjectPaths.cancelled) {
      // Loop through each file
      const newProjects = new Array<ProjectData>();
      newProjectPaths.filePaths.forEach((newFilePath) => {
        // Check if it's even a Blender file
        if (newFilePath.includes('.blend')) {
          const filename = newFilePath.replace(/^.*[\\/]/, '');
          const newProjectData: ProjectData = {
            filename,
            path: newFilePath.replace(filename, ''),
            last_modified: new Date(),
            cli: '',
          };
          newProjects.push(newProjectData);
        }
      });
      if (newProjects.length > 0) {
        setProjects((prevProjects) => [...prevProjects, ...newProjects]);
      }
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.filename.includes(searchTerm)
  );

  return (
    <TabPanelLayout
      title="Projects"
      buttons={
        <>
          <Flex>
            <Button
              borderRightRadius={0}
              paddingRight={6}
              onClick={openProject}
            >
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
                <MenuItem onClick={openProject}>Add project from disk</MenuItem>
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
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>
        </Flex>

        <ProjectsTable
          projects={filteredProjects}
          deleteProject={deleteProject}
        />
      </Stack>
    </TabPanelLayout>
  );
};

export default Projects;
