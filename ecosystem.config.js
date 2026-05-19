module.exports = {
  apps: [
    {
      name: 'kroster',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster', // Enables clustering for better performance
      autorestart: true,
      watch: false, // Do not watch for changes in production
      max_memory_restart: '1G', // Restart if memory exceeds 1GB
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
};
