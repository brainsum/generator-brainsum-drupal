'use strict';

const chalk      = require('chalk');
const Generator  = require('yeoman-generator');
const path       = require('path');
const kebabCase  = require('lodash.kebabcase');
const snakeCase  = require('lodash.snakecase');
const toLower    = require('lodash.tolower');
const startCase  = require('lodash.startcase');
const yosay      = require('yosay');


module.exports = class extends Generator {
  async prompting() {
    const currentDirName = path.basename(this.destinationRoot());
    const niceName = startCase(toLower(currentDirName));
    const machineName = snakeCase(currentDirName);
    const slugName = kebabCase(currentDirName);

    this.log(yosay(
      'Welcome to the slick ' + chalk.yellow('BRAINSUM') + '\'s Drupal 8 theme generator!'
    ));

    this.slugName = slugName;
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'siteName',
        message: 'What is your SITE\'s human readable name? (Ex.: Rustique e-Shop)',
        default: niceName
      },
      {
        type: 'input',
        name: 'siteUrl',
        message: 'What is your SITE\'s URL (BrowserSync proxy target)? (Ex.: https://rustique-commerce.test)',
        default: function (answers) {
          return 'http://' + kebabCase(answers.siteName) + '.test';
        }
      },
      {
        type: 'input',
        name: 'themeName',
        message: 'What is your THEME\'s human readable name? (Ex.: Rustique Commerce)',
        default: niceName
      },
      {
        type: 'input',
        name: 'themeMachineName',
        message: 'What is your THEME\'s machine name? (Ex.: rustique_commerce',
        default: machineName
      },
      {
        type: 'input',
        name: 'themeDescription',
        message: 'What is your THEME\'s description?',
        default: 'Drupal 8 coding standards ready theme powered by Gulp 4 and based on Classy.'
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'What is your name? (For author info, ex.: Krisztian Pinter)',
        default: this.user.git.name()
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'What is your email address? (For author info, ex.: kpinter@brainsum.com)',
        default: this.user.git.email()
      }
    ]);

    // Display all given answers to user before execute installing.
    this.log('CONFIRMATION:');
    this.log('Site Name:', chalk.yellow(this.answers.siteName));
    this.log('Site URL:', chalk.yellow(this.answers.siteUrl));
    this.log('Theme Name:', chalk.yellow(this.answers.themeName));
    this.log('Theme Machine Name:', chalk.yellow(this.answers.themeMachineName));
    this.log('Theme Description:', chalk.yellow(this.answers.themeDescription));
    this.log('Author Name:', chalk.yellow(this.answers.authorName));
    this.log('Author Email:', chalk.yellow(this.answers.authorEmail));

    this.confirmations = await this.prompt([
      {
        type: 'confirm',
        name: 'reviewAnswers',
        message: 'All info correct?'
      }
    ]);
  }

  writing() {
    if (this.confirmations.reviewAnswers === true) {
      // Copy full css directory.
      this.fs.copy(
        this.templatePath('css'),
        this.destinationPath('./css')
      );
      // Copy the empty fonts directory.
      this.fs.copy(
        this.templatePath('fonts/.gitkeep'),
        this.destinationPath('./fonts/.gitkeep')
      );
      // Copy full images directory in two steps.
      this.fs.copy(
        this.templatePath('images/dist'),
        this.destinationPath('./images/dist')
      );
      this.fs.copy(
        this.templatePath('images/src/.gitkeep'),
        this.destinationPath('./images/src/.gitkeep')
      );
      // Copy full js directory with variables in two steps.
      this.fs.copyTpl(
        this.templatePath('js/dist/.gitkeep'),
        this.destinationPath('./js/dist/.gitkeep')
      );
      this.fs.copyTpl(
        this.templatePath('js/src'),
        this.destinationPath('./js/src'),
        {
          themeName: this.answers.themeName,
          themeMachineName: this.answers.themeMachineName
        }
      );
      // Copy full sass directory.
      this.fs.copyTpl(
        this.templatePath('sass'),
        this.destinationPath('./sass')
      );
      // Copy full templates directory.
      this.fs.copyTpl(
        this.templatePath('templates'),
        this.destinationPath('./templates')
      );
      // Copy .browserslistrc file.
      this.fs.copy(
        this.templatePath('.browserslistrc'),
        this.destinationPath('./.browserslistrc')
      );
      // Copy .csscomb.json file.
      this.fs.copy(
        this.templatePath('.csscomb.json'),
        this.destinationPath('./.csscomb.json')
      );
      // Copy .editorconfig file.
      this.fs.copy(
        this.templatePath('.editorconfig'),
        this.destinationPath('./.editorconfig')
      );
      // Copy .eslintignore file.
      this.fs.copy(
        this.templatePath('.eslintignore'),
        this.destinationPath('./.eslintignore')
      );
      // Copy .eslintrc.json file.
      this.fs.copy(
        this.templatePath('.eslintrc.json'),
        this.destinationPath('./.eslintrc.json')
      );
      // Copy .gitattributes file.
      this.fs.copy(
        this.templatePath('.gitattributes'),
        this.destinationPath('./.gitattributes')
      );
      // Copy .gitignore file.
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('./.gitignore')
      );
      // Copy .nvmrc file.
      this.fs.copy(
        this.templatePath('.nvmrc'),
        this.destinationPath('./.nvmrc')
      );
      // Copy .stylelintignore file.
      this.fs.copy(
        this.templatePath('.stylelintignore'),
        this.destinationPath('./.stylelintignore')
      );
      // Copy .stylelintrc.json file.
      this.fs.copy(
        this.templatePath('.stylelintrc.json'),
        this.destinationPath('./.stylelintrc.json')
      );
      // Copy browserconfig.xml file.
      this.fs.copy(
        this.templatePath('browserconfig.xml'),
        this.destinationPath('./browserconfig.xml')
      );
      // Copy critical.json file with variables.
      this.fs.copyTpl(
        this.templatePath('critical.json'),
        this.destinationPath('./critical.json'),
        { siteUrl: this.answers.siteUrl }
      );
      // Copy favicon.ico file.
      this.fs.copy(
        this.templatePath('favicon.ico'),
        this.destinationPath('./favicon.ico')
      );
      // Copy gulpfile file with variables.
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('./gulpfile.js'),
        { siteUrl: this.answers.siteUrl }
      );
      // Copy LICENSE file.
      this.fs.copy(
        this.templatePath('LICENSE'),
        this.destinationPath('./LICENSE')
      );
      // Copy logo.svg file.
      this.fs.copy(
        this.templatePath('logo.svg'),
        this.destinationPath('./logo.svg')
      );
      // Copy package.json file with variables.
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('./package.json'),
        {
          themeMachineName: this.answers.themeMachineName,
          themeDescription: this.answers.themeDescription,
          slugName: this.slugName,
          authorName: this.answers.authorName,
          authorEmail: this.answers.authorEmail
        }
      );
      // Copy README.md file with variables.
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('./README.md'),
        {
          themeName: this.answers.themeName,
          themeMachineName: this.answers.themeMachineName,
          authorName: this.answers.authorName,
          authorEmail: this.answers.authorEmail
        }
      );
      // Copy screenshot.png file.
      this.fs.copy(
        this.templatePath('screenshot.png'),
        this.destinationPath('./screenshot.png')
      );
      // Copy site.webmanifest file with variables.
      this.fs.copyTpl(
        this.templatePath('site.webmanifest'),
        this.destinationPath('./site.webmanifest'),
        {
          siteName: this.answers.siteName,
          siteMachineName: snakeCase(this.answers.siteName)
        }
      );
      // Copy breakpoints.yaml file with variables.
      this.fs.copyTpl(
        this.templatePath('starter_theme.breakpoints.yml'),
        this.destinationPath(this.answers.themeMachineName + '.breakpoints.yml'),
        { themeMachineName: this.answers.themeMachineName }
      );
      // Copy info.yaml file with variables.
      this.fs.copyTpl(
        this.templatePath('starter_theme.info.yml'),
        this.destinationPath(this.answers.themeMachineName + '.info.yml'),
        {
          themeName: this.answers.themeName,
          themeDescription: this.answers.themeDescription,
          themeMachineName: this.answers.themeMachineName
        }
      );
      // Copy libraries.yaml file.
      this.fs.copyTpl(
        this.templatePath('starter_theme.libraries.yml'),
        this.destinationPath(this.answers.themeMachineName + '.libraries.yml')
      );
    }
  }
  install() {
    if (this.confirmations.reviewAnswers === true) {
      // Run npm install to install all dependencies from package.json.
      this.npmInstall();
    }
  }
  end() {
    if (this.confirmations.reviewAnswers === true) {
      // Display some message to user after all process.
      this.log(chalk.green('The Installation has been Finished! 🚀'));
      this.log(chalk.italic('Note: Please check all generated content are correct, ex. git repo info in package.json file.'));
    }
  }
};
