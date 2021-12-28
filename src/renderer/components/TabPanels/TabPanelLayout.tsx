import React, { PropsWithChildren } from "react";
import { Box, Flex, Heading, HStack } from "@chakra-ui/react";

interface Props {
  title: string;
  buttons?: JSX.Element;
}

export const TabPanelLayout = ({
  title,
  buttons,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Box>
      <Flex justifyContent="space-between">
        <Heading>{title}</Heading>
        <HStack>{buttons}</HStack>
      </Flex>
      {children}
    </Box>
  );
};
