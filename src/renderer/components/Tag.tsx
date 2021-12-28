import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface Props {
  title: string;
}

export const Tag = ({ title }: Props) => {
  return (
    <Box borderColor="white" borderWidth="1px" borderRadius="8" px={2} py={1}>
      <Text fontSize="xs">{title}</Text>
    </Box>
  );
};
