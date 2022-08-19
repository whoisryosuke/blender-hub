import React from 'react';
import { ProjectFrontendData } from 'renderer/common/types';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Stack,
  Select,
} from '@chakra-ui/react';
import { useInstallValue } from 'renderer/context/InstallContext';
import { ProjectsTableRow } from './ProjectsTableRow';

type Props = {
  projects: ProjectFrontendData[];
  deleteProject: any;
};

const ProjectsTable = ({ projects, deleteProject, ...props }: Props) => {
  const { installs } = useInstallValue();

  const openProject = (projectPath: string, blenderPath: string) => {
    console.log('opening project', projectPath, blenderPath);
    window.electron.blenderOpen(projectPath, blenderPath);
  };

  console.log('projects', projects);
  return (
    <Table variant="simple" {...props}>
      <Thead
        bg="blackAlpha.300"
        // borderTop="1px solid"
        // borderLeft="1px solid"
        // borderRight="1px solid"
        // borderColor="whiteAlpha.200"
      >
        <Tr>
          <Th>Name</Th>
          <Th>Modified</Th>
          <Th>Editor Version</Th>
        </Tr>
      </Thead>
      <Tbody>
        {projects.map((project, index) => (
          <ProjectsTableRow
            key={project.filename}
            id={index}
            project={project}
            installs={installs}
            openProject={openProject}
            deleteProject={deleteProject}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default ProjectsTable;
