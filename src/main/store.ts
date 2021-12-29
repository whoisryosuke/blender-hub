import Store from 'electron-store';
import { JSONSchemaType } from 'ajv';
import { InstallData } from 'renderer/common/types';

export type SchemaType = {
  installs: InstallData[];
};

const schema: JSONSchemaType<SchemaType> = {
  type: 'object',
  properties: {
    installs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          version: { type: 'string' },
          path: { type: 'string' },
          type: { type: 'string' },
          tags: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        required: ['path', 'tags', 'type', 'version'],
      },
    },
  },
  required: ['installs'],
};

export const STORE_KEYS: { [key: string]: keyof SchemaType } = {
  INSTALLS: 'installs',
  // PREFERENCES: 'preferences',
  // PROJECTS: 'projects',
};

// Not sure why this isn't accepting. But get/set methods return proper types so...
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const store = new Store<SchemaType>({ schema });

export default store;
