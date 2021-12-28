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
    };
  }
}

// window.electron = window.electron || {};
