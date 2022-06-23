const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const DotenvWebpackPlugin = require("dotenv-webpack");

/** @type {import('webpack').Configuration}  */
module.exports = {
	entry: "./src/index.js",
	mode: "development",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
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
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
		// new DotenvWebpackPlugin(),
	],
	devServer: {
		static: path.join(__dirname, "dist"),
		compress: true,
		port: 3000,
		open: true,
	},
};

