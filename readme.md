# Web debugger frontend

## Info

This is connects to a [socket.io](https://socket.io/) server which currently is online under: http://159.89.110.19:3001/
If for some reason this is no longer the case you can find the server in this organisation under [web-debugger-backend](https://github.com/ar-marco-polo/web-debugger-backend)

## Setup

This is a [node.js](https://nodejs.org/en/) project so you need node and [npm](https://www.npmjs.com/) installed. Then you can run:

``` bash
npm install
```

## Develop

### Run
``` bash
npm run dev   # runs in dev mode with hot reloading
              # at: `http://localhost:8080/`
npm run build # builds app and stores it in '/dst'
```
