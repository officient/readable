
/* eslint import/no-dynamic-require:off */
/* eslint global-require:off */

function loadRules(rulesConfig) {
  const namespace = [];
  const file = [];

  Object.keys(rulesConfig).forEach((ruleName) => {
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

function lint(config) {
  const rules = loadRules(config.rules);

  console.log(JSON.stringify(rules));
}

module.exports = lint;
