<template>
    <div
        class="tower-wrapper"
        :style="wrapperStyle"
    >
        <div
            class="tower-body"
            :style="towerStyle"
        ></div>
        <div
            v-if="showRange"
            class="tower-range"
            :style="rangeStyle"
        ></div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { TILE_SIZE } from '../data/GameMapData';

const props = defineProps({
    col: { type: Number, required: true },
    row: { type: Number, required: true },
    config: { type: Object, required: true },
    showRange: { type: Boolean, default: false },
});

const towerPixelX = computed(() => props.col * TILE_SIZE + TILE_SIZE / 2);
const towerPixelY = computed(() => props.row * TILE_SIZE + TILE_SIZE / 2);

const wrapperStyle = computed(() => ({
    position: 'absolute',
    transform: `translate(${towerPixelX.value}px, ${towerPixelY.value}px)`,
    zIndex: 50,
}));

const towerStyle = computed(() => ({
    backgroundColor: props.config.projectileColor,
    marginLeft: '-15px',
    marginTop: '-15px',
}));

const rangeStyle = computed(() => {
    const diameter = props.config.pixelRange * 2;
    return {
        width: `${diameter}px`,
        height: `${diameter}px`,
        marginLeft: `${-diameter / 2}px`,
        marginTop: `${-diameter / 2}px`,
    };
});
</script>

<style scoped>
.tower-wrapper {
    position: absolute;
    width: 0;
    height: 0;
    z-index: 50;
}

.tower-body {
    position: absolute;
    width: 30px;
    height: 30px;
    border: 2px solid #333;
    border-radius: 50%;
}

.tower-range {
    position: absolute;
    border: 1px dashed #ffffff;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    pointer-events: none;
}
</style>