/* eslint-disable */
import { Pool } from 'pg';
import * as fs from 'fs';
import FormData from 'form-data';
import { promisify } from 'util';
import { env } from '../env/env';

export class DbMigratorClient {
    private static GENERAL_DB = 'postgres';
    private static SLEEP_INTERVAL = 30 * 1000;

    private readonly generalDbPool: Pool;

    constructor() {
        // The idea is that there might be no the database for the service
        // and we should create it at first
        this.generalDbPool = new Pool({
            ...env.db,
            database: DbMigratorClient.GENERAL_DB
        });
    }

    async migrate(
        service = env.migrator.migration.service,
        database = env.migrator.migration.database,
        changeLogArchivePath = env.migrator.migration.changelogArchivePath
    ): Promise<void> {
        console.log('Migration is started');

        await this.waitForStorageUpAndRunning();
        await this.createDatabase();

        const { base, migrate } = env.migrator.urls;
        const url = `${base}${migrate}`.replace(':service', service)
            .replace(':database', database);

        const form = new FormData();
        form.append('changelog', fs.createReadStream(changeLogArchivePath));
        const submit = promisify(form.submit.bind(form));
        await submit(url);
        console.log('Migration is successfully completed');
    }

    private async waitForStorageUpAndRunning(): Promise<void> {
        const healthCheckQuery = 'select * from information_schema.tables';

        return new Promise(async (resolve) => {
            try {
                console.log('Check the storage is up and running...');
                await this.generalDbPool.query(healthCheckQuery);
                console.log('The storage is ready');

                resolve();
            } catch (e) {
                const sleepInterval = DbMigratorClient.SLEEP_INTERVAL;
                console.warn(`The storage is not ready yet. Wait ${sleepInterval / 1000}s`);
                setTimeout(
                    async () => {
                        await this.waitForStorageUpAndRunning();
                        resolve();
                    },
                    sleepInterval
                );
            }
        });
    }

    private async createDatabase(): Promise<void> {
        const isDbExist = await this.isDatabaseExist();
        if (isDbExist) {
            return;
        }

        const { database } = env.migrator.migration;

        console.log(`Create the database: '${database}'`);
        const createDbQuery = `create database ${database};`;
        await this.generalDbPool.query(createDbQuery);
        console.log(`Database '${database}' is successfully created`);
    }

    private async isDatabaseExist(): Promise<boolean> {
        const { database } = env.migrator.migration;
        console.log(`Check whether the database ${database} already exists`);

        const checkQuery = `select * from pg_database where datname = '${database}'`;
        const result = await this.generalDbPool.query(checkQuery);
        const isExist = Boolean(result.rows.length);

        let message = `There is no a database with the name '${database}'`;
        if (isExist) {
            message = `Database '${database}' already exists`;
        }
        console.log(message);

        return isExist;
    }
}