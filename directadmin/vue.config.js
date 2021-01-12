const fs = require("fs");

module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8080,
    host: "192.168.8.101",
    https: true,
    pfx: fs.readFileSync("./localhost.pfx"),
    pfxPassphrase: "haslo",
    hotOnly: false,
    proxy: {
      "/API/LOGIN": {
        target: "https://161.35.197.42:2222/CMD_LOGIN",
        changeOrigin: true,
        pathRewrite: {
          "^/API/LOGIN": "",
        },
      },
      "/API/GET_USER_DATA": {
        target: "https://161.35.197.42:2222/CMD_JSON_LANG",
        changeOrigin: true,
        pathRewrite: {
          "^/API/GET_USER_DATA": "",
        },
      },
    },
  },
};
