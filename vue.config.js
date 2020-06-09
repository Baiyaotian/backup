module.exports = {
    devServer: {
        port: 3333,
        host: '0.0.0.0',
        https: false, // https:{type:Boolean}
        open: true, // 配置自动启动浏览器

        //before 提供在服务器内部的所有其他中间件之前执行定制中间件功能
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/api': {
                // target: 'http://10.204.24.178:8762',
                // target: 'http://10.204.24.105:9762',
                // target: 'http://10.204.24.129:8080',
                target: 'http://192.168.0.100:8080/',
                // target: 'http://10.204.24.106:8080',
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
     } 
    
    

}