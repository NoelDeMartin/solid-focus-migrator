import Migration from '@/Migration';

const CONTAINER = 'http://www.w3.org/ns/ldp#Container';
const TASK_GROUP = 'http://purl.org/vocab/lifecycle/schema#TaskGroup';

export default class extends Migration {

    public async run(storages: string[]): Promise<void> {
        const containers = [];

        for (const storageUrl of storages) {
            containers.push(... await this.solid.getResources(storageUrl, [CONTAINER, TASK_GROUP]));
        }

        // TODO this doesn't seem to work as per https://github.com/solid/node-solid-server/issues/1120
    }

}
