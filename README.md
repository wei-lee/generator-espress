![generator-espress](logo-01.png)

# generator-espress
an **opinionated** yeoman generator that scaffolds a mvc express webapp completely in es6

## what's included
- good old [node](https://nodejs.org/en/)
- server via [express](http://expressjs.com/)
- [es6](http://es6-features.org) via [babel](https://babeljs.io/)
- linting via [eslint](http://eslint.org/)
- source control via [git](https://git-scm.com)

## To do

- [] database via [mongodb](https://www.mongodb.org/) + [mongoose](http://mongoosejs.com/)
- [] Chef cookbook
- [] Nagios Check Scripts
- [] Dockerfiles


## getting started
### install
simply run the following to install via [npm](https://www.npmjs.com/):
```
npm i -g yo gulp-cli
```

Clone this repo and them runn
```
npm link .
```

### generating!
once installed, simply do `yo espress`, and you'll be on your way to building your next project!

### structure of the generated project
all of your source code goes in the `src` folder.
anything javascript can (and should) be written in es6.
the strucutre is as follows:
```
├── Gruntfile.js
├── LICENSE
├── README.md
├── config
│   └── dev.json
├── package.json
├── scripts
│   ├── fh-test
│   ├── fh-test-launcher.sh
│   ├── install.sh
│   └── postinstall.sh
├── sonar-project.properties
└── src
    ├── app.js
    ├── endpoints
    │   └── http
    │       ├── error.js
    │       ├── index.js
    │       └── sys.js
    └── helpers
        ├── logger.js
        └── validation.js
```

The generated project will use ES6 by default. To transpile the app, run

```
grunt babel
```

It will generate the code in the `lib` directory


### tasks
- `gulp` is the same as `gulp serve`, which not only starts your express server, but also reloads it whenever server-side code changes
- `gulp build` creates your production-ready webapp by running the following tasks:
- `gulp lint` will lint all javascript with eslint and rules definted in `.eslint.json`
- `gulp clean` will remove any and all files created by any of the above tasks
- `gulp tasks` will show you all of the available tasks
