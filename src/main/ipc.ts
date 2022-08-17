import { shell, ipcMain, dialog } from 'electron';
import { InstallData, ProjectData } from 'renderer/common/types';
import { execSync } from 'child_process';
import store, { STORE_KEYS } from './store';

const init = () => {
  /**
   * IPC API
   * This is where we use native/server-side platform APIs (like NodeJS modules)
   */

  ipcMain.on('ipc-example', async (event, arg) => {
    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log(msgTemplate(arg));
    event.reply('ipc-example', msgTemplate('pong'));
  });

  ipcMain.handle('dialog:open', async (_, args) => {
    const result = await dialog.showOpenDialog({ properties: ['openFile'] });
    return result;
  });

  ipcMain.handle('store:installs', async (_, newInstall: InstallData) => {
    const prevInstalls = store.get(STORE_KEYS.INSTALLS);
    store.set(STORE_KEYS.INSTALLS, [...prevInstalls, newInstall]);
    const result = await dialog.showOpenDialog({ properties: ['openFile'] });
    return result;
  });

  ipcMain.handle('store:projects', async (_, newInstall: ProjectData) => {
    const prevInstalls = store.get(STORE_KEYS.PROJECTS);
    store.set(STORE_KEYS.PROJECZTS, [...prevInstalls, newInstall]);
  });

  /**
   * Blender CLI works with .exe, but needs changing for .app
   * @see: https://docs.blender.org/manual/en/latest/advanced/command_line/launch/macos.html
   */
  const checkMacBlender = (blenderPath: string) => {
    let newPath = blenderPath;
    if (blenderPath.includes('.app')) {
      newPath = `${newPath}/Contents/MacOS/Blender`;
    }
    return newPath;
  };

  ipcMain.handle('blender:version', async (_, args) => {
    console.log('running cli', _, args);
    let result;
    if (args) {
      const blenderExecutable = checkMacBlender(args);
      // If MacOS, we need to change path to make executable
      const checkVersionCommand = `"${blenderExecutable}" -v`;

      result = execSync(checkVersionCommand).toString();
    }
    return result;
  });

  ipcMain.handle('blender:open', async (_, filePath, blenderPath) => {
    console.log('running blender open', _, filePath, blenderPath);
    let result;
    if (filePath && blenderPath) {
      const blenderExecutable = checkMacBlender(blenderPath);
      // If MacOS, we need to change path to make executable
      const openFileCommand = `${blenderExecutable} ${filePath}`;

      result = execSync(openFileCommand).toString();
    }
    return result;
  });

  // File Explorer
  ipcMain.handle('file:open', async (_, filePath) => {
    console.log('running folder open', _, filePath);
    let result;
    if (filePath) {
      // @TODO: maybe try/catch?
      shell.showItemInFolder(filePath);
    }
    return true;
  });
};

export default {
  init,
};
