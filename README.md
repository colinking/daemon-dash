# Boilerplate Tasks

[![Build Status](https://travis-ci.com/MrPickles/boilerplate.svg?token=HL4GfADW1tek1pK4Skh9&branch=master)](https://travis-ci.com/MrPickles/boilerplate)

Below are goals that I want in this boilerplate repo's functionality.

## Server Code
- [x] Server code should be fully supported ES6 through [Babel](https://babeljs.io/).
- [x] Server code in dev should ideally be compiled on the fly for easier debugging.

## Client Code
- [ ] Client code in development should be in its native form as much as possible for easier debugging.
- [x] The client-side JS should fully support [JSX](https://jsx.github.io/) syntax.
- [x] The client-side HTML should fully support [Jade/Pug](https://pugjs.org/api/getting-started.html) (debateable).
- [ ] The client-side CSS should fully support [SASS](http://sass-lang.com/) syntax.

## Webpack, Build System, and Deploy
- [x] Webpack server scripts should build ES6 server code.
- [ ] Webpack client scripts should build ES6/JSX/SASS code.
- [x] The build scripts should have a watch option to rebuild automatically on file change.
- [ ] The build output should have a meaningful directory organization (if applicable).
- [ ] Minify client-side JS (e.g. [UglifyJS](https://github.com/mishoo/UglifyJS2)) in prod (but not dev) if possible.
- [x] Have an automatic deploy (via [Heroku](https://www.heroku.com/) or some similar means).

## Testing Code
- [ ] Any testing code should not have friction with the build system. For instance, it should be ES6 and work with Babel.
- [ ] Test code should be able to be in the same directory as the code it tests, not just a universal `test/` directory.
- [x] Have continuous integration for testing (e.g. [TravisCI](https://travis-ci.com/)).

## Linting
- [x] Include a static linter (e.g. [ESLint](http://eslint.org/)).
- [x] Use a linting configuration (`.eslintrc`) with good standards ([Airbnb](https://www.npmjs.com/package/eslint-config-airbnb)).
- [ ] It would be nice to have lint errors prevent commits from registering.

## Database
- [ ] Add [MongoDB](https://www.mongodb.com/) support via [Mongoose](http://mongoosejs.com/) (lol).
- [ ] Include some database boilerplate code (e.g. schemas).

## Miscelaneous
- [ ] Organize the directory structure of the repo to be more scalable/neat.
- [ ] All runtime errors (testing, server, client) should be clearly labelled (e.g. line numbers and code) in dev.
- [ ] A dev/debugging panel would be a nice luxury for development.
- [ ] Add environment and/or general configuration files/directory.
- [ ] Migrate this task list to be separate issues as this codebase matures.
