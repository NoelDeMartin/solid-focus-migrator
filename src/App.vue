<template>
    <div id="app" class="w-screen h-screen bg-blue-100 flex items-center justify-center">
        <div class="bg-white flex flex-col p-8 rounded shadow m-16">
            <h1 class="text-2xl font-bold text-center">Solid Focus Data Migrator</h1>
            <p class="text-sm italic text-center">
                Login to your POD in order to upgrade data created with an older
                version of the <a
                    class="inline-block align-baseline underline text-sm text-blue-500 hover:text-blue-800"
                    href="https://noeldemartin.github.io/solid-focus/"
                    target="blank"
                >
                    Solid Focus
                </a> application.
            </p>
            <hr class="block h-1 w-full border-b border-gray-400">
            <Login v-if="!user" @login="onLogin" />
            <Migrator v-else :user="user" @logout="onLogout" />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Login from '@/components/Login.vue';
import Migrator from '@/components/Migrator.vue';

export default Vue.extend({
    name: 'app',
    components: {
        Login,
        Migrator,
    },
    data: () => ({ user: null }),
    methods: {
        onLogin(user: any) {
            this.user = user;
        },
        onLogout() {
            this.user = null;
        },
    },
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
