import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  FormControl,
  Switch,
  FormLabel,
  useColorMode,
  Stack,
} from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose: any;
};

const SettingsModal = ({ isOpen, onClose }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSave = () => {
    // Save to store using IPC
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack gap={1}>
            {/* Apperance */}
            <section>
              <Heading size="sm" mb={2}>
                Appearance
              </Heading>

              {/* Light/dark toggle */}
              <FormControl display="flex">
                <FormLabel flex={1} fontWeight="normal">
                  Theme (Light / Dark)
                </FormLabel>
                <Switch
                  isChecked={colorMode !== 'light'}
                  onChange={toggleColorMode}
                />
              </FormControl>
            </section>

            {/* Project Defaults */}
            <section>
              <Heading size="sm">Project Defaults</Heading>
            </section>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
