/* eslint-disable */
import { reactive } from "vue";
import { questionSetApiService } from "./services/QuestionSetApiService";

function setsEqual (set1, set2)
{
    if(set1.size != set2.size){
        return false;
    }

    let result = true;

    set2.forEach((val) => {
        if(set1.has(val) == false){
            result = false;
            return false;
        }
    });

    return result;
}

export const gameState = reactive({
    questionSet: null,
    questionIndex: 0,
    score: 0,
    maxScore: 0,
    isRunning: false,

    initState: () => {
        gameState.questionIndex = 0;
        gameState.score = 0;
        if(gameState.questionSet != null){
            gameState.maxScore = gameState.questionSet.questions.length;
        }
        gameState.isRunning = true;
    },
    startGame: async (questionSetId) => {
        gameState.questionSet = await questionSetApiService.getQuestionSet(questionSetId);
        gameState.initState();
        
    },
    scoreQuestion: (question, answers) => {

        let expected = new Set();

        question.answers.forEach((answer, i) => {
            if(answer.isCorrect == true) {
                expected.add(i);
            }
        });

        let actual = new Set(answers);
        let isCorrect = setsEqual(expected, actual);

        if(isCorrect){
            gameState.score++;    
        }
        gameState.nextQuestion();
        return isCorrect;
    },
    nextQuestion: () => {
        if(gameState.questionIndex < gameState.questionSet.questions.length - 1){
            gameState.questionIndex++;
        }
        else {
            gameState.gameOver();
        }
    },
    gameOver: () => {
        gameState.isRunning = false;
        console.log("Game Ended");
    }
});