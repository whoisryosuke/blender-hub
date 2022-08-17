import { DialogFileData, InstallData } from './types';

declare global {
  /**
   * We define all IPC APIs here to give devs auto-complete
   * use window.electron anywhere in app
   * Also note the capital "Window" here
   */
  interface Window {
    electron: {
      showDialog: () => Promise<DialogFileData>;
      blenderVersion: (blenderFile: string) => Promise<string>;
      blenderOpen: (filePath: string, blenderFile: string) => Promise<string>;
      fileOpen: (filePath: string) => Promise<string>;
      getInstalls: () => Promise<InstallData[]>;
      addInstalls: (newInstalls: InstallData[]) => Promise<void>;
    };
  }
}

// window.electron = window.electron || {};
