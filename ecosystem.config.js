module.exports = {
  apps: [
    {
      name: "cabinet_web",
      cwd: "/var/www/web",
      script: "yarn start",
      watch: true,
      merge_logs: true,
      ignore_watch: ["node_modules", "logs", ".git"],
      env: {
        // ACCESSTOKEN: "c3ecf1f7caf8946a2bf7cfaab3a37a1f",
        // HOSTNAME: "xn-mkrs0cvybp0ox7si25b.myshopify.com"
      },
    },
    {
      name: "cabinet_api",
      cwd: "/var/www/api",
      script: "yarn start",
      watch: true,
      merge_logs: true,
      ignore_watch: ["node_modules", "logs", ".git"],
      env: {
        PORT: "4051",
        JWT_SECRET: "0a6b944d-d2fb-46fc-a85e-0295c986cd9f",
        MONGO_HOST:
          "mongodb://localhost/express-mongoose-es6-rest-api-development",
        MONGO_PORT: "27017",
        magentoHost: "http://8.136.234.45/",
        magentoToken: "ozvm91sn3m95njc0iu24te3yu4wpqgnp",
      },
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "47.88.26.221",
      ref: "origin/master",
      repo: "git@github.com:thunderwin/bigPlan.git",
      path: "/home/nuxt/",

      // "pre-deploy-local": "echo '1'",   // 执行脚本之前本地执行的命令
      "pre-deploy": "git fetch --all", // 服务器端，在执行部署命令之前的命令
      "post-deploy":
        "yarn && yarn build && pm2 startOrReload ecosystem.config.js --env production",
      "pre-setup": "git add . && git commit -m 'asas' && git push a master ", // Pre-setup command or path to a script on your local machine
    },
  },
};
