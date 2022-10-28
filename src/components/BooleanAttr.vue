<template>
    <p>{{toggleState.state}}</p>
    <button @click="callback">{{count.count}}</button>
    <button :disabled=toggleState.state>Hello!</button>
</template>

<script setup>
    import { reactive } from 'vue';

    let count = reactive({count : 0});
    let toggleState = reactive({state: true});

    function callback() {
        count.count++;
        toggleState.state = !toggleState.state;
    }
</script>

<style>

button {
    background-color: blue;
}
</style>