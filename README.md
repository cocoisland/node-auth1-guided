# Node Session Auth 1 Guided Project using express-session and pass session id from server to client in cookie

Guided project for **Node Auth 1** Module.

Pro: server can terminate session to enforce client logout by removing session cookie.

Con: servers can not scale up horizontally because each session cookie is tied to each particular server and can not be shared across servers.

## Prerequisites

- [SQLite Studio](https://sqlitestudio.pl/index.rvt?act=download) installed.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type `npm i` to download dependencies.
- [ ] type `npm run server` to start the API.

Please follow along as the instructor adds authentication to the API.
