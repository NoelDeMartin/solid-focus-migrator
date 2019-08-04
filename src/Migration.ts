import SolidClient from '@/solid/SolidClient';

export default abstract class Migration {

    get solid(): SolidClient {
        return new SolidClient();
    }

    public abstract async run(storages: string[]): Promise<void>;

}
