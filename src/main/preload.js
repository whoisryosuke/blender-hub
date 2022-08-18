const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  showDialog: async () => ipcRenderer.invoke('dialog:open'),
  blenderVersion: async (blenderPath) =>
    ipcRenderer.invoke('blender:version', blenderPath),
  blenderOpen: async (filePath, blenderPath) =>
    ipcRenderer.invoke('blender:open', filePath, blenderPath),
  addInstalls: async (installs) => ipcRenderer.invoke('addInstalls', installs),
  getInstalls: async () => ipcRenderer.invoke('getInstalls'),
  addProjects: async (projects) => ipcRenderer.invoke('addProjects', projects),
  getProjects: async () => ipcRenderer.invoke('getProjects'),
  removeProject: async (projectIndex) =>
    ipcRenderer.invoke('removeProject', projectIndex),
  fileOpen: async (filePath) => ipcRenderer.invoke('file:open', filePath),
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    on(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
