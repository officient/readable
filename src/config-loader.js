
/* eslint global-require:off */

const fs = require('fs');
const { merge } = require('lodash');
const path = require('path');

const fileName = path.join('.', '.readable.json');

function init() {
  const source = path.join(__dirname, `default${fileName}`);

  fs.copyFileSync(source, fileName);
}

function load() {
  const data = fs.readFileSync(fileName, 'utf8');
  const defaultConfig = require('./default.readable.json');

  return merge(defaultConfig, JSON.parse(data));
}

module.exports = {
  init,
  fileName,
  load,
};
