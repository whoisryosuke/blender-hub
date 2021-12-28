import React from "react";
import { Box, Button, Divider, TabList, Tab } from "@chakra-ui/react";
import { SidebarTab } from "./SidebarTab";

const SIDEBAR_WIDTH = "250px";

export const Sidebar = (): JSX.Element => {
  return (
    <Box paddingTop={"16"} width={SIDEBAR_WIDTH}>
      <Button>Preferences</Button>
      <Divider />
      <TabList width={SIDEBAR_WIDTH}>
        <SidebarTab icon="test" title="Projects" />
        <SidebarTab icon="test" title="Installs" />
      </TabList>
    </Box>
  );
};
