import React from 'react';
import { ProjectData } from 'renderer/common/types';
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
  projects: ProjectData[];
};

const ProjectsTable = ({ projects }: Props) => {
  const { installs } = useInstallValue();

  const openProject = (projectPath: string, blenderPath: string) => {
    console.log('opening project', projectPath, blenderPath);
    window.electron.blenderOpen(projectPath, blenderPath);
  };

  console.log('projects', projects);
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Modified</Th>
          <Th>Editor Version</Th>
        </Tr>
      </Thead>
      <Tbody>
        {projects.map((project) => (
          <ProjectsTableRow
            project={project}
            installs={installs}
            openProject={openProject}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default ProjectsTable;
