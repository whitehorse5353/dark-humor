const {
    HOST,
    PORT,
    APP_BASE_URL,
    CORS_ORIGIN,
    LOG_LEVEL,
    NODE_ENV
} = process.env;

module.exports = {
    application: {
        host: HOST,
        port: PORT,
        baseURL: APP_BASE_URL
    },
    corsConfig: {
        origin: CORS_ORIGIN
    },
    logLevel: LOG_LEVEL,
    hasSwagger: NODE_ENV !== 'production'
};
