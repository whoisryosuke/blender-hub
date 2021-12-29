import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from 'react';
import { InstallData } from 'renderer/common/types';

const SAMPLE_DATA: InstallData[] = [
  {
    version: '2.0',
    path: 'C:/Blender/Blender.exe',
    type: 'Release',
    tags: ['MacOS'],
  },
];

type InstallContextProps = {
  installs: InstallData[];
  setInstalls?: Dispatch<SetStateAction<InstallData[]>>;
  addInstall?: (loginData: InstallData) => void;
};

export const InstallContext = createContext<InstallContextProps>({
  installs: SAMPLE_DATA,
});

interface Props {}

export const InstallProvider = ({ children }: PropsWithChildren<Props>) => {
  const [installs, setInstalls] = useState<InstallData[]>(SAMPLE_DATA);

  const addInstall = (loginData: InstallData) => {
    setInstalls((prevInstall) => ({
      ...prevInstall,
      loggedIn: true,
    }));
  };

  return (
    <InstallContext.Provider
      value={{
        installs,
        setInstalls,
        addInstall,
      }}
    >
      {children}
    </InstallContext.Provider>
  );
};

export const useInstallValue = () => useContext(InstallContext);
