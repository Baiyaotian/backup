const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
	devServer: {
		port: 3333,
		host: '0.0.0.0',
		https: false, // https:{type:Boolean}
		open: true, // 配置自动启动浏览器
		proxy: {
			'/api': {
				target: process.env.VUE_APP_API_URL,
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}, // 配置多个代理
	},
	configureWebpack: config => {
		config.entry.app = ["babel-polyfill", "./src/main.js"];
		if (process.env.NODE_ENV === 'production') {
			// config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
			return {
				optimization: {
					minimizer: [
						new TerserPlugin({
							sourceMap: false,
							terserOptions: {
								compress: {
									drop_console: true
								}
							}
						})
					]
				}
			}
		}
	}
}