# Tab tracker

> A Vue.js & Node.js(v.10) project with ( Express.js, Passport.js, Vue-router, Vuex, Vuetify)

## Build Setup

``` bash
# first what you need - start the server. go to the /server folder
cd ./server

# install package dependencies
npm install

# rename .env.example to .env and pass in this file settings
mv .env.example .env

# create seed in database
npm run seed
#after seeds create a cuple test songs and test user 
email: test@gmail.com
password: 123456789

# now we can start the server
npm run start

# after server started
cd ../client

# install package dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
