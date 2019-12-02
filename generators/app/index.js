'use strict';

const chalk      = require('chalk');
const Generator  = require('yeoman-generator');
const mkdirp     = require('mkdirp');
const path       = require('path');
const kebabcase  = require('lodash.kebabcase');
const snakecase  = require('lodash.snakecase');
const yosay      = require('yosay');


module.exports = class extends Generator {
  async prompting() {
    const done = this.async();
    const currentDirName = path.basename(this.destinationRoot());
    const defaultName = snakecase(currentDirName);

    this.log(yosay(
      'Welcome to the slick ' + chalk.yellow('BRAINSUM') + '\'s Drupal 8 theme generator!'
    ));

    const answers = await this.prompt([
      {
        type: 'input',
        name: 'themeName',
        message: 'What is your theme\'s human readable name? (Ex.: Rustique Commerce)',
        default: defaultName
      },
      {
        type: 'input',
        name: 'themeMachineName',
        message: 'What is your theme\'s machine name (without _theme)? (Ex.: rustique_commerce',
        default: defaultName + '_theme'
      },
      {
        type: 'input',
        name: 'themeDescription',
        message: 'What is your theme\'s description?',
        default: 'Drupal 8 coding standards ready theme powered by Gulp 4 and based on Classy.'
      },
      {
        type: 'input',
        name: 'drupalUrl',
        message: 'What is the full project URL (BrowserSync proxy target)? (Ex.: https://rustique-commerce.test)',
        default: 'http://' + kebabcase(currentDirName) + '.test'
      }
    ]);

    return this.prompt(answers).then(function (props) {
      this.props = props;
      done();
    }.bind(this));
  }

  writing() {
    this.fs.copy(
      this.templatePath('css'),
      this.destinationPath('css')
    );
    this.fs.copy(
      this.templatePath('fonts'),
      this.destinationPath('fonts')
    );
    this.fs.copy(
      this.templatePath('images'),
      this.destinationPath('images')
    );
    this.fs.copy(
      this.templatePath('sass'),
      this.destinationPath('sass')
    );
    this.fs.copy(
      this.templatePath('templates'),
      this.destinationPath('templates')
    );
    this.fs.copy(
      this.templatePath('.browserslistrc'),
      this.destinationPath('.browserslistrc')
    );
    this.fs.copy(
      this.templatePath('.csscomb.json'),
      this.destinationPath('.csscomb.json')
    );
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );
    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore')
    );
    this.fs.copy(
      this.templatePath('.eslintrc.json'),
      this.destinationPath('.eslintrc.json')
    );
    this.fs.copy(
      this.templatePath('.gitattributes'),
      this.destinationPath('.gitattributes')
    );
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('.nvmrc'),
      this.destinationPath('.nvmrc')
    );
    this.fs.copy(
      this.templatePath('.stylelintignore'),
      this.destinationPath('.stylelintignore')
    );
    this.fs.copy(
      this.templatePath('.stylelintrc.json'),
      this.destinationPath('.stylelintrc.json')
    );
    this.fs.copy(
      this.templatePath('browserconfig.xml'),
      this.destinationPath('browserconfig.xml')
    );
    this.fs.copy(
      this.templatePath('critical.json'),
      this.destinationPath('critical.json')
    );
    this.fs.copy(
      this.templatePath('favicon.ico'),
      this.destinationPath('favicon.ico')
    );
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      this.props
    );
    this.fs.copy(
      this.templatePath('LICENCE'),
      this.destinationPath('LICENCE')
    );
    this.fs.copy(
      this.templatePath('logo.svg'),
      this.destinationPath('logo.svg')
    );
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );
    this.fs.copy(
      this.templatePath('screenshot.png'),
      this.destinationPath('screenshot.png')
    );
    this.fs.copy(
      this.templatePath('site.webmanifest'),
      this.destinationPath('site.webmanifest')
    );
  }
};
