module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.glsl$/i,
          use: 'raw-loader',
        },
      ],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        // sassOptions: {
        //   data: `
        //       @import "@/styles/_variables.scss";
        //     `
        // },
        prependData: '@import "~@/styles/_variables.scss";',
      }
    }
  }
}