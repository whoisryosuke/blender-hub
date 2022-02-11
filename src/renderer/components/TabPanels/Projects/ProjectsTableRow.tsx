import { Tr, Td, Stack, Select, Text } from '@chakra-ui/react';
import { InstallData, ProjectData } from 'renderer/common/types';
import React, { useState } from 'react';

type Props = {
  project: ProjectData;
  installs: InstallData[];
  openProject: any;
};

const SmallText = ({ children }) => (
  <Text fontSize="sm" color="gray.500">
    {children}
  </Text>
);

export const ProjectsTableRow = ({ installs, project, openProject }: Props) => {
  const [selectedInstall, setSelectedInstall] = useState(
    installs[0].path ?? ''
  );

  const handleSelectInstall = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInstall(event.target.value);
  };

  const removeExtension = (projectPath: string) => {
    return projectPath.replace('.blend', '');
  };
  return (
    <Tr
      _hover={{
        backgroundColor: 'gray.700',
        cursor: 'pointer',
      }}
    >
      <Td
        onClick={() =>
          openProject(`${project.path}${project.filename}`, selectedInstall)
        }
      >
        <Stack>
          <Text fontWeight="bold">{removeExtension(project.filename)}</Text>
          <SmallText>{project.path}</SmallText>
        </Stack>
      </Td>
      <Td>
        <SmallText>{project.last_modified.toDateString()}</SmallText>
      </Td>
      <Td>
        <Select value={selectedInstall} onChange={handleSelectInstall}>
          {installs.map((install) => (
            <option value={install.path}>{install.version}</option>
          ))}
        </Select>
      </Td>
    </Tr>
  );
};

export default ProjectsTableRow;
