import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"

export default {
    entry: "./src/index.js",
    mode: "production",
    output: {
        filename: "index.js",
        path: path.resolve("build"),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve("src/index.html")
    })]
}