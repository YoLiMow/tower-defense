<template>
    <div
        class="projectile"
        :style="projectileStyle"
    ></div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    color: { type: String, default: 'red' },
    size: { type: Number, default: 6 },
});

const projectileStyle = computed(() => ({
    transform: `translate(${props.x}px, ${props.y}px)`,
    backgroundColor: props.color,
    width: `${props.size}px`,
    height: `${props.size}px`,
    marginLeft: `${-props.size / 2}px`,
    marginTop: `${-props.size / 2}px`,
}));
</script>

<style scoped>
.projectile {
    position: absolute;
    border-radius: 50%;
    z-index: 9998;
}
</style>