const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  publicPath: './',
  outputDir: 'fund_dist',
  assetsDir: 'static',
  productionSourceMap: false,
  pages: {
    index: 'src/pages/index/main.js',
    counter: {
      entry: 'src/pages/counter/main.js',
      template: 'public/index.html',
      filename: 'counter.html',
      title: '筛选器',
      chunks: ['chunk-vendors', 'chunk-common', 'counter']
    },
  },
  configureWebpack: {
    performance: {
      hints: false
    },
    plugins: [       
      new CompressionPlugin({
          test:/\.js$|\.html$|.\css/, //匹配文件名
          threshold: 10240,//对超过10k的数据压缩
          deleteOriginalAssets: false //不删除源文件
      })
  ]
  },
  devServer: {
		disableHostCheck: true,
	},
  // 关闭 eslint 规范
  lintOnSave: false,
  chainWebpack: config => {
    
    /* 添加分析工具 webpack-bundle-analyzer*/
    if (process.env.analyzer_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end();
    }
  },
}
