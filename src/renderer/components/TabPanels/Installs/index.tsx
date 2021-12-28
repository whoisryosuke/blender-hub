import React, { useState } from 'react';
import {
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { DialogFileData, InstallData } from 'renderer/common/types';
import { TabPanelLayout } from '../TabPanelLayout';
import { InstallsTable } from './InstallsTable';

const SAMPLE_DATA: InstallData[] = [
  {
    version: '2.0',
    path: 'C:/Blender/Blender.exe',
    type: 'Release',
    tags: ['MacOS'],
  },
];

type VersionData = {
  version: InstallData['version'];
  type: InstallData['type'];
};

/**
 * Uses Blender CLI to get version
 * The CLI returns a big string with all the data (e.g.):
 * Blender 2.81 (sub 16)
        build date: 2019-12-04
        build time: 14:33:18
        build commit date: 2019-12-04
        build commit time: 11:32
        build hash: f1aa4d18d49d
        build platform: Darwin
        build type: Release
 * We have to walk through string and grab necessary chunks
 */
const getVersion = async (blenderFile: string): Promise<VersionData> => {
  // Use IPC API to query Electron's main thread and run this method
  const result = await window.electron.blenderVersion(blenderFile);

  let type = '';
  let version = '';
  // Check if it's a valid output or error
  // Should contain the word Blender if no error
  if (result.includes('Blender')) {
    // Split the string by new line and tabs
    const resultSplit = result.split('\n\t');

    // Get version from first line
    const firstLine = resultSplit[0];
    version = firstLine.replace('Blender ', '');

    // Get build type (release or beta)
    const findTerm = 'build type: ';
    const findType = resultSplit.find((resultSplitRow: string) => {
      return resultSplitRow.includes(findTerm);
    });
    if (findType) {
      type = findType.replace(findTerm, '');
    }
  }

  // Return all our parsed data
  console.log('blender version', { result, version, type });
  return {
    version,
    type,
  };
};

export const Installs = (): JSX.Element => {
  const [installs, setInstalls] = useState<InstallData[]>(SAMPLE_DATA);

  const handleNewInstall = async () => {
    console.log('window', window.electron);
    const files: DialogFileData = await window.electron.showDialog();
    console.log('user files', files);
    // Got files? Didn't cancel? Actually selected stuff?
    if (files && !files.cancelled && files.filePaths.length > 0) {
      // Organize data and add to state
      const createInstalls: Promise<InstallData>[] = files.filePaths.map(
        async (filePath) => {
          // Get version number
          const { version, type } = await getVersion(filePath);
          return {
            path: filePath,
            // @TODO: Detect version
            version,
            type,
            // @TODO: Detect user platform
            tags: ['MacOS'],
          } as InstallData;
        }
      );
      const newInstalls = await Promise.all(createInstalls);
      setInstalls((prevInstalls) => [...prevInstalls, ...newInstalls]);
    }
  };

  const buttons = (
    <>
      <Button onClick={handleNewInstall}>Add Install</Button>
    </>
  );

  return (
    <TabPanelLayout title="Installs" buttons={buttons}>
      <Tabs>
        <TabList>
          <Tab>All</Tab>
          <Tab>Official Releases</Tab>
          <Tab>Pre-releases</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <InstallsTable filter="all" installs={installs} />
          </TabPanel>
          <TabPanel>
            <InstallsTable filter="official" installs={installs} />
          </TabPanel>
          <TabPanel>
            <InstallsTable filter="pre-releases" installs={installs} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </TabPanelLayout>
  );
};

export default Installs;
