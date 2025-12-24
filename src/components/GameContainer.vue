<template>
  <div class="game-area">
    <GameMap
      @place-tower="handlePlaceTower"
      :style="{ top: UI_HEIGHT_PX + 'px', width: MAP_WIDTH * TILE_SIZE + 'px' }"
    />

    <div class="base-castle" 
      :class="{ 'taking-damage': isTakingDamage }"
      :style="castleStyle">
      <span class="castle-icon">🏰</span>
    </div>

    <div v-if="showWaveIntro" class="wave-intro-overlay">
      <div class="wave-intro-box">第 {{ currentWave }} 波 即將開始</div>
    </div>

    <Enemy
      v-for="enemy in enemies"
      :key="enemy.id"
      :x="enemy.position.x"
      :y="enemy.position.y + UI_HEIGHT_PX"
      :config="enemy.config"
      :current-health="enemy.health"
      :max-health="enemy.maxHealth"
    />

    <Tower
      v-for="(tower, index) in placedTowers"
      :key="index"
      :col="tower.col"
      :row="tower.row"
      :config="tower.config"
      :showRange="false"
      :style="{ top: UI_HEIGHT_PX + 'px', zIndex: 50 }"
    />

    <Projectile
      v-for="p in projectiles"
      :key="p.id"
      :x="p.position.x"
      :y="p.position.y + UI_HEIGHT_PX"
      :color="p.color"
      :size="p.size"
    />

    <ShopPanel
      :current-gold="currentGold"
      :selected-tower-id="selectedTowerType.id"
      :isPaused="isPaused"
      @select="handleSelectTower"
      @togglePause="togglePause"
    />

    <div class="game-ui">
      金錢: {{ currentGold }} | 波次: {{ currentWave }} /
      {{ WAVE_CONFIGS.length }} | 敵人剩餘: {{ enemies.length }} |

      <PlayerHealthBar
        :current="playerHealth"
        :max="20"
        style="display: inline-block; margin-left: 20px"
      />

      <span
        v-if="gameOver"
        style="color: #ffcccc; margin-left: 20px; font-size: 1.2em"
      >
        遊戲結束！
      </span>
    </div>

    <PauseOverlay
      v-if="isPaused && !gameOver"
      @resume="togglePause"
      @restart="restartGame"
    />

    <GameOverOverlay 
      v-if="gameOver"
      :isVictory="isVictory"
      @restart="restartGame"
    />
  </div>
</template>

<script setup>
import GameMap from "./GameMap.vue";
import Enemy from "./Enemy.vue";
import Tower from "./Tower.vue";
import Projectile from "./Projectile.vue";
import PlayerHealthBar from "./PlayerHealthBar.vue";
import ShopPanel from "./ShopPanel.vue";
import PauseOverlay from "./PauseOverlay.vue";
import GameOverOverlay from "./GameOverOverlay.vue";
import {
  ENEMY_PATH,
  MAP_WIDTH,
  MAP_HEIGHT,
  TILE_SIZE,
} from "../data/GameMapData";
import { TOWER_CONFIGS } from "../data/TowerConfigs";
import { ENEMY_TYPES, WAVE_CONFIGS } from "../data/WaveData";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const enemies = ref([]);
const placedTowers = ref([]);
const projectiles = ref([]);
const playerHealth = ref(20);
const gameOver = ref(false);
const isPaused = ref(false);
const isVictory = ref(false);
const isTakingDamage = ref(false);

const SHOP_WIDTH_PX = 220;
const UI_HEIGHT_PX = 40;

const gameAreaWidth = computed(
  () => `${MAP_WIDTH * TILE_SIZE + SHOP_WIDTH_PX + 20}px`
);
const gameAreaHeight = computed(
  () => `${MAP_HEIGHT * TILE_SIZE + UI_HEIGHT_PX}px`
);
const selectedTowerType = ref(TOWER_CONFIGS.BASIC_CANNON);
const currentGold = ref(200);
const currentWave = ref(0);
const waveStartTime = ref(0);
const spawnIndex = ref(0);
const gameStarted = ref(false);
const gameMode = ref("BUILD");
const WAVE_INTRO_DURATION = 3000;
const showWaveIntro = ref(false);
let waveIntroTimer = null;

