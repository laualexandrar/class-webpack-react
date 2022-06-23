const path = require("path");
const envKeys = require("./env-keys");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractplugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const { EnvironmentPlugin } = require("webpack");

/** @type {import('webpack').Configuration}  */
module.exports = {
	entry: "./src/index.js",
	mode: "production",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "/",
	},
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"@assets": path.resolve(__dirname, "src/assets/"),
			"@styles": path.resolve(__dirname, "src/styles/"),
			"@components": path.resolve(__dirname, "src/components/"),
			"@utils": path.resolve(__dirname, "src/utils/"),
		},
	},
    mode: 'production',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.html$/,
				use: {
					loader: "html-loader",
				},
			},
			{
				test: /\.(css|scss)$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.png/,
				type: "asset/resource",
				generator: {
					filename: "assets/images/[hash][ext][query]",
				},
			},
			{
				test: /\.(woff|woff2)$/,
				type: "asset/resource",
				generator: {
					filename: "assets/fonts/[hash][ext][query]",
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "./index.html",
		}),
		new MiniCssExtractplugin({
			filename: "[name].css",
		}),
		new CleanWebpackPlugin(),
		// new EnvironmentPlugin(envKeys),
	],
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
	},
};

