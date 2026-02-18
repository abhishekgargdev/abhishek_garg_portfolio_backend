import { ConfigFactory } from '@nestjs/config/dist/interfaces';

function getPrefix(env: string | undefined) {
    const map: Record<string, string> = {
        local: 'LOCAL',
        dev: 'DEV',
        prod: 'PROD',
    };

    return map[(env || 'local').toLowerCase()] || 'LOCAL';
}

function getEnvValue(prefix: string, key: string, fallback?: string) {
    const prefixed = process.env[`${prefix}_${key}`];
    if (prefixed !== undefined) return prefixed;
    if (process.env[key] !== undefined) return process.env[key] as string;
    return fallback;
}

const configuration: ConfigFactory = () => {
    const nodeEnv = (process.env.NODE_ENV || 'local').toLowerCase();
    const prefix = getPrefix(nodeEnv);

    return {
        NODE_ENV: nodeEnv,
        DATABASE_URL: getEnvValue(prefix, 'DATABASE_URL', ''),
        JWT_SECRET: getEnvValue(prefix, 'JWT_SECRET', ''),
        JWT_REFRESH_SECRET: getEnvValue(prefix, 'JWT_REFRESH_SECRET', ''),
        JWT_EXPIRATION: getEnvValue(prefix, 'JWT_EXPIRATION', '15m'),
        JWT_REFRESH_EXPIRATION: getEnvValue(prefix, 'JWT_REFRESH_EXPIRATION', '7d'),
        REDIS_HOST: getEnvValue(prefix, 'REDIS_HOST', 'localhost'),
        REDIS_PORT: Number(getEnvValue(prefix, 'REDIS_PORT', '6379')),
        REDIS_PASSWORD: getEnvValue(prefix, 'REDIS_PASSWORD', ''),
        REDIS_URL: getEnvValue(prefix, 'REDIS_URL', ''),
        SMTP_HOST: getEnvValue(prefix, 'SMTP_HOST', ''),
        SMTP_PORT: Number(getEnvValue(prefix, 'SMTP_PORT', '587')),
        SMTP_SECURE: ((): boolean => {
            const raw = getEnvValue(prefix, 'SMTP_SECURE', 'false');
            return raw === 'true' || raw === '1';
        })(),
        SMTP_USER: getEnvValue(prefix, 'SMTP_USER', ''),
        SMTP_PASSWORD: getEnvValue(prefix, 'SMTP_PASSWORD', ''),
        EMAIL_FROM: getEnvValue(prefix, 'EMAIL_FROM', ''),
        UPSTASH_REDIS_REST_URL: getEnvValue(prefix, 'UPSTASH_REDIS_REST_URL', ''),
        UPSTASH_REDIS_REST_TOKEN: getEnvValue(prefix, 'UPSTASH_REDIS_REST_TOKEN', ''),
        CLOUDINARY_URL: getEnvValue(prefix, 'CLOUDINARY_URL', ''),
        FRONTEND_URL: getEnvValue(prefix, 'FRONTEND_URL', ''),
        PORT: Number(getEnvValue(prefix, 'PORT', '3000')),
        SEED_USER_EMAIL: getEnvValue(prefix, 'SEED_USER_EMAIL', ''),
        SEED_USER_PASSWORD: getEnvValue(prefix, 'SEED_USER_PASSWORD', ''),
        SEED_USER_FIRST_NAME: getEnvValue(prefix, 'SEED_USER_FIRST_NAME', ''),
        SEED_USER_LAST_NAME: getEnvValue(prefix, 'SEED_USER_LAST_NAME', ''),

    };
};

export default configuration;
