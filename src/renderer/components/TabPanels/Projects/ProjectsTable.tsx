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

type Props = {
  projects: ProjectData[];
};

const SmallText = ({ children }) => (
  <Text fontSize="sm" color="gray.500">
    {children}
  </Text>
);

const ProjectsTable = ({ projects }: Props) => {
  const { installs } = useInstallValue();

  const openProject = (project: ProjectData) => {
    console.log('opening project', project);
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
          <Tr
            _hover={{
              backgroundColor: 'gray.700',
              cursor: 'pointer',
            }}
            onClick={() => openProject(project)}
          >
            <Td>
              <Stack>
                <Text fontWeight="bold">{project.filename}</Text>
                <SmallText>{project.path}</SmallText>
              </Stack>
            </Td>
            <Td>
              <SmallText>{project.last_modified.toDateString()}</SmallText>
            </Td>
            <Td>
              <Select>
                {installs.map((install) => (
                  <option value={install.path}>{install.version}</option>
                ))}
              </Select>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ProjectsTable;
