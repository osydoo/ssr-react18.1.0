const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
rimraf.sync(path.resolve(__dirname, '../build'));
webpack(
    {
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
        entry: {
            main: path.resolve(__dirname, '../src/pages/main/index.js'),
            test: path.resolve(__dirname, '../src/pages/test/index.js')
        },
        output: {
            path: path.resolve(__dirname, '../build'),
            filename: '[name].js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: 'babel-loader',
                    exclude: /node_modules/,
                },
            ],
        },
    },
    (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }
            process.exit(1);
            return;
        }
        const info = stats.toJson();
        if (stats.hasErrors()) {
            console.log('Finished running webpack with errors.');
            info.errors.forEach(e => console.error(e));
            process.exit(1);
        } else {
            console.log('Finished running webpack.');
        }
    }
);
