/* eslint-disable no-console */
import { DbMigratorClient } from '../../src';

main()
    .then(() => console.log('everything is ok'))
    .catch(() => console.error('something goes wrong'));

async function main(): Promise<void> {
    const migrator = new DbMigratorClient();
    await migrator.migrate();

    console.log('start the service...');
}