module.exports = {
  devServer: {
    proxy: {
      "/API/LOGIN": {
        target: "https://161.35.197.42:2222/CMD_LOGIN",
        changeOrigin: true,
        pathRewrite: {
          "^/API/LOGIN": "",
        },
      }
    },
  },
};
