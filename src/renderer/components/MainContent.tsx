import React from "react";
import { TabPanels as ChakraTabPanels, TabPanel } from "@chakra-ui/react";
import { Projects } from "./TabPanels/Projects";
import { Installs } from "./TabPanels/Installs";

interface Props {}

export const MainContent = (props: Props) => {
  return (
    <ChakraTabPanels>
      <TabPanel>
        <Projects />
      </TabPanel>
      <TabPanel>
        <Installs />
      </TabPanel>
    </ChakraTabPanels>
  );
};
