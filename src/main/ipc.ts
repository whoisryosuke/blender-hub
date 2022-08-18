import { shell, ipcMain, dialog } from 'electron';
import { InstallData, ProjectBackendData } from 'renderer/common/types';
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

  ipcMain.handle('addInstalls', async (_, newInstalls: InstallData[]) => {
    const prevInstalls = store.get(STORE_KEYS.INSTALLS);
    const installs = prevInstalls ?? [];
    store.set(STORE_KEYS.INSTALLS, [...installs, ...newInstalls]);
  });

  ipcMain.handle('getInstalls', async () => {
    const prevInstalls = store.get(STORE_KEYS.INSTALLS);
    console.log('[STORE] Got installs', prevInstalls);
    return prevInstalls;
  });

  ipcMain.handle('getProjects', async () => {
    const prevProjects = store.get(STORE_KEYS.PROJECTS);
    return prevProjects;
  });

  ipcMain.handle(
    'addProjects',
    async (_, newProjects: ProjectBackendData[]) => {
      const prevProjects = store.get(STORE_KEYS.PROJECTS);
      const projects = prevProjects ?? [];
      console.log('[STORE] Adding new projects', newProjects);
      store.set(STORE_KEYS.PROJECTS, [...projects, ...newProjects]);
    }
  );

  /**
   * Converts Blender file path to Mac-friendly executable
   * Blender CLI works with .exe, but needs changing for .app
   * @see: https://docs.blender.org/manual/en/latest/advanced/command_line/launch/macos.html
   */
  const checkMacBlender = (blenderPath: string) => {
    let newPath = blenderPath;
    if (blenderPath.includes('.app')) {
      newPath = `${newPath}/Contents/MacOS/Blender`;
    }
    if (blenderPath.includes('.exe')) {
      newPath = newPath.replace('.exe.', '');
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
    const isWindows = blenderPath.includes('.exe');
    let result;
    if (filePath && blenderPath) {
      const blenderExecutable = checkMacBlender(blenderPath);
      // If MacOS, we need to change path to make executable
      const openFileCommand = `"${blenderExecutable}" "${filePath}"`;
      let platformFileCommand = `${openFileCommand}`;
      // For Windows, Blender opens a shell window with debug console
      // Because of this, we need to launch a new shell window and run commmand there
      // Otherwise Node will try and run process and crash
      if (isWindows)
        platformFileCommand = `start cmd.exe /K "${openFileCommand}"`;

      result = execSync(platformFileCommand).toString();
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
