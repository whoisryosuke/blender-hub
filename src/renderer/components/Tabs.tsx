import React, { PropsWithChildren } from "react";
import { Tabs as ChakraTabs } from "@chakra-ui/react";

interface Props {}

export const Tabs = ({ children }: PropsWithChildren<Props>) => {
  return (
    <ChakraTabs isLazy orientation="vertical">
      {children}
    </ChakraTabs>
  );
};
