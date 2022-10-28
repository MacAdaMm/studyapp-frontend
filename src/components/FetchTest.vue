<template>
    <div>
        <h3>Fetch Test</h3>
        <p>{{payload.value}}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const payload = ref({});

function getQuestionList(url){
   fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
             'Content-Type': 'application/json; charset=utf-8'
          }
    })
    .then((response) => response.json())
    .then((data) => {
         console.log(data);
    })
    .catch((ex) => {
        console.log(ex);
    });
}

onMounted(() => {
    getQuestionList('https://localhost:44323/questionlist/1');
});

</script>