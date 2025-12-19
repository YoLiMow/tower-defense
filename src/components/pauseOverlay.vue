<template>
  <div class="overlay">
    <div class="pause-box">
      <h2>遊戲暫停</h2>
      <button @click="emit('resume')" class="btn resume-btn">繼續遊戲</button>
      <button @click="handleRestartConfirm" class="btn restart-btn">
        重新開始
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["resume", "restart"]);

function handleRestartConfirm() {
  if (confirm("確定要重新開始遊戲嗎？所有進度將會遺失。")) {
    emit("restart");
  }
}
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20000;
}

.pause-box {
  background-color: #333;
  color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  text-align: center;
  min-width: 250px;
}

h2 {
  margin-top: 0;
  font-size: 2em;
  color: gold;
  border-bottom: 2px solid #555;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.btn {
  display: block;
  width: 100%;
  padding: 10px 20px;
  margin-top: 15px;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: bold;
}

.resume-btn {
  background-color: #4caf50;
  color: white;
}

.resume-btn:hover {
  background-color: #45a049;
}

.restart-btn {
  background-color: #f44336;
  color: white;
}

.restart-btn:hover {
  background-color: #da190b;
}
</style>
