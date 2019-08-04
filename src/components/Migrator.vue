<template>
    <div>
        <p class="text-center mb-2">Upgrade to version:</p>
        <div class="relative">
            <select
                class="mb-4 block appearance-none w-full border text-gray-700 py-3 px-4 pr-8 rounded leading-tight outline-none bg-white border-gray-500"
                @change="targetVersion = $event.target.value"
            >
                <option v-for="version of versions" :key="version" :value="version" :selected="targetVersion === version">
                    {{ version }}
                </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>

        <button
            class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="migrate"
        >
            Migrate
        </button>

        <p class="mt-2 text-sm text-center">
            You're logged in at {{ user.url }}
            <button
                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                @click="logout"
            >
                (logout)
            </button>
        </p>

    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import SolidAuthClient from 'solid-auth-client';

import migrations from '@/migrations';

export default Vue.extend({
    props: {
        user: {
            type: Object as () => { url: string, storages: string[] },
            required: true,
        },
    },
    data: () => ({
        migrations,
        targetVersion: Object.keys(migrations).reverse().pop(),
    }),
    computed: {
        versions(): string[] {
            return Object.keys(migrations);
        },
    },
    methods: {
        async migrate() {
            for (const version in migrations) {
                await migrations[version].run(this.user.storages);

                if (version === this.targetVersion) {
                    return;
                }
            }
        },
        async logout() {
            await SolidAuthClient.logout();

            this.$emit('logout');
        },
    },
});
</script>
