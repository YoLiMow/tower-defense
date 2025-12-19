<template>
  <div 
    class="enemy" 
    :style="enemyStyle"
  >
    <div class="health-bar">
      <div class="health-bar-fill" :style="healthFillStyle"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  config: { type: Object, required: true },
  currentHealth: { type: Number, required: true },
  maxHealth: { type: Number, required: true },
});

const enemyStyle = computed(() => ({
  transform: `translate(${props.x}px, ${props.y}px)`,
  zIndex: 9999, 
  backgroundColor: props.config.color,
  width: `${props.config.size}px`,
  height: `${props.config.size}px`,
  marginLeft: `${-props.config.size / 2}px`,
  marginTop: `${-props.config.size / 2}px`,
}));

const healthPercentage = computed(() => {
  if (props.maxHealth <= 0) return '0%';
  const ratio = Math.max(0, props.currentHealth / props.maxHealth);
  return `${ratio * 100}%`;
});

const healthFillStyle = computed(() => {
  const ratio = props.currentHealth / props.maxHealth;
  let color = 'limegreen';
  if (ratio < 0.6) color = 'yellow';
  if (ratio < 0.3) color = 'red';

  return {
    width: healthPercentage.value,
    backgroundColor: color,
  }
})
</script>

<style scoped>
.enemy {
  position: absolute; 
  border-radius: 5px;
  border: 1px solid #333;
}

.health-bar {
  position: absolute;
  top: -12px;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #555;
  border-radius: 2px;
  overflow: hidden;
}

.health-bar-fill {
  height: 100%;
  transition: width 0.3s ease-out;
}
</style>