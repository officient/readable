
/* eslint import/no-dynamic-require:off */
/* eslint global-require:off */

const { readFileSync } = require('fs');
const { flattenDeep } = require('lodash');
const { dirsTree } = require('./utils.js');
const { tokenize } = require('./tokenize');
const Errors = require('./errors');

/**
 * @typedef {Object} NamespaceRule
 * @property {checkFiles} checkFiles function to check
 */

/**
 * Rule funtion to check the file tree
 * @callback checkFiles
 * @param {*} options passed from config file
 * @param {string[][]} files tree
 * @param {namespaseReport} report error callback
 */

/**
 * This callback is called by rule to log an error in files tree
 * @callback namespaseReport
 * @param {string} path where error occured
 * @param {string} messege
 */

/**
 * @typedef {Object} Rule
 * @property {check} check tokens stream for errors
 */

/**
 * Rule funtion to check the file tree
 * @callback check
 * @param {*} options passed from config file
 * @param {tokenize~Tokens} tokens
 * @param {report} report error callback
 */

/**
 * This callback is called by rule to log an error
 * @callback report
 * @param {string} messege
 * @param {tokenize~Token} token where error occured
 */

// load rules from config
function loadRules(rulesConfig) {
  const namespace = [];
  const file = [];

  Object.keys(rulesConfig).forEach((name) => {
    if (rulesConfig[name] === false) {
      return;
    }

    const rule = {
      name,
      module: require(`./rules/${name}`),
      config: rulesConfig[name],
    };

    if (typeof rule.module.checkFiles === 'function') {
      // namespace scope of rule
      namespace.push(rule);
    } else {
      file.push(rule);
    }
  });

  return {
    namespace,
    file,
  };
}


// main lint
function lint(config) {
  const rules = loadRules(config.rules);
  const files = dirsTree(config.pathes, '.php');

  const errors = new Errors(config.baseline);
  // rules with namespace scope
  rules.namespace.forEach(
    (rule) => rule.module.checkFiles(rule.config, files, (path, message) => {
      errors.report(path, rule.name, message, true);
    }),
  );

  // rules with file scope
  flattenDeep(files).forEach((file) => {
    let tokens;
    try {
      const string = readFileSync(file, 'utf8');
      tokens = tokenize(string);
    } catch (err) {
      errors.report(file, `Cant parse file: ${err.message}`);
      return;
    }
    rules.file.forEach(
      (rule) => rule.module.check(rule.config, tokens, (message, token) => {
        errors.report(file, rule.name, message, token);
      }),
    );
  });

  return errors;
}

module.exports = lint;
