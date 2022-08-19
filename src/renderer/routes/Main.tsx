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
      <Providers>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Tabs>
          <Sidebar />
          <MainContent />
        </Tabs>
      </Providers>
    </>
  );
};

export default Main;
