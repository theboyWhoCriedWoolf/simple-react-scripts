const isEslintUse = use => {
  if (!use.loader) return false;
  try {
    return use.loader.toString().indexOf("eslint-loader") !== -1;
  } catch (err) {
    return false;
  }
};

const isEslintRule = rule => {
  if (!rule) return false;
  if (!rule.use || !Array.isArray(rule.use)) return false;

  return rule.use.some(isEslintUse);
};

const withoutLint = config => {
  const rules = config.module.rules.filter(rule => !isEslintRule(rule) && rule);
  return {
    ...config,
    module: {
      ...config.module,
      rules
    }
  };
};

module.exports.withoutLint = withoutLint;
