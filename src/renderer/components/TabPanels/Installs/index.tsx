import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { InstallData } from 'renderer/common/types';
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

  return (
    <TabPanelLayout title="Installs">
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
