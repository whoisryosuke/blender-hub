# Blender Hub

Unofficial Hub app for Blender to manage your projects, templates, and multiple versions of Blender. Inspired by the [Unity Hub](https://unity.com/unity-hub) app.

## Features

- 📁 Import projects (aka `.blend` files)
- 📦 Open projects with specific Blender versions
- 📜 Create and start from templates
- 🔌 Install and manage multiple Blender versions (alpha, beta, etc)
- 🎓 Browse learning material (tutorials, videos, etc)

## Getting Started

1. `git clone https://github.com/whoisryosuke/blender-hub.git`
1. `yarn`
1. `yarn start`

### Overview

Built with Typescript, React, and Webpack (using the [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) - see those docs for more details).

Uses Chakra UI and Framer Motion for UI / visuals. You can find the app theme here: `src\renderer\theme\theme.ts`

> Make sure to read [the Electron docs](https://www.electronjs.org/docs/) to understand the app architecture ("frontend" vs "backend", IPC API, etc).

## Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

# See also

- [Blender Launcher](https://github.com/DotBow/Blender-Launcher)
