const { injectBabelPlugin } = require('react-app-rewired');
const rewireStyl = require('react-app-rewire-stylus-modules');

const stylusDefaultOptions = {
  sourceMap: true,
};

const findLoader = (rule, match, callback = () => null) => {
  const i = rule.use.findIndex(match);
  if (i > -1) {
    callback(i);
  }
};

const tweakStylusLoader = (config, options = stylusDefaultOptions) => {
  let { rules } = config.module;
  const rule_config_index = rules.findIndex(r => r.hasOwnProperty('oneOf'));
  const rule_config = rules[rule_config_index];

  const styl_rules = rule_config.oneOf.forEach((rule, n) => {
    if (rule.use) {
      findLoader(
        rule,
        r => String(r).includes('stylus-loader'),
        i => {
          const loader = rule_config.oneOf[n].use[i];
          rule_config.oneOf[n].use[i] = {
            loader,
            options: {
              sourceMap: options.sourceMap,
            },
          };
        }
      );

      findLoader(
        rule,
        r => String(r.loader).includes('postcss-loader'),
        i => {
          const loader = rule_config.oneOf[n].use[i];
          rule_config.oneOf[n].use[i] = {
            ...loader,
            options: {
              ...loader.options,
              sourceMap: options.sourceMap,
            },
          };
        }
      );
    }
  });

  rules[rule_config_index] = rule_config;
  config.module.rules = rules;
  return config;
};

module.exports = function override(config, env) {
  config = rewireStyl(config, env);
  config = tweakStylusLoader(config);

  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    config
  );
  return config;
};
