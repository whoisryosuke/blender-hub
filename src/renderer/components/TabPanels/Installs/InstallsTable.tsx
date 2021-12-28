import React from "react";
import { VStack } from "@chakra-ui/react";
import { InstallCard } from "./InstallCard";
import { InstallData } from "./";

const INSTALL_FILTERS = {
  all: "all",
  official: "official",
  "pre-releases": "pre-releases",
};
export type InstallFilters = keyof typeof INSTALL_FILTERS;

interface Props {
  filter: InstallFilters;
  installs: InstallData[];
}

export const InstallsTable = ({ filter, installs }: Props) => {
  return (
    <VStack>
      {installs.map((install) => (
        <InstallCard {...install} />
      ))}
    </VStack>
  );
};
