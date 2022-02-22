import { DialogFileData } from './types';

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
    };
  }
}

// window.electron = window.electron || {};
