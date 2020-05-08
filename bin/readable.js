#!/usr/bin/env node

/**
 * @fileoverview Main CLI that is run via the readable command.
 * @author Denys Potapov
 */

// get's 30% speed up on second and next runs
require('v8-compile-cache');

/* eslint no-console:off */

const init = process.argv.includes('--init');
const help = process.argv.includes('--help');
const saveBaseLine = process.argv.includes('--save-base-line');
const disableBaseLine = process.argv.includes('--disable-base-line');

const fs = require('fs');
const helpMsg = require('../src/help');
const configLoader = require('../src/config-loader');
const lint = require('../src/lint');
const { stringify } = require('../src/utils');

process.on('uncaughtException', (err) => {
  // TODO: check why it catches not all exceptions
  console.error('Something unexpected happend');
  console.error(err.stack);
  process.exitCode = 2;
});

function run(ignore) {
  let config = {};
  try {
    config = configLoader.load(ignore);
  } catch (err) {
    console.error(`Can't load config ${configLoader.fileName}`);
    console.error(err.message);
    return 2;
  }

  return lint(config);
}

function printErrors(errors) {
  const paths = Object.keys(errors);
  if (paths.length === 0) {
    return 0;
  }

  paths.forEach((path) => {
    console.error(path);
    Object.keys(errors[path]).forEach((rule) => {
      Object.keys(errors[path][rule]).forEach((message) => {
        console.error(`  ${message}`);
        const tokens = errors[path][rule][message];
        tokens.forEach((token) => {
          if (token !== true) {
            console.error(`    at line ${token.line} column ${token.column}`);
          }
        });
      });
    });
  });

  return 1;
}

if (help) {
  console.log(helpMsg);
} else if (init) {
  configLoader.init();
  console.info(`Created default config in ${configLoader.fileName}`);
} else if (saveBaseLine) {
  const fileNameIndex = process.argv.indexOf('--save-base-line') + 1;
  const fileName = process.argv[fileNameIndex] || '.baseline.json';
  run(true).then((errors) => {
    const baseline = errors.generateBaseline();
    const data = stringify(baseline);
    fs.writeFileSync(fileName, data);
  });
} else {
  run(disableBaseLine).then((errors) => {
    process.exitCode = printErrors(errors.errors);
  });
}
