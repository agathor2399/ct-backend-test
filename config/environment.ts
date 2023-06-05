export default () => ({
  env: {
    nodeEnv: process.env.ENVIRONMENT,
    isDev: process.env.ENVIRONMENT === 'development',
    isStage: process.env.ENVIRONMENT === 'staging',
    isProd: process.env.ENVIRONMENT === 'production',
    baseUrl: process.env.BASE_URL,
    port: parseInt(process.env.PORT, 10),
  },
});
