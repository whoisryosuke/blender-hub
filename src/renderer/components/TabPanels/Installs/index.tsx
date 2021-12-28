import React, { useState } from "react";
import { TabPanelLayout } from "../TabPanelLayout";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { InstallsTable } from "./InstallsTable";

export const TAGS = {
  Android: "Android",
  MacOS: "MacOS",
  Windows: "Windows",
};
export type TagsEnum = keyof typeof TAGS;

export type InstallData = {
  version: string;
  path: string;
  tags: TagsEnum[];
};

const SAMPLE_DATA: InstallData[] = [
  {
    version: "2.0",
    path: "C:/Blender/Blender.exe",
    tags: ["MacOS"],
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
