const withSass = require('@zeit/next-sass');

module.exports = withSass({
  webpack(config, {isServer}) {
    if (isServer) {
      return config;
    }

    config.module.rules.unshift({
      test: /\.jsx?$/,
      include: /node_modules\/ky/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-runtime',
          ],
        },
      },
    });

    return config;
  },
});
