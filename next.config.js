/* eslint-disable global-require */
const { IgnorePlugin } = require('webpack');
const OfflinePlugin = require('offline-plugin');
const Dotenv = require('dotenv-webpack');
const withCSS = require('@zeit/next-css');
const { GraphQLClient } = require('graphql-request');
const router = require('./routes');

const connect = () => {
  const endpoint = 'https://api.graph.cool/simple/v1/cjww5ma3i36ia0106alic88xy';

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjA1MTk5NDYsImNsaWVudElkIjoiY2p3dzVhN3YzMjdtYzAxMzE3anhud2NtZSJ9.xkQUQOeHJ4IvTRT7gM77M60FcMCzWm1lkCc-biSvwRs'
    }
  });
  return graphQLClient;
};

const initExport = {
  cssLoaderOptions: {
    url: false
  },
  webpack: (config, { dev, isServer }) => {
    const prod = !dev;

    config.plugins.push(new Dotenv({ path: './public.env' }));
    config.plugins.push(new IgnorePlugin(/^\.\/locale$/, /moment$/));

    if (dev) {
      config.module.rules.push({
        test: /\.(jsx?|gql|graphql)$/,
        loader: 'eslint-loader',
        exclude: ['/node_modules/', '/.next/', '/helper_scripts/'],
        enforce: 'pre'
      });
    }

    if (process.env.ANALYZE_BUILD) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: isServer ? 8888 : 8889,
          openAnalyzer: true
        })
      );
    }

    if (prod && process.env.OFFLINE_SUPPORT) {
      config.plugins.push(
        new OfflinePlugin({
          publicPath: '/',
          relativePaths: false,
          externals: ['/', '/manifest.html'],
          excludes: ['.htaccess'],
          safeToUseOptionalCaches: true,
          caches: 'all',
          rewrites: function rewrites(asset) {
            if (
              asset.indexOf('.hot-update.js') > -1 ||
              asset.indexOf('build-stats.json') > -1 ||
              asset === 'BUILD_ID' ||
              asset.indexOf('dist/') === 0
            ) {
              return null;
            }

            if (asset[0] === '/') {
              return asset;
            }

            if (asset.indexOf('bundles/pages/') === 0) {
              return `/_next/-/${asset
                .replace('bundles/pages', 'page')
                .replace('index.js', '')
                .replace(/\.js$/, '')}`;
            }

            return `/_next/-/${asset}`;
          },
          autoUpdate: 1000 * 60 * 5,
          __tests: dev ? { ignoreRuntime: true } : {},
          ServiceWorker: {
            events: true,
            navigateFallbackURL: '/'
          },
          AppCache: {
            directory: './',
            events: true
          }
        })
      );
    }

    return config;
  }
};

if (process.env.STATIC_EXPORT) {
  const client = connect();
  const query = /* GraphQL */ `
    {
      allLeagues {
        id
      }
    }
  `;

  initExport.exportPathMap = function exportPathMap() {
    const routes = {};

    routes['/'] = {
      page: '/'
    };

    client.request(query).then(({ allLeagues }) => {
      allLeagues.forEach(({ id }) => {
        routes[`/league/${id}`] = {
          page: '/league',
          query: { id }
        };
      });
    });

    router.routes.forEach(route => {
      if (!route.pattern.includes(':')) {
        routes[route.pattern] = {
          page: route.page
        };
      }
    });

    return routes;
  };
}

/* eslint-enable global-require */
module.exports = withCSS(initExport);
