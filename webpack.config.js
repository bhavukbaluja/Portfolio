// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// module.exports = (env, argv) => {
//   const isProduction = argv.mode === 'production';

//   // Define apps
//   // const apps = ['panel', 'web']; // Add more apps if needed

//   // Base output directory
//   const outputDir = 'dist'; 

//   // Entry and output configuration for each app
//   const entryPoints = apps.reduce((entries, app) => {
//     entries[app] = path.resolve(__dirname, `apps/${app}/src/main.jsx`);
//     return entries;
//   }, {});

//   const htmlPlugins = apps.map((app) => new HtmlWebpackPlugin({
//     template: path.resolve(__dirname, `apps/${app}/public/index.html`),
//     filename: `${app}.html`, // <-- this is the key change!
//     chunks: [app],
//   }));
//   const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // optional


//   return {
//     mode: isProduction ? 'production' : 'development',
//     entry: entryPoints,  // Multiple entry points for each app

//     output: {
//       path: path.resolve(__dirname, outputDir),  // Output to 'dist'
//       filename: '[name].[contenthash].bundle.js',  // Different bundles for each app
//       publicPath: '/',  // Static assets served from the root
//     },

//     devtool: isProduction ? 'source-map' : 'eval-source-map',  // Source maps for easier debugging

//     module: {
//       rules: [
//         {
//           test: /\.(js|jsx)$/,
//           exclude: /node_modules/,
//           // include: [
//           //   path.resolve(__dirname, 'src'),
//           //   path.resolve(__dirname, 'packages/ui/src'),  // Shared UI code
//           //   path.resolve(__dirname, 'packages/utils/src'),  // Shared UI code
//           //   path.resolve(__dirname, 'apps/panel'),
//           //   path.resolve(__dirname, 'apps/web'),
//           // ],
//           use: {
//             loader: 'babel-loader',
//             options: {
//               presets: ['@babel/preset-env', '@babel/preset-react'], // JSX handling preset
//             },
//           },
//         },
//         {
//           test: /\.css$/,  // For CSS files
//           use: ['style-loader', 'css-loader'],
//         },
//         {
//           test: /\.module\.scss$/, // ONLY for CSS Modules
//           use: [
//             MiniCssExtractPlugin.loader, // or MiniCssExtractPlugin.loader if you want separate CSS
//             {
//               loader: 'css-loader',
//               options: {
//                 modules: true,
//               },
//             },
//             'sass-loader',
//           ],
//         },
//         {
//           test: /\.scss$/, // for global SCSS
//           exclude: /\.module\.scss$/,
//           use: ['style-loader', 'css-loader', 'sass-loader'],
//         },       
//         {
//           test: /\.(png|svg|jpg|jpeg|gif|jpe?g)$/i,  // Image files
//           type: 'asset/resource',
//           generator: {
//             filename: 'static/images/[name][hash][ext]',
//           },
//         },
//         {
//           test: /\.json$/,  // JSON files
//           type: 'asset/resource',
//           generator: {
//             filename: 'static/data/[name][hash][ext]',
//           },
//         },
//       ],
//     },

//     resolve: {
//       extensions: ['.js', '.jsx', '.json'],
//       alias: {
//         components: path.resolve(__dirname, 'src/components/'),
//         pages: path.resolve(__dirname, 'src/pages/'),
//         literals: path.resolve(__dirname, 'src/literals/'),
//         utils: path.resolve(__dirname, 'src/utils/'),
//         '@ui': path.resolve(__dirname, 'packages/ui/src'),
//         '@utils': path.resolve(__dirname, 'packages/utils/src'),
//         '@assets': path.resolve(__dirname, 'packages/ui/assets'),
//       },
//     },

//     plugins: [
//       new CleanWebpackPlugin(),  // Clean the dist folder before building
//       ...htmlPlugins,  // Generate HTML files for each app
//       new MiniCssExtractPlugin({
//         filename: '[name].[contenthash].css',
//       }),
//     ],

//     devServer: {
//       static: apps.map(app => ({
//         directory: path.join(__dirname, `apps/${app}/public`),
//         publicPath: `/${app}`,
//         watch: true,
//       })),
//       hot: true,
//       open: true,
//       historyApiFallback: {
//         rewrites: apps.map(app => ({
//           from: new RegExp(`^/${app}`),
//           to: `/${app}.html`, // serve correct HTML per app
//         })),
//       },
//       port: 9000,
//     },
    
    

//     optimization: {
//       splitChunks: {
//         chunks: 'all',  // Split common code for better caching
//       },
//     },
//   };
// };
