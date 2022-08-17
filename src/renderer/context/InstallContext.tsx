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
  addInstalls?: (newInstalls: InstallData[]) => void;
};

export const InstallContext = createContext<InstallContextProps>({
  installs: SAMPLE_DATA,
});

type Props = any;

export const InstallProvider = ({ children }: PropsWithChildren<Props>) => {
  const [installs, setInstalls] = useState<InstallData[]>([]);

  useEffect(() => {
    const fetchStore = async () => {
      // Get installs from backend store
      const newInstalls = await window.electron.getInstalls();

      console.log('[INSTALL PROVIDER] Synced with store', newInstalls);
      if (!newInstalls) return;

      // Sync store with state/provider
      setInstalls(newInstalls);
    };
    fetchStore();
  }, []);

  const addInstalls = async (newInstalls: InstallData[]) => {
    // Add to local state
    setInstalls((prevInstall) => [...prevInstall, ...newInstalls]);

    // Sync with store
    await window.electron.addInstalls(newInstalls);
  };

  return (
    <InstallContext.Provider
      value={{
        installs,
        setInstalls,
        addInstalls,
      }}
    >
      {children}
    </InstallContext.Provider>
  );
};

export const useInstallValue = () => useContext(InstallContext);
