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
import React, { useEffect, useState } from 'react';
import { MdArrowDropDown, MdSearch } from 'react-icons/md';
import { ProjectFrontendData } from 'renderer/common/types';
import { useInstallValue } from 'renderer/context/InstallContext';
import ProjectsTable from './Projects/ProjectsTable';
import { TabPanelLayout } from './TabPanelLayout';

const SAMPLE_PROJECTS: ProjectFrontendData[] = [
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
  const [projects, setProjects] = useState<ProjectFrontendData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { installs } = useInstallValue();

  // On initial component mount, hydrate state with store data
  useEffect(() => {
    const fetchStore = async () => {
      // Get installs from backend store
      const newProjects = await window.electron.getProjects();

      console.log('[PROJECTS] Synced with store', newProjects);
      if (!newProjects) return;

      // Backend doesn't support Dates so we gotta parse em back to life
      const parsedProjects = newProjects.map((newProject) => ({
        ...newProject,
        last_modified: new Date(newProject.last_modified),
      }));

      // Sync store with state/provider
      setProjects(parsedProjects);
    };
    fetchStore();
  }, []);

  const deleteProject = (projectId: number) => {
    setProjects((prevProjects) =>
      prevProjects.filter((_, id) => id !== projectId)
    );
    // Sync with backend store
    window.electron.removeProject(projectId);
  };

  const openProject = async () => {
    // Open "open file" dialog
    const newProjectPaths = await window.electron.showDialog();
    console.log('new project', newProjectPaths);

    if (!newProjectPaths.cancelled) {
      // Loop through each file
      const newProjects = new Array<ProjectFrontendData>();
      newProjectPaths.filePaths.forEach((newFilePath) => {
        // Check if it's even a Blender file
        if (newFilePath.includes('.blend')) {
          // Generate new file
          const filename = newFilePath.replace(/^.*[\\/]/, '');
          const newProjectData: ProjectFrontendData = {
            filename,
            path: newFilePath.replace(filename, ''),
            last_modified: new Date(),
            cli: '',
          };
          newProjects.push(newProjectData);
        }
      });
      if (newProjects.length > 0) {
        // Update app state
        setProjects((prevProjects) => [...prevProjects, ...newProjects]);

        // Update backend store
        // Backend doesn't support Dates so we stringify them
        const backendProjects = newProjects.map((newProject) => ({
          ...newProject,
          last_modified: newProject.last_modified.toString(),
        }));
        window.electron.addProjects(backendProjects);
      }
    }
  };

  // Syncs input field with search state
  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  //
  const openBlenderVersion = (blenderPath: string) => {
    window.electron.blenderOpen(blenderPath, '');
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
          <Flex>
            <Button borderRightRadius={0} paddingRight={6}>
              New Project
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<MdArrowDropDown />}
                borderLeftRadius={0}
                paddingLeft={2}
              />
              <MenuList>
                {!installs ||
                  (installs.length <= 0 && (
                    <MenuItem>Add a Blender install...</MenuItem>
                  ))}
                {installs.map((install) => (
                  <MenuItem
                    key={install.version}
                    onClick={() => openBlenderVersion(install.path)}
                  >
                    {install.version}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
        </>
      }
    >
      <Stack paddingTop={5} gap={3}>
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
