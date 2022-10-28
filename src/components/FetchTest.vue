<template>
    <div>
        <h3>Fetch Test</h3>
        <div v-if="isLoaded">
            <p>Name: {{payload.name}}</p>
            <p>Question Count: {{payload.questions.length}}</p>
            <ul>
                <li v-for="question in payload.questions" :key="question.questionId">
                    <p>{{question.text}}</p>
                    <ul>
                        <li v-for="answer in question.answers" :key="answer.answerId">{{answer.text}}</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const payload = ref(null);
const isLoaded = ref(false);

async function getQuestionList(url){
   let response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {
             'Content-Type': 'application/json; charset=utf-8'
          }
    });

    await response.json()
    .then((data) => {
         payload.value = data;
         isLoaded.value = true;
    })
    .catch((ex) => {
        console.log(ex);
    });
}

onMounted(() => {
    getQuestionList('https://localhost:44323/questionlist/1');
});

</script>