<template>
    <span>{{time}}</span>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

let time = ref(new Date().toLocaleTimeString('en-US'));

let intervalId = null;

onMounted(() => {
    intervalId = window.setInterval(() => { time.value = new Date().toLocaleTimeString('en-US'); }, 1000)
});

onUnmounted(() => {
    clearInterval(intervalId);
})
</script>