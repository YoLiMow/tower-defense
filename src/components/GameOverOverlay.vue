<template>
    <div class="overlay">
        <div class="game-over-box">
            <h2 :class="{ 'victory': isVictory, 'defeat': !isVictory }">
                {{ isVictory ? '🎉 戰鬥勝利！🎉' : '💔 遊戲結束 💔' }}
            </h2>
            <p class="message">
                {{ isVictory ? '你成功保衛了領地！' : '很遺憾，你的生命值已耗盡。' }}
            </p>

            <button @click="emit('restart')" class="btn restart-btn">
                重新開始
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    isVictory: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['restart']);
</script>

<style scoped>
.overlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 30000;
}

.game-over-box {
    background-color: #2c3e50;
    color: white;
    padding: 50px 70px;
    border-radius: 12px;
    box-shadow: 0 0 50px rgba(255, 255, 255, 0.4);
    text-align: center;
    border: 4px solid;
}

.victory {
    color: gold;
    border-color: gold;
}

.defeat {
    color: #f44336;
    border-color: #f44336;
}

h2 {
    margin-top: 0;
    font-size: 3em;
    padding-bottom: 20px;
    margin-bottom: 30px;
    border-bottom: 3px solid;
}

.message {
    font-size: 1.2em;
    margin-bottom: 40px;
}

.restart-btn {
    padding: 15px 30px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.3em;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
    font-weight: bold;
}

.restart-btn:hover {
    background-color: #45a049;
    transform: translateY(-2px);
}
</style>