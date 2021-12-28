import React, { PropsWithChildren } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";

interface Props {}

export const Providers = ({ children }: PropsWithChildren<Props>) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Providers;
