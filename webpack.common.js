const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

let pages = ["index", "signup", "login", "forgot", "levels", "activate", "verify", "profile", "shop"];
// let pages = ['login'];
let seqprog = ["seqprog_easy","level1-1"];

pages = pages.concat(seqprog);

module.exports = {
    entry: pages.reduce((config, page) => {
        config[page] = `./src/${page}.js`;
        return config;
    }, {}),
    optimization: {
        splitChunks: {
          chunks: "all",
        },
    },
    plugins: [].concat(
        pages.map(
          (page) =>
            new HtmlWebpackPlugin({
              inject: true,
              template: `./templates/${page}.html`,
              filename: `${page}.html`,
              chunks: [page],
            })
        ),
        // <- here goes array(s) of other plugins
    ),
    module: {
        rules: [ 
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.png|svg|jpg|jpeg|gif|mp3/,
                type: 'asset/resource'
            }
        ]
    },
    experiments: {
        topLevelAwait: true
    }
}