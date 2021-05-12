const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    MIGRATOR_BASE_URL,
    SERVICE_NAME,
    CHANGELOG_ARCHIVE_PATH
} = process.env;

export const env = {
    migrator: {
        migration: {
            service: SERVICE_NAME || 'example-service',
            database: DB_NAME || 'postgres',
            changelogArchivePath: CHANGELOG_ARCHIVE_PATH || '/opt/service/changelog.tar'
        },
        urls: {
            base: MIGRATOR_BASE_URL || 'http://localhost:4010',
            migrate: '/migrate/:service/:database'
        }
    },
    db: {
        host: DB_HOST || 'localhost',
        port: Number(DB_PORT) || 5432,
        user: DB_USER || 'postgres',
        password: DB_PASSWORD || 'postgres'
    }
};