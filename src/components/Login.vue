<template>
    <div>
        <input
            v-model="idp"
            class="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Solid POD url"
            @keyup.enter="login"
        />
        <button
            class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="login"
        >
            Login
        </button>
    </div>
</template>

<script>
import SolidAuthClient from 'solid-auth-client';
import $rdf, { IndexedFormula, NamedNode } from 'rdflib';

export default {
    data: () => ({ idp: '' }),
    async mounted() {
        const session = await SolidAuthClient.currentSession();

        if (session) {
            this.onSolidSessionUpdated(session);
        } else {
            SolidAuthClient.trackSession(this.onSolidSessionUpdated.bind(this));
        }
    },
    methods: {
        login() {
            SolidAuthClient.login(this.idp);
        },
        async onSolidSessionUpdated(session) {
            if (session) {
                const PIM = $rdf.Namespace('http://www.w3.org/ns/pim/space#');

                const store = $rdf.graph();
                const fetcher = new $rdf.Fetcher(store, {});

                await fetcher.load(session.webId);

                const webId = store.sym(session.webId);

                const storages = store.each(webId, PIM('storage'), null, null);

                this.$emit('login', {
                    url: webId.value,
                    storages: (storages || []).map($storage => $storage.value),
                });
            }
        },
    },
};
</script>
