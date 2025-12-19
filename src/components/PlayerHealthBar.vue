<template>
    <div class="health-bar-container">
        <div class="health-bar-fill" :style="fillStyle"></div>
        <div class="health-bar-text">
            HP: {{ current }}/{{ max }}
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    current: { type: Number, required: true },
    max: { type: Number, required: true }
});

const percentage = computed(() => {
    if (props.max <= 0) return '0%';
    const ratio = props.current / props.max;
    return `${Math.max(0, Math.min(100, ratio * 100))}%`;
});

const fillStyle = computed(() => ({
    width: percentage.value,
    backgroundColor: 'limegreen',
}));
</script>

<style scoped>
.health-bar-container {
    width: 150px;
    height: 20px;
    background-color: #333; 
    border: 1px solid #fff;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
}

.health-bar-fill {
    height: 100%;
    transition: width 0.3s ease;
}

.health-bar-text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    line-height: 20px;
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    text-shadow: 0 0 2px black; 
}
</style>