const castleStyle = computed(() => {
  const endPoint = ENEMY_PATH[ENEMY_PATH.length - 1];

  return {
    position: 'absolute',
    left: `${endPoint.x - TILE_SIZE / 2}px`,
    top: `${endPoint.y - TILE_SIZE / 2 + UI_HEIGHT_PX}px`,
    width: `${TILE_SIZE}px`,
    height: `${TILE_SIZE}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    fontSize: '32px',
    pointerEvents: 'none',
    userSelect: 'none',
    cursor: 'default'
  };
});

let lastTime = 0;
let animationFrameId = null;

function startGameLoop() {
  if (animationFrameId === null) {
    animationFrameId = requestAnimationFrame(updateGame);
  }
}

function stopGameLoop() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  lastTime = 0;
}

function distance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function spawnEnemy(enemyType, currentTimeStamp) {
  const config = ENEMY_TYPES[enemyType];
  const initialPosition = ENEMY_PATH[0];
  const newEnemy = {
    id: currentTimeStamp + Math.random(),
    health: config.health,
    maxHealth: config.health,
    speed: config.speed,
    bounty: config.bounty,
    config: config,
    pathIndex: 0,
    position: { x: initialPosition.x, y: initialPosition.y },
    active: true,
  };
  enemies.value.push(newEnemy);
  console.log(`[Wave ${currentWave.value}] 生成了 ${config.name}`);
}

function startNextWave(currentTimeStamp) {
  if (currentWave.value >= WAVE_CONFIGS.length) {
    console.log("所有波次已完成！遊戲勝利！");
    gameOver.value = true;
    isVictory.value = true;
    return;
  }
  currentWave.value++;
  showWaveIntro.value = true;
  gameStarted.value = false;
  waveStartTime.value = currentTimeStamp + WAVE_INTRO_DURATION;
  spawnIndex.value = 0;

  if (waveIntroTimer) clearTimeout(waveIntroTimer);
  waveIntroTimer = setTimeout(() => {
    showWaveIntro.value = false;
    gameStarted.value = true;
    waveIntroTimer = null;
  }, WAVE_INTRO_DURATION);
  console.log(`--- 開始波次 ${currentWave.value} ---`);
}

function handleEnemyDefeated(enemy) {
  currentGold.value += enemy.bounty;
  console.log(
    `擊敗敵人 ${enemy.id}，獲得 ${enemy.bounty} 金，總金錢: ${currentGold.value}`
  );
}

function updateGame(timestamp) {
  if (gameOver.value) {
    stopGameLoop();
    return;
  }

  if (!lastTime) lastTime = timestamp;

  const deltaTime = (timestamp - lastTime) / 1000;
  const elapsed = timestamp;
  lastTime = timestamp;

  if (currentWave.value === 0 && !gameStarted.value) {
    startNextWave(elapsed);
  }

  if (gameStarted.value && currentWave.value > 0) {
    const wave = WAVE_CONFIGS[currentWave.value - 1];
    const timeSinceStart = elapsed - waveStartTime.value;

    if (spawnIndex.value < wave.spawns.length) {
      const nextSpawn = wave.spawns[spawnIndex.value];

      if (timeSinceStart >= nextSpawn.delay) {
        spawnEnemy(nextSpawn.type, elapsed);
        spawnIndex.value++;
      }
    } else {
      if (enemies.value.length === 0) {
        setTimeout(() => {
          startNextWave(performance.now());
        }, 5000);

        gameStarted.value = false;
      }
    }
  }

  enemies.value.forEach((enemy) => {
    if (!enemy.active || enemy.pathIndex >= ENEMY_PATH.length) return;

    const targetPoint = ENEMY_PATH[enemy.pathIndex];
    const dx = targetPoint.x - enemy.position.x;
    const dy = targetPoint.y - enemy.position.y;
    const dist = distance({ x: dx, y: dy }, { x: 0, y: 0 });

    if (dist < enemy.speed * deltaTime) {
      enemy.position.x = targetPoint.x;
      enemy.position.y = targetPoint.y;
      enemy.pathIndex++;

      if (enemy.pathIndex >= ENEMY_PATH.length) {
        console.log(`敵人 ${enemy.id} 到達終點!`);
        enemy.active = false;
        handleEnemyLeaked(enemy);
      }
    } else {
      if (dist > 0) {
        const normalizedDx = dx / dist;
        const normalizedDy = dy / dist;
        const moveDistance = enemy.speed * deltaTime;
        enemy.position.x += normalizedDx * moveDistance;
        enemy.position.y += normalizedDy * moveDistance;
      }
    }
  });

  projectiles.value.forEach(p => {
    if (!p.targetId) {
      p.active = false;
      return;
    }

    const targetX = p.targetPos.x;
    const targetY = p.targetPos.y;

    const dx = targetX - p.position.x;
    const dy = targetY - p.position.y;
    const dist = distance({ x: dx, y: dy }, { x: 0, y: 0 });

    const moveDistance = p.speed * deltaTime;

    if (dist <= moveDistance) {
      p.position.x = targetX;
      p.position.y = targetY;
      p.active = false;

      const hitEnemy = enemies.value.find(e => e.id === p.targetId);

      if (hitEnemy && hitEnemy.active) {
        hitEnemy.health -= p.damage;

        if (hitEnemy.health <= 0) {
          hitEnemy.active = false;
          handleEnemyDefeated(hitEnemy);
        }
      }
    } else {
      if (dist > 0) {
        const normalizedDx = dx / dist;
        const normalizedDy = dy / dist;

        p.position.x += normalizedDx * moveDistance;
        p.position.y += normalizedDy * moveDistance;
      } else {
        p.active = false;
      }
    }
  });

  placedTowers.value.forEach((tower) => {
    const elapsed = performance.now();
    if (elapsed - tower.lastAttackTime < tower.config.cooldown) {
      return;
    }

    const towerX = tower.col * TILE_SIZE + TILE_SIZE / 2;
    const towerY = tower.row * TILE_SIZE + TILE_SIZE / 2;
    const targetEnemy = enemies.value.find((enemy) => {
      if (!enemy.active) return false;

      const dist = distance(
        { x: towerX, y: towerY },
        enemy.position
      );

      return dist <= tower.config.pixelRange;
    });

    if (targetEnemy) {
      tower.lastAttackTime = elapsed;

      const dx = targetEnemy.position.x - towerX;
      const dy = targetEnemy.position.y - towerY;

      const distToEnemy = distance(targetEnemy.position, {
        x: towerX,
        y: towerY,
      });

      let startX = towerX;
      let startY = towerY;

      if (distToEnemy > 0) {
        startX += (dx / distToEnemy) * 1;
        startY += (dy / distToEnemy) * 1;
      }

      if (distToEnemy > 5) {
        projectiles.value.push({
          id: Date.now() + Math.random(),
          targetId: targetEnemy.id,
          targetPos: { x: targetEnemy.position.x, y: targetEnemy.position.y },
          speed: tower.config.projectileSpeed,
          color: tower.config.projectileColor,
          size: 10,
          startPos: { x: startX, y: startY },
          position: { x: startX, y: startY },
          damage: tower.config.damage,
          active: true,
        });
      }
    }
  });

  enemies.value = enemies.value.filter((enemy) => enemy.active);
  projectiles.value = projectiles.value.filter(p => p.active !== false);

  animationFrameId = requestAnimationFrame(updateGame);
}

const handlePlaceTower = (payload) => {
  const { row, col, tileType } = payload;
  const config = selectedTowerType.value;

  const endPoint = ENEMY_PATH[ENEMY_PATH.length - 1];
  const endRow = Math.floor(endPoint.y / TILE_SIZE);
  const endCol = Math.floor(endPoint.x / TILE_SIZE);

  if (row === endRow && col === endCol) {
    return;
  }

  if (gameMode.value !== "BUILD") return;

  if (tileType !== 0 || currentGold.value < config.price) return;

  const existingTower = placedTowers.value.find(
    (t) => t.row === row && t.col === col
  );

  if (existingTower) return;

  const isOccupied = placedTowers.value.some(
    (tower) => tower.row === row && tower.col === col
  );

  if (isOccupied) {
    console.log("該位置已經有塔了！");
    return;
  }

  const newTower = {
    id: Date.now() + Math.random(),
    row: row,
    col: col,
    config: config,
    lastAttackTime: 0,
  };

  placedTowers.value.push(newTower);
  currentGold.value -= config.price;

  console.log(`放置了 ${config.name}，剩餘金錢: ${currentGold.value}`);
};

function handleEnemyLeaked(enemy) {
  if (gameOver.value) return;

  const damage = enemy.config.leakDamage;

  playerHealth.value -= damage;

  isTakingDamage.value = true;

  setTimeout(() => {
    isTakingDamage.value = false;
  }, 300);

  if (playerHealth.value <= 0) {
    playerHealth.value = 0;
    gameOver.value = true;
  }
}

function togglePause() {
  if (gameOver.value) return;

  isPaused.value = !isPaused.value;

  if (isPaused.value) {
    stopGameLoop();
  } else {
    startGameLoop();
  }
}

function restartGame() {
  stopGameLoop();

  enemies.value = [];
  placedTowers.value = [];
  projectiles.value = [];
  currentGold.value = 200;
  currentWave.value = 0;
  waveStartTime.value = 0;
  gameStarted.value = false;
  playerHealth.value = 20;
  gameOver.value = false;
  isPaused.value = false;
  isVictory.value = false;
  lastTime = 0;
  if (waveIntroTimer) {
    clearTimeout(waveIntroTimer);
    waveIntroTimer = null;
  }

  startGameLoop();
}

function handleSelectTower(config) {
  selectedTowerType.value = config;
  gameMode.value = "BUILD";
}

onMounted(() => {
  startGameLoop();
});

onBeforeUnmount(() => {
  stopGameLoop();
  if (waveIntroTimer) {
    clearTimeout(waveIntroTimer);
    waveIntroTimer = null;
  }
});
</script>

<style scoped>
.game-area {
  position: relative;
  width: v-bind(gameAreaWidth);
  height: v-bind(gameAreaHeight);
  margin: 20px auto;
  overflow: hidden;
  border: 4px solid black;
}

.game-ui {
  position: absolute;
  top: 0;
  left: 0;
  width: v-bind(MAP_WIDTH * TILE_SIZE + "px");
  height: 40px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: left;
  font-weight: bold;
  z-index: 10000;
  box-sizing: border-box;
}

.base-castle {
  transition: all 0.1s ease;
  filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
}

.base-castle.taking-damage {
  filter: drop-shadow(0 0 15px #ff0000) brightness(1.2);
  transform: scale(1.3);
  animation: shake 0.1s infinite;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg) scale(1.3); }
  25% { transform: translate(-1px, -2px) rotate(-1deg) scale(1.3); }
  50% { transform: translate(-3px, 0px) rotate(1deg) scale(1.3); }
  75% { transform: translate(3px, 2px) rotate(0deg) scale(1.3); }
  100% { transform: translate(1px, -1px) rotate(-1deg) scale(1.3); }
}

.castle-icon {
  user-select: none;
  animation: breathe 2s infinite ease-in-out;
}

@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.wave-intro-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.7);
  z-index: 25000;
}

.wave-intro-box {
  color: #fff;
  font-size: 48px;
  font-weight: 800;
  padding: 24px 40px;
  border-radius: 12px;
  background: rgba(0,0,0,0.5);
  border: 3px solid gold;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
}
</style>
