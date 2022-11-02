<template>
    <button @click="onLoginClicked">{{message}}</button>
</template>

<script setup>
import { authenticationService } from '@/services/AuthenticationService';
import { ref } from 'vue';

let isAuthenticated = ref(false);
let message = ref('Login');

async function onLoginClicked() {
    if(isAuthenticated.value == false){
        await authenticationService.login();
    }
    else {
        authenticationService.logout();
    }

    isAuthenticated.value = authenticationService.isAuthenticated();
    message.value = isAuthenticated.value == true ? 'Logout' : 'Login';
}
</script>