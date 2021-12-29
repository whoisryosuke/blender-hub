import React, { PropsWithChildren } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { InstallProvider } from 'renderer/context/InstallContext';
import theme from '../theme/theme';

interface Props {}

export const Providers = ({ children }: PropsWithChildren<Props>) => {
  return (
    <InstallProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </InstallProvider>
  );
};

export default Providers;
