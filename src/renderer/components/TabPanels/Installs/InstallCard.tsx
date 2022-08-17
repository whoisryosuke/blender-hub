import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { FiTool, FiBox } from 'react-icons/fi';
import { InstallData } from 'renderer/common/types';
import { Tag } from 'renderer/components/Tag';

type Props = InstallData;

const CARD_PADDING = '3';

export const InstallCard = ({ version, path, tags }: Props) => {
  return (
    <Flex width="100%" borderColor="white" borderWidth="1px" borderRadius="8">
      <Box width="50px" p={CARD_PADDING}>
        <Icon as={FiBox} width={6} height={6} />
      </Box>
      <VStack flex="1" alignItems="left" bg="gray.900" p={CARD_PADDING}>
        <Heading size="sm">{version}</Heading>
        <Text opacity="0.7" size="xs">
          {path}
        </Text>
        <HStack>
          {tags?.map((tag) => (
            <Tag key={tag} title={tag} />
          ))}
        </HStack>
      </VStack>
      <Box width="50px" bg="gray.900" borderRadius="8" p={CARD_PADDING}>
        <IconButton
          as={FiTool}
          aria-label="App Preferences"
          variant="ghost"
          size="xs"
        />
      </Box>
    </Flex>
  );
};

export default InstallCard;
