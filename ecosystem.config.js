module.exports = {
  apps: [
    {
      script: "./dist/index.js",
      watch: ".",
      env_file: "./.env",
    },
    {
      script: "./service-worker/",
      watch: ["./service-worker"],
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "159.89.173.118",
      ref: "origin/main",
      repo: "https://github.com/shahzerbaig/malik_novelty_store-Backend.git",
      path: "DESTINATION_PATH",
      "pre-deploy-local": "",
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
    },
  },
};
