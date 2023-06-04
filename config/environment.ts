export default () => ({
    env: {
        nodeEnv: process.env.ENVIRONMENT,
        isDev: process.env.ENVIRONMENT === 'development',
        isStage: process.env.ENVIRONMENT === 'staging',
        isProd: process.env.ENVIRONMENT === 'production',
        baseUrl: process.env.BASE_URL,
        port: parseInt(process.env.PORT, 10),
        db: {
            user: process.env.DB_USER,
            pwd: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            db_TraingEngine: process.env.DATABASE_TRAIN_ENGINE,
            db_Searches: process.env.DATABASE_SEARCHES
        }
    },
})