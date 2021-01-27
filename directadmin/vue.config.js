const fs = require("fs");

module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8080,
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
      "/API": {
        target: "https://161.35.197.42:2222/CMD_JSON_LANG",
        changeOrigin: true,
        pathRewrite: {
          "^/API": "",
        },
      },
      "/CREATE_DOMAIN": {
        target: "https://161.35.197.42:2222/CMD_API_DOMAIN",
        changeOrigin: true,
        pathRewrite: {
          "^/CREATE_DOMAIN": "",
        },
      },
      "/GET_DOMAINS_WITH_DATA": {
        target: "https://161.35.197.42:2222/CMD_ADDITIONAL_DOMAINS?json=yes",
        changeOrigin: true,
        pathRewrite: {
          "^/GET_DOMAINS_WITH_DATA": "",
        },
      },
    },
  },
};
