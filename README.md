# Fin-Social | A Financial Social Network

A Social Network For The Common Person Aimed At Augmenting Financial Literacy.

## What Is Fin-Social

Fin-Social is a social network aimed at educating millenials specifically on topics relating to personal finance, investment methods, trading algorithms, computational trading techniques, stock analysis, real estate investments, bonds, currencies, crypto-currencies, and various other complex financial products.

Fin-Social allows users to communicate amongst one another, share insights specific to the markets, display personal financial research done specific to some industry or product group, and enhance user domain knowledge with the hope of creating a better educated set of indivuals with respect to the world of finances.

To view the current prototype [click here](http://calm-beach-77261.herokuapp.com/)

* [Runnin The App on One's Local Developemnt Server](#running-the-app) – How to run the application.

Fin-Social works on macOS, Windows, and Linux.<br>
If something doesn’t work, please [file an issue](https://github.com/yoanyomba123/Smart-Network-Developmet/issues/new).

Note: This application is built with the MERN Stack

## Quick Overview

```sh
git clone https://github.com/yoanyomba123/Smart-Network-Developmet.git
cd Smart-Network-Development
npm install package.json
npm run client-install
npm run app
```

Then open [http://localhost:3000/](http://localhost:3000/) to see the app on your local server.<br>

### Get Started Immediately

You **don’t** need to install or configure tools like Webpack or Babel.<br>
They are preconfigured through the create-react-app library and hidden so that you can focus on the code.

## Running The App

**You’ll need to have Node >= 6 on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

To run the app, run a single command:

```sh
npm run app
```

## App Structure - Client

client directory - `client` .<br>
Inside that directory, a project structure is present as well as dependencies

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   └── favicon.ico
│   └── index.html
│   └── manifest.json
└── src
    └── App.css
    └── App.js
    └── App.test.js
    └── index.css
    └── index.js
    └── logo.svg
    └── registerServiceWorker.js
```

No configuration or complicated folder structures, just the files you need to build your app.<br>

```sh
cd client
```

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
By default, it also [includes a service worker](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app) so that the app loads from local cache on future visits.

## App Structure - Server

Server directory - `Smart-Network-Development` .<br>
Inside that directory, a project structure is present as well as dependencies

```
Smart-Network-Development
├── README.md
├── client
├── config
    └── config.js
    └── passport.js
├── model
    └── Comments.js
    └── Post.js
    └── Profile.js
    └── User.js
├── node_modules
├── model
    └── api
        └── post.route.js
        └── profile.route.js
        └── users.route.js
├── validation
    └── education.js
    └── experience.js
    └── honor.js
    └── isEmpty.js
    └── login.js
    └── post.js
    └── profile.js
    └── projects.js
    └── register.js
    └── volunteer.js
├── package.json
├── .gitignore
├── server.js
```

No configuration or complicated folder structures, just the files you need to build your app.<br>

to view all files

```sh
ls
```

Inside the newly created project, you can run some built-in commands:

### `npm run dev` or `npm start`

Runs the backend in development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

### `npm run app`

Runs the backend and frontend in development mode.<br>
Open [http://localhost:5000](http://localhost:5000) and [http://localhost:3000](http://localhost:3000) to view both instances in the browser.

## What’s Included?

This environment has everything we need to interact with a modern React Application:

* React, JSX, ES6, and Flow syntax support.
* Language extras beyond ES6 like the object spread operator.
* Autoprefixed CSS, so you don’t need `-webkit-` or other prefixes.
* A fast interactive unit test runner with built-in support for coverage reporting.
* A live development server that warns about common mistakes.
* A build script to bundle JS, CSS, and images for production, with hashes and sourcemaps.
* An offline-first [service worker](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) and a [web app manifest](https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/), meeting all the [Progressive Web App](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#making-a-progressive-web-app) criteria.
* Hassle-free updates for the above tools with a single dependency.

Check out [this guide](https://github.com/nitishdayal/cra_closer_look) for an overview of how these tools fit together.

The tradeoff is that **these tools are preconfigured to work in a specific way**. I

## Acknowledgements

Grateful to the following individuals for their aid throughout the development process

* [@seankirklan](https://github.com/Kirkland22)
* [@dagmawimulugeta](https://github.com/dagmawim)

## License

Fin-Social is designed with the hope of eventually being an open source software [licensed as MIT](https://github.com/facebook/create-react-app/blob/master/LICENSE).
