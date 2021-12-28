export const TAGS = {
  Android: 'Android',
  MacOS: 'MacOS',
  Windows: 'Windows',
};
export type TagsEnum = keyof typeof TAGS;

export type InstallData = {
  version: string;
  path: string;
  tags: TagsEnum[];
};

/**
 * Returned from the Electron Dialog API `showOpenDialog`
 * @see: https://www.electronjs.org/docs/latest/api/dialog
 */
export type DialogFileData = {
  /**
   * Did user cancel dialog?
   */
  cancelled: boolean;
  /**
   * Array of file paths that user selected
   */
  filePaths: string[];
};
