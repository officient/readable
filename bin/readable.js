#!/usr/bin/env node

/**
 * @fileoverview Main CLI that is run via the readable command.
 * @author Denys Potapov
 */

/* eslint no-console:off */

const init = process.argv.includes('--init');
const saveBaseLine = process.argv.includes('--save-base-line');

const fs = require('fs');
const configLoader = require('../src/config-loader');
const lint = require('../src/lint');

process.on('uncaughtException', (err) => {
  // TODO: check why it catches not all exceptions
  console.error('Something unexpected happend');
  console.error(err.stack);
  process.exitCode = 2;
});

function run() {
  let config = {};
  try {
    config = configLoader.load();
  } catch (err) {
    console.error(`Can't load config ${configLoader.fileName}`);
    console.error(err.message);
    return 2;
  }

  return lint(config);
}

function printErrors(errors) {
  const pathes = Object.keys(errors);
  if (pathes.length === 0) {
    return 0;
  }

  pathes.forEach((path) => {
    console.error(path);
    Object.keys(errors[path]).forEach((message) => {
      console.error(`  ${message}`);
      const tokens = errors[path][message];
      tokens.forEach((token) => {
        console.error(`    at line ${token.line} column ${token.column}`);
      });
    });
  });

  return 1;
}

console.error(saveBaseLine);
console.error(process.argv);

if (init) {
  configLoader.init();
  console.info(`Created default config in ${configLoader.fileName}`);
} else if (saveBaseLine) {
  const fileNameIndex = process.argv.indexOf('--save-base-line') + 1;
  const fileName = process.argv[fileNameIndex] || '.baseline.json';
  const errors = run();
  const baseline = errors.generateBaseline();
  const data = JSON.stringify(baseline, null, 2);
  fs.writeFileSync(fileName, data);
} else {
  const errors = run();
  process.exitCode = printErrors(errors);
}
