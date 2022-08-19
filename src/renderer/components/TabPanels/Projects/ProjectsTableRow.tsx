import { HStack, Tr, Td, Stack, Select, Text } from '@chakra-ui/react';
import { InstallData, ProjectFrontendData } from 'renderer/common/types';
import React, { PropsWithChildren, useState } from 'react';
import ProjectsTableRowDropdown from './ProjectsTableRowDropdown';

type SmallTextProps = any;

const SmallText = ({ children }: PropsWithChildren<SmallTextProps>) => (
  <Text fontSize="sm" color="gray.500">
    {children}
  </Text>
);

type Props = {
  project: ProjectFrontendData;
  installs: InstallData[];
  id: number;
  openProject: any;
  deleteProject: any;
};

export const ProjectsTableRow = ({
  installs,
  project,
  openProject,
  deleteProject,
  id,
}: Props) => {
  const [selectedInstall, setSelectedInstall] = useState(
    installs?.[0]?.path ?? ''
  );

  const handleSelectInstall = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedInstall(event.target.value);
  };

  const removeExtension = (projectPath: string) => {
    return projectPath.replace('.blend', '');
  };

  const fullFilePath = `${project.path}${project.filename}`;
  const cleanName = removeExtension(project.filename);
  const currentInstall = installs.find(
    (install) => install.path === selectedInstall
  );
  return (
    <Tr
      _hover={{
        backgroundColor: 'gray.700',
        cursor: 'pointer',
      }}
    >
      <Td
        onClick={() => openProject(fullFilePath, selectedInstall)}
        title={`Open ${cleanName} in Blender ${currentInstall?.version}`}
      >
        <Stack>
          <Text fontWeight="bold">{cleanName}</Text>
          <SmallText>{project.path}</SmallText>
        </Stack>
      </Td>
      <Td>
        <SmallText>{project.last_modified.toDateString()}</SmallText>
      </Td>
      <Td>
        <HStack gap={2}>
          <Select value={selectedInstall} onChange={handleSelectInstall}>
            {installs.map((install) => (
              <option key={install.path} value={install.path}>
                {install.version}
              </option>
            ))}
          </Select>
          <ProjectsTableRowDropdown
            id={id}
            filePath={fullFilePath}
            deleteProject={deleteProject}
          />
        </HStack>
      </Td>
    </Tr>
  );
};

export default ProjectsTableRow;
