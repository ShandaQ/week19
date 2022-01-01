const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require('path');

const config = {
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath(url) {
                return url.replace('../', '/assets/');
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    // new - invokes a constructor function
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
    //   specify the homepage for the PWA relative to the location of the manifest file
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
    // set to false to prevent this behavior - whether or not it should generate unique fingerprints so that each time a new manifest is generated, it looks like this: manifest.lhge325d.json
      fingerprints: false,
    //  determines whether the link to the manifest.json is added to the HTML.
    // not using fingerprints, we can also set inject to be false
    // we can hardcode the path to the manifest.json
      inject: false,
    // array of objects
    // src - path to icon image
    // sizes - take src image and create icons w/the dimensions of the numbers provided
    // destination - where the icons will be sent after creation of web manifest is completed by thr plugin
      icons: [{
        src: path.resolve("assets/img/icons/icon-512x512.png"),
        sizes: [96, 128, 192, 256, 384, 512],
        destination: path.join("assets", "icons")
      }]
    })
  ],
  mode: 'development'
};

module.exports = config;