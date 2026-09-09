# AI maintenance guide

This repository is maintained with automated coding agents. Keep every change reproducible from a clean checkout and make failures visible in local output and GitHub Actions.

## Supported environment

- Use Node.js 22 or 24 and npm.
- The main package and `ssr-test` must use `https://registry.npmjs.org/` from their checked-in `.npmrc` files.
- Never commit private registry URLs, credentials, generated packages, or authentication tokens.

## Setup and verification

Install the main dependencies:

```sh
npm ci --ignore-scripts
```

Run the complete release-equivalent verification before opening a pull request:

```sh
npm run verify
```

The verification command runs unit tests, lint, the library build, the browser demo build, the SSR fixture build, and an npm package dry run. A change is not complete until this command succeeds.

`npm run audit:critical` checks both dependency trees against the public npm
advisory service and is part of `verify` and CI. It requires network access and
fails on critical advisories; lower severities remain a tracked maintenance
backlog. Resolve failures from their dependency paths, without force-upgrading
unrelated toolchains or weakening the audit threshold.

For a focused change, run the smallest relevant command while iterating, then finish with `npm run verify`:

- `npm test -- --runInBand`: unit tests and coverage.
- `npm run lint`: TypeScript lint checks.
- `npm run build`: distributable JavaScript and declarations.
- `npm run doc`: production browser demo in `pages-build/`.
- `npm run build:ssr`: clean install and client build for the SSR fixture.

## Observable environments

Start the interactive browser demo:

```sh
npm start
```

Open `http://127.0.0.1:8001/` and exercise opening, closing, navigation, zoom, rotation, scaling, download, keyboard controls, and inline-container behavior relevant to the change.

Start the server-rendered fixture after building the library:

```sh
npm run build
npm run build:ssr
npm --prefix ssr-test start
```

Open `http://127.0.0.1:8005/`. Confirm that the initial HTML is server-rendered and that the viewer becomes interactive after client hydration.

## Releases and GitHub Pages

Publishing a GitHub Release triggers `.github/workflows/pages.yml`. The workflow
builds the demo from the released tag and deploys `pages-build/` through GitHub
Pages. After each release, wait for the Pages workflow and verify
<https://infeng.github.io/react-viewer/> before considering the release complete.

## Code map

- `src/Viewer.tsx`: portal/container lifecycle.
- `src/ViewerCore.tsx`: viewer state, actions, body styles, keyboard and wheel events.
- `src/ViewerCanvas.tsx`: image rendering, loading, drag and resize behavior.
- `src/ViewerToolbar.tsx` and `src/ViewerNav.tsx`: controls and navigation.
- `src/__tests__/viewer.test.tsx`: regression suite.
- `demo/`: interactive browser fixture.
- `ssr-test/`: server-rendering and hydration fixture.

## Change discipline

- The legacy development-only `request` dependency pins vulnerable `form-data`
  2.3.x. The scoped npm override selects 2.5.6 to fix predictable multipart
  boundaries (GHSA-fjxv-7rqg-78g4) and the follow-up boundary advisory
  GHSA-hmw2-7cc7-3qxx. `npm run check:multipart` verifies boundary generation
  and a real local text/binary upload through `request`; it runs in `verify`
  and CI. Keep the override until the parent dependency is retired or accepts
  a patched version itself.
- Add a regression test for every bug fix when practical.
- Keep unrelated dependency upgrades and behavior changes in separate pull requests.
- Preserve the public API unless the change is intentionally versioned as breaking.
- Do not edit generated `dist/`, `lib/`, `coverage/`, `pages-build/`, or `ssr-test/client-dist/` output by hand.
- Do not publish npm versions, create releases, or close community reports without explicit maintainer authorization.
- In the pull request, link the issue, explain the observable behavior, and list the verification commands that passed.
