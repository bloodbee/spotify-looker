# Veesual-Spotify

Veesual-Spotify is a little project made with ReactJS, NextJS and TailwindCss.
It uses the Spotify API to look for albums depending on the user query.
It can also display more informations concerning a speicifc album.

## How to use

First download sources here : [Source](https://github.com/bloodbee/veesual-spotify/archive/refs/heads/master.zip) and extract it.

Install dependencies :
```bash
cd veesual-spotify
npm install
```

Update next.config.js file with your clientId and your clientSecret from your Spotify APP.
```js
// next.config.js
env: {
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET"
},
```


Run it
```bash
npm run dev
```

You can also build the project with :

```bash
npm run build
npm run serve
```

You can test it with :
```bash
npm run lint
npm run test
```

Any inquiries, send an email at mathieu@bloodbee.space.
