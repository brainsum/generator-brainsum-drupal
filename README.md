# BRAINSUM's Drupal 8 theme generator

* Created by: Krisztian Pinter <kpinter@brainsum.com>
* Created in: 2020.
* Updated on: 2020.02.14.

## Table of Contents

* About
* Installation
* Usage

## About

You can generate a minimal Drupal 8 theme via BRAINSUM's Drupal 8 theme generator.
It use [Yeoman](https://yeoman.io/) as scaffolding tool so you will need to install
it first. Currently the generated theme based on core's Classy base theme (it will be
optional). Build process powered by
[Gulp.js 4](https://gulpjs.com/docs/en/getting-started/quick-start) and asset
files (sass, css, js) structured, linted and compiled according to Drupal Coding
Standards. You will can equally run build processes by gulp commands or npm scripts.

## Installation

You will need **node.js** and **yo**, **npm**, **generator-brainsum-drupal**,
**gulp-cli (min 4.0.0)** globally installed to working with the generator and generated
theme. If your node.js version is different you may need to install nvm too.

```bash
npm install -g npm
npm install -g gulp-cli
npm install -g yo
npm install -g yo generator-brainsum-drupal
```

## Usage

```bash
cd {project}/web/themes/custom/{themeMachineName}
nvm use // optional
yo brainsum-drupal
```

The generator will run npm install so you won't need to run it. After installation check
the generated files ex. git repo in package.json.
