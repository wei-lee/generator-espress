'use strict';

import path from 'path';
import { Base } from 'yeoman-generator';
//import mkdirp from 'mkdirp';
import pathExists from 'path-exists';
import simpleGit from 'simple-git';
import slug from 'slug';
import fs from 'fs';

class MyGenerator extends Base {
  constructor(...args) {
    super(...args);
    slug.defaults.mode = 'rfc3986';
    this.opts = {
      year: new Date().getFullYear()
    };
  }

  prompting() {
    const done = this.async();
    const prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Enter the name of your project:',
      default: 'name-of-your-project'
    }, {
      type: 'input',
      name: 'description',
      message: 'Enter a description of your project:'
    }, {
      type: 'input',
      name: 'githubName',
      message: 'Enter your github username:',
      store: true
    }, {
      type: 'input',
      name: 'buildDir',
      message: 'Enter the name of your build directory:',
      default: 'lib'
    }];
    this.prompt(prompts, res => {
      this.opts.projectName = slug(res.projectName);
      const dir = path.join('.', this.opts.projectName);
      if (!pathExists.sync(dir)) this.destinationRoot(dir);
      else this.env.error(`the directory '${this.opts.projectName}' already exists!`);
      this.git = simpleGit(this.destinationRoot());
      this.opts.description = res.description;
      this.opts.githubName = res.githubName;
      this.opts.buildDir = slug(res.buildDir);
      done();
    });
  }

  get writing() {
    return {
      // create root directory files
      rootFiles() {
        this.fs.copy(
          this.templatePath('babelrc'),
          this.destinationPath('.babelrc')
        );
        this.fs.copy(
          this.templatePath('eslintrc.json'),
          this.destinationPath('.eslintrc.json')
        );
        this.fs.copyTpl(
          this.templatePath('_gitignore'),
          this.destinationPath('.gitignore'),
          this.opts
        );
        this.fs.copyTpl(
          this.templatePath('_LICENSE'),
          this.destinationPath('LICENSE'),
          this.opts
        );
        this.fs.copyTpl(
          this.templatePath('_README.md'),
          this.destinationPath('README.md'),
          this.opts
        );
        this.fs.copy(
          this.templatePath('Gruntfile.js'),
          this.destinationPath('Gruntfile.js'),
        );
        this.fs.copyTpl(
          this.templatePath('_package.json'),
          this.destinationPath('package.json'),
          this.opts
        );
        this.fs.copyTpl(
          this.templatePath('_sonar-project.properties'),
          this.destinationPath('sonar-project.properties'),
          this.opts
        );
      },
      // express app config and files
      app() {
        // app.js and config.js
        this.fs.copyTpl(
          this.templatePath('src/app/_app.js'),
          this.destinationPath('src/app.js'),
          this.opts
        );
        this.fs.copy(
          this.templatePath('src/app/config/dev.json'),
          this.destinationPath('config/dev.json')
        );
        // models
        this.directory(
          this.templatePath('src/app/endpoints'),
          this.destinationPath('src/endpoints')
        );
        this.fs.copy(
          this.templatePath('src/app/logger.js'),
          this.destinationPath('src/logger.js')
        );
        this.fs.copy(
          this.templatePath('src/app/config/validation.js'),
          this.destinationPath('config/validation.js')
        );
      },
      //install upstart scripts
      scripts() {
        let projectName = this.opts.projectName;
        this.fs.copyTpl(
          this.templatePath('scripts/_install.sh'),
          this.destinationPath('scripts/install.sh'),
          this.opts
        );
        this.fs.copyTpl(
          this.templatePath('scripts/_postinstall.sh'),
          this.destinationPath('scripts/postinstall.sh'),
          this.opts
        );
        this.fs.copyTpl(
          this.templatePath('scripts/_launcher.sh'),
          this.destinationPath('scripts/'+ projectName +'-launcher.sh'),
          this.opts
        );
        this.fs.copyTpl(
          this.templatePath('scripts/_service.sh'),
          this.destinationPath('scripts/' + projectName),
          this.opts
        );
      },
      // create local git and commit all files
      git() {
        this.git
          .init()
          .add('.')
          .commit(`${this.opts.projectName} initial commit`);
      }
    };
  }

  install() {
    let projectName = this.opts.projectName;
    fs.chmodSync(this.destinationPath('scripts/install.sh'), '0755');
    fs.chmodSync(this.destinationPath('scripts/postinstall.sh'), '0755');
    fs.chmodSync(this.destinationPath('scripts/'+ projectName +'-launcher.sh'), '0755');
    fs.chmodSync(this.destinationPath('scripts/' + projectName), '0755');
    this.installDependencies();
  }

  end() {
    this.log(`'${this.opts.projectName}' is all set up and ready to go!`);
  }
}

module.exports = MyGenerator;
