// next.config.js
const nextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
