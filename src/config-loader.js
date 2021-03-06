
/* eslint global-require:off */

const fs = require('fs');
const { merge } = require('lodash');
const path = require('path');

const fileName = path.join('.', '.readable.json');

function init() {
  const source = path.join(__dirname, `default${fileName}`);

  fs.copyFileSync(source, fileName);
}

function load(ignoreBaseLine) {
  const data = fs.readFileSync(fileName, 'utf8');
  const defaultConfig = require('./default.readable.json');
  const config = merge(defaultConfig, JSON.parse(data));

  // load the baseline
  if (ignoreBaseLine || (!config.baseline)) {
    config.baseline = {};

    return config;
  }

  const baseline = fs.readFileSync(config.baseline, 'utf8');
  config.baseline = JSON.parse(baseline);

  return config;
}

module.exports = {
  init,
  fileName,
  load,
};
