import Migration from '@/Migration';

interface MigrationsMap {
    [version: string]: Migration;
}

const migrationsContext = require.context('@/migrations/');
const migrations: MigrationsMap = {};

for (const fileName of migrationsContext.keys()) {
    const name = (fileName.match(/^(?:\.\/)?(.+)\.(j|t)s$/) || [])[1];

    if (typeof name !== 'undefined' && name !== 'index') {
        migrations[name] = new (migrationsContext(fileName).default)();
    }
}

export default migrations;
