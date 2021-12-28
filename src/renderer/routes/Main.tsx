import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import { MainContent } from '../components/MainContent';
import { Providers } from '../components/Providers';
import { Sidebar } from '../components/Sidebar';
import { Tabs } from '../components/Tabs';
import theme from '../theme/theme';

export const Main = () => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Providers>
        <Tabs>
          <Sidebar />
          <MainContent />
        </Tabs>
      </Providers>
    </>
  );
};

export default Main;
