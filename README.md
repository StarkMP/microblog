# Microblog

Social twitter-like fake application with REST API and authentication system based on [DummyJSON](https://dummyjson.com). Work in progress.

> DEMO: https://microblog-starkmp.vercel.app

### Requirements

- [Node.js](https://nodejs.org) v.20^

### Install packages

```sh
npm install
```

### Define variables for `.env` or `.env.development`

> Don't forget to do it. You can copy vars from `.env.example` and create new environment files.

### Build production

```sh
npm run build
```

### Run production server

```sh
npm run start
```

### Run development hot-reload server

```sh
npm run dev
```

### Development hints

#### Pre-commit checklist

- [x] Run: `npm run format`
- [x] Run: `npm run typecheck`
- [x] Run: `npm run lint`
- [x] Run: `npm run test`

#### Technology stack

- TypeScript
- Next.js v14 (app router)
- Mantine
- Redux ToolKit
- Vitest + RTL
- SCSS Modules
- Turbo

#### Versioning

`Major`**.**`Minor`**.**`Patch`

#### Commits naming pattern

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

#### Code owner

[StarkMP](https://github.com/StarkMP)
