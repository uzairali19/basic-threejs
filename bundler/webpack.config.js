const { merge } = require('webpack-merge');

const productionConfig = merge([
  {
    output: {
      // Tweak this to match your GitHub project name
      publicPath: '/basic-threejs/',
    },
  },
]);
