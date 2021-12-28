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
    tags: ['MacOS'],
  },
];

export const Installs = (): JSX.Element => {
  const [installs, setInstalls] = useState<InstallData[]>(SAMPLE_DATA);

  const handleNewInstall = async () => {
    const files: DialogFileData = await window.electron.showDialog();
    console.log('user files', files);
    // Got files? Didn't cancel? Actually selected stuff?
    if (files && !files.cancelled && files.filePaths.length > 0) {
      const newInstalls: InstallData[] = files.filePaths.map((filePath) => ({
        path: filePath,
        // @TODO: Detect version
        version: '2.0',
        // @TODO: Detect user platform
        tags: ['MacOS'],
      }));
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
