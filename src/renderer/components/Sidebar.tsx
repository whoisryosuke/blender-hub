import React from 'react';
import {
  Box,
  Button,
  Divider,
  TabList,
  Tab,
  IconButton,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import {
  MdSettings,
  MdSource,
  MdWork,
  MdFolder,
  MdStorage,
  MdSdStorage,
  MdBook,
} from 'react-icons/md';
import { SidebarTab } from './SidebarTab';
import SettingsModal from './Modals/Settings/Settings';

const SIDEBAR_WIDTH = '250px';

export const Sidebar = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box paddingTop="16" width={SIDEBAR_WIDTH}>
        <Flex justifyContent="space-between">
          <div id="avatar-placeholder" />
          <IconButton
            aria-label="Settings"
            icon={<MdSettings />}
            variant="ghost"
            onClick={onOpen}
          />
        </Flex>
        <Divider />
        <TabList width={SIDEBAR_WIDTH}>
          <SidebarTab icon={<MdSource />} title="Projects" />
          <SidebarTab icon={<MdStorage />} title="Installs" />
          <SidebarTab icon={<MdSdStorage />} title="Templates" />
          <SidebarTab icon={<MdBook />} title="Learn" />
        </TabList>
      </Box>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Sidebar;
