
/* eslint import/no-dynamic-require:off */
/* eslint global-require:off */

const { dirsTree } = require('./utils.js');

// load rules from config
function loadRules(rulesConfig) {
  const namespace = [];
  const file = [];

  Object.keys(rulesConfig).forEach((ruleName) => {
    if (rulesConfig[ruleName] === false) {
      return;
    }

    const rule = {
      module: require(`./rules/${ruleName}`),
      config: rulesConfig[ruleName],
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

  const errors = [];
  // rules with namespace scope
  const reportNamespace = (path, message) => errors.push({ path, message });
  rules.namespace.forEach(
    (r) => r.module.checkFiles(r.config, files, reportNamespace),
  );

  return errors;
}

module.exports = lint;
