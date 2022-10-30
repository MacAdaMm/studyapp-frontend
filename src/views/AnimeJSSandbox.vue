<template>
    <div class="square"></div>
    <button @click="play">Play</button>
</template>

<script setup>
import anime from 'animejs';
import { onUnmounted } from 'vue';

let animation = null;

function play() {
    if(animation != null){
        animation.paused == true ? animation.play() : animation.pause();
    }
    else {
        animation = anime({
            targets: '.square',
            translateX: 250,
            loop: true,
            direction: 'alternate',
            duration: 800,
            easing: 'easeInOutSine',
            loopComplete: function(anim) {
                console.log(anim.id +': animation finished loop!');
            }
        });
    }
}
onUnmounted(() => {
    animation.pause();
    animation = null;
});

</script>

<style scoped>
.square {
    width: 50px;
    height: 50px;
    background-color: royalblue;
}
</style>