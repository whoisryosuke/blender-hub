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
  MdAllInbox,
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
      <Box
        paddingTop="16"
        width={SIDEBAR_WIDTH}
        bg="blackAlpha.400"
        minHeight="calc(100vh)"
      >
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
          {/* TODO: Change to `MdCached` when queue is running - and animate rotation */}
          <SidebarTab icon={<MdAllInbox />} title="Render Queue" />
          <SidebarTab icon={<MdSdStorage />} title="Templates" />
          <SidebarTab icon={<MdBook />} title="Learn" />
        </TabList>
      </Box>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Sidebar;
