module.exports = {
  apps: [
    {
      script: "index.js",
      watch: ".",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      env_file: "./.env", // Add this line to specify .env file path
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
