<template>
    <div class="question">
        <span class="question-text"><strong>{{props.obj.text}}</strong></span>
        <div class="answer" v-for="(answer, index) in props.obj.answers" :key="index">
            <label>{{answer.text}}</label><input :type="inputType" :name="props.obj.questionId" ref="answerInputs"/>
        </div>
        <button class="submit-question" @click="submit">Submit</button>
    </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';
import { gameState } from '@/GameState'

const answerInputs = ref([]);
const inputType = ref(props.obj.type == 'Single Answer' ? 'radio' : 'checkbox');

const props = defineProps({
    obj: {
        type: Object,
        required: true
    }
});

function submit() {

    let userAnswers = [];
    answerInputs.value.forEach((answer, i) => 
    {
        if(answer.checked){
            userAnswers.push(i);
        }
    });

    if(userAnswers.length == 0){
        alert("Please select an answer before submitting a question.");
        return;
    }

    let isCorrect = gameState.scoreQuestion(props.obj, userAnswers);

    if(isCorrect == true){
        //Do UX things.
    }
    else {
        //Do UX things.
    }
}
watch(
    () => gameState.questionIndex,
    () => {
        inputType.value = props.obj.type == 'Single Answer' ? 'radio' : 'checkbox';
        answerInputs.value.forEach((answer) => 
        {
            answer.checked = false;
        });
    });
</script>

<style scoped>
    .question {
        background-color: white;
        width: unset;
    }
    .answer{
        background-color: antiquewhite;
    }
    .submit-question {
        margin-top: 8px;
        margin-bottom: 8px;
    }
</style>