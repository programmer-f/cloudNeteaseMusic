module.exports = {
  configureWebpack:{
    module: {
      rules: [
        {
          test: /\.html$/i,
          exclude:/node_modules/,
          use:{
            loader: 'html-loader',
            options:{
              minimize:true
            }
          }
        },
      ],
    },
  }
};
