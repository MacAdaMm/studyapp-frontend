<template>
    <span>Score: {{gameState.score}}/{{gameState.maxScore}}</span>
</template>

<script  setup>
import { gameState } from '@/GameState.js';
</script>