<template>
  <div class="game-map" :style="mapStyle">
    <div 
      v-for="(row, rowIndex) in mapGrid" 
      :key="rowIndex" 
      class="map-row"
    >
      <div 
        v-for="(tileType, colIndex) in row" 
        :key="colIndex" 
        :class="['tile', getTileClass(tileType)]"
        @click="handleTileClick(rowIndex, colIndex, tileType)"
      >
        </div>
    </div>
  </div>
</template>

<script setup>
import { 
    initialMapGrid, 
    MAP_WIDTH, 
    MAP_HEIGHT, 
    TILE_SIZE 
} from '../data/GameMapData'; 
import { ref, computed } from 'vue';

const mapGrid = ref(initialMapGrid);

const mapStyle = computed(() => ({
  width: `${MAP_WIDTH * TILE_SIZE}px`,
  height: `${MAP_HEIGHT * TILE_SIZE}px`,
}));

const emit = defineEmits(['place-tower']);

const getTileClass = (type) => {
  if (type === 1) return 'tile-path';
  if (type === 0) return 'tile-placement';
  return 'tile-unknown';
};

const handleTileClick = (row, col, type) => {
  if (type === 0) {
    console.log(`點擊了可放置區域: [${row}, ${col}]`);
    emit('place-tower', { row, col, tileType: type } );
  } else {
    console.log(`點擊了路徑或未知區域: [${row}, ${col}]`);
  }
};
</script>

<style scoped>
.game-map {
  display: flex;
  flex-direction: column;
  border: 4px solid #333; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.map-row {
  display: flex;
}

.tile {
  width: 64px;
  height: 64px;
  box-sizing: border-box; 
  border: 1px solid rgba(0, 0, 0, 0.1); 
  z-index: 1; 
}

.tile-path {
  background-color: #5C5470; 
}

.tile-placement {
  background-color: #B9D9EB; 
  cursor: pointer; 
}

.tile-placement:hover {
  background-color: #8CACEB;
}
</style>