<template>
    <div v-show="gameState.isRunning == false">
        <select name="questionSets" ref="selectedSetOption">
            <option disabled selected>Select Set</option>
            <option v-for="(name, index) in questionSetNames" :key="index" :value="index">{{name}}</option>
        </select>
        <button @click="startGame">Play</button>
    </div>
    <div v-if="gameState.isRunning">
        <CurrentTime/>
        <h2>{{gameState.questionSet.name}}</h2>
        <ScoreUI/>
        <QuestionComponent :obj="gameState.questionSet.questions[gameState.questionIndex]" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { questionSetApiService } from '@/services/QuestionSetApiService.js';
import { gameState } from '@/GameState.js';

import QuestionComponent from '@/components/QuestionComponent.vue';
import ScoreUI from '@/components/ScoreUI.vue';
import CurrentTime from '@/components/CurrentTime.vue'

const questionSetNames = ref(null);
const selectedSetOption = ref(null);

async function startGame() {
    
    let isValidated = validateGameOptions();

    if(isValidated){
        let selectedSetIndex = selectedSetOption.value.selectedIndex;
        await gameState.startGame(selectedSetIndex);
    }
    else {
        alert('Please pick a question set from the drop down.');
    }
}
function validateGameOptions(){
    return selectedSetOption.value.selectedIndex != 0;
}
onMounted(async () => {
    questionSetNames.value = await questionSetApiService.getQuestionSetNames();
});
</script>

<style scoped>
    div {
        background-color: azure;
        width: 90%;
        margin: auto auto;
        border-top: 2px solid black;
        border-bottom: 2px solid black;
    }
</style>