<template>
  <div class="shop-panel">
    <h3>商店</h3>

    <div
      v-for="config in availableTowers"
      :key="config.id"
      class="tower-item"
      :class="{
        selected: config.id === selectedTowerId,
        disabled: currentGold < config.price,
      }"
      @click="selectTower(config)"
    >
      <div
        class="tower-icon"
        :style="{ backgroundColor: config.projectileColor || 'gray' }"
      ></div>
      <div class="details">
        <span class="name">{{ config.name }}</span>
        <span
          class="price"
          :class="{ affordable: currentGold >= config.price }"
        >
          {{ config.price }} 💰
        </span>
      </div>
    </div>

    <button @click="emit('togglePause')" class="pause-button">
      {{ isPaused ? "繼續遊戲" : "暫停遊戲" }}
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { TOWER_CONFIGS } from "../data/TowerConfigs";

const props = defineProps({
  currentGold: { type: Number, required: true },
  selectedTowerId: { type: [String, null], default: null },
  isPaused: { type: Boolean, required: true },
});

const emit = defineEmits(["select", "togglePause"]);

const availableTowers = computed(() => {
  return Object.values(TOWER_CONFIGS).filter(
    (config) => !config.id.includes("_LV")
  );
});

function selectTower(config) {
  if (props.currentGold >= config.price && !props.isPaused) {
    emit("select", config);
  }
}
</script>

<style scoped>
.shop-panel {
  width: 220px;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  padding: 10px;
  background-color: rgba(50, 50, 50, 0.9);
  border-left: 2px solid #333;
  color: white;
  z-index: 1000;
}

h3 {
  margin-top: 0;
  border-bottom: 1px solid #777;
  padding-bottom: 5px;
}

.tower-item {
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 8px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  background-color: #444;
  transition: background-color 0.2s;
}

.tower-item:hover:not(.disabled) {
  background-color: #555;
}

.tower-item.selected {
  border-color: gold;
  background-color: #333;
}

.tower-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tower-icon {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid white;
}

.details {
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
}

.name {
  font-weight: bold;
}

.price {
  color: #ccc;
}

.price.affordable {
  color: limegreen;
}

.pause-button {
  margin-top: auto; /* 將按鈕推到底部 */
  padding: 10px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.pause-button:hover {
  background-color: #1976d2;
}
</style>
