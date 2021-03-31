/* eslint-disable no-console */
import { DbMigratorClient } from '../../src';

main()
    .then(() => console.log('everything is ok'))
    .catch(e => console.error('something goes wrong, error:', e));

async function main(): Promise<void> {
    const migrator = new DbMigratorClient();
    await migrator.migrate();

    console.log('start the service...');
}