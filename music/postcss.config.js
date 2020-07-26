module.exports = {
  plugins:{
    autoprefixer:{},
    'postcss-pxtorem':{
      //根元素字体大小
      rootValue:100,
      propList:['*'],//虽然是*，但是可以通过Px来排除不想转哪些
    }
  }
};
