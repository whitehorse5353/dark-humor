# My Application

A basic structure of a web application for web developers to develop upon and show their skills.

### Please DO NOT mention any Company or Individual names in code, when forking, committing, branching, developing or completing the exercise.

# Get Started

- Fork this repo
- Clone your repo

## Install dependancies
```
npm install
``` 
Install step in turn does installs the api dependancies and sql setup and migration/seeding with frontend bundling

## Start application and server
```
npm start
```

## Which Browsers/Devices or Virtualisation services did you check the application in?
- Tested in chrome and safari with different screen sizes

## Anything you want to tell us?
- Assumptions?
  - I have created a `npm scripts` to cover most part of the initial application bootstrapping. If in case that didn't work as expected I would recommend to use below steps.
  - There are two major directories `client` front-end assets and `api` backend assets
  - Please run `npm install` `client` and `api` directory individually
  - Run client build on the root directory using `npm run build`
  - Then run `npm start` will bootstrap the app on `http://localhost:3001`
  - Just included `.env` to avoid any confusion of environment properties
  
- Decisions?
  - DUE TO TIME CONSTRAINS I DIDN'T WRITE ANY TEST CASES FOR BOTH BACKEND/FRONTEND (I know it's excuse though)
- What you used to develop and test?
  - I chose to use sql lite for api
  - Used `vite` for front-end tooling, just to keep the builds faster and simple to incorporate
  - Frontend app is built using react hooks
  - Backend api built using basic express to keep it simple

## What did you think of this test/exercise?
### What did you like?
1.As a whole carting apps are better to explore all possibilities of web development

### What could be improved?
1.For sure testing (unit, integeration, e2e testings)
2.API documentation(swagger)
3.API testing(performance/unit/contract testing)

### What didn't you like?
1.N/A
