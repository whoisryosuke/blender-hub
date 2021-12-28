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
