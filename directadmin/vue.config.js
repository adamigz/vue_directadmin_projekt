module.exports = {
  devServer: {
    proxy: {
      "/LOGIN": {
        target: "https://161.35.197.42:2222/CMD_LOGIN",
        changeOrigin: true,
        pathRewrite: {
          '^/LOGIN': ''
        }
      },
    },
  },
};
