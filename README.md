# Boilerplate Tasks

Below are goals that I want in this boilerplate repo's functionality.

## Server Code
- [ ] Server code should be fully supported ES6 through Babel.
- [ ] Server code in dev should ideally be compiled on the fly for easier debugging.

## Client Code
- [ ] Client code in development should be in its native form as much as possible for easier debugging.
- [ ] The client-side JS should fully support JSX syntax.
- [ ] The client-side HTML should fully support Jade/Pug (debateable).
- [ ] The client-side CSS should fully support SASS syntax.

## Webpack, Build System, and Deploy
- [ ] Webpack server scripts should build ES6 server code.
- [ ] Webpack client scripts should build ES6/JSX/SASS code.
- [ ] The build scripts should have a watch option to rebuild automatically on file change.
- [ ] The build output should have a meaningful directory organization (if applicable).
- [ ] Minify client-side JS (e.g. UglifyJS) in prod (but not dev) if possible.

## Testing Code
- [ ] Any testing code should not have friction with the build system. For instance, it should be ES6 and work with Babel.
- [ ] Test code should be able to be in the same directory as the code it tests, not just a universal `test/` directory.

## Linting
- [ ] Include a static linter (e.g. eslint).
- [ ] Use a linting configuration (`.eslintrc`) with good standards (Airbnb).
- [ ] It would be nice to have lint errors prevent commits from registering.

## Miscelaneous
- [ ] Organize the directory structure of the repo to be more scalable/neat.
- [ ] All runtime errors (testing, server, client) should be clearly labelled (e.g. line numbers and code) in dev.
- [ ] A dev/debugging panel would be a nice luxury for development.
