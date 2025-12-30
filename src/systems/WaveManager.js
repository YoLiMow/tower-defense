// 提供隨機波次生成功能
import { ENEMY_TYPES } from '../data/WaveData';

export function generateRandomWave(waveNumber) {
  const types = Object.values(ENEMY_TYPES).map(t => t.id);
  const spawns = [];

  // 隨波次增加敵人數量與強度
  const baseCount = 4 + Math.floor(waveNumber * 1.2);
  let accumulatedDelay = 0;

  for (let i = 0; i < baseCount; i++) {
    // 加權隨機選擇敵人類型：波次越高，較強敵（index 高）機率越高
    const weights = types.map((_, idx) => 1 + idx * (waveNumber / 10));
    const totalWeight = weights.reduce((s, w) => s + w, 0);
    let r = Math.random() * totalWeight;
    let pickIndex = 0;
    for (let j = 0; j < weights.length; j++) {
      r -= weights[j];
      if (r <= 0) { pickIndex = j; break; }
    }
    const type = types[pickIndex];

    // delay 介於 200 ~ 1200 ms，增加一些隨機間隔
    const delay = 200 + Math.floor(Math.random() * 1000);
    accumulatedDelay += delay;

    // 每波敵人生命倍數隨波次微幅成長，並加入少量隨機性
    const multiplier = 1 + waveNumber * 0.5 + Math.random() * 0.1;

    spawns.push({ type, delay: accumulatedDelay, multiplier: Number(multiplier.toFixed(2)) });
  }

  return { waveNumber, spawns };
}

export default { generateRandomWave };
