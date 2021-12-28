export const TAGS = {
  Android: 'Android',
  MacOS: 'MacOS',
  Windows: 'Windows',
};
export type TagsEnum = keyof typeof TAGS;

export type InstallData = {
  /**
   * Version of app
   */
  version: string;
  /**
   * Path to Blender on computer
   */
  path: string;
  /**
   * Is it Release, Beta, etc?
   */
  type: string;
  /**
   * Maybe not needed? Maybe if versions have modules others don't?
   */
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
