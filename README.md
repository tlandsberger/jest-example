This project contains code examples which demonstrate the basics about unit testing JavaScript with [Jest](https://jestjs.io/).

# Prerequisites
- You have cloned this project
- You have [Node.js v16](https://nodejs.org/en/download/) installed

# Initial setup
Once you have fulfilled the prerequisites, you are just one step away from hosting the application or running the tests. Simply run `npm install` to install the dependencies.

# Host the application
Running `npm start` will start a [static HTTP server](https://www.npmjs.com/package/http-server) and open a browser pointing to the index.html. Caching is disabled so if you make any changes to the application simply refresh your browser to pick them up.

# Run the tests
If you want Jest to run the tests just once use `npm test`. If you want to enter watch mode use `npm run test:watch`. In watch mode Jest will watch for file changes and rerun all test suites related to a change. 
