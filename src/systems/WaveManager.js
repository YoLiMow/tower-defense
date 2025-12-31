import { ENEMY_TYPES } from '../data/WaveData';

export function generateRandomWave(waveNumber) {
  const types = Object.values(ENEMY_TYPES).map(t => t.id);
  const spawns = [];

  const baseCount = 4 + Math.floor(waveNumber * 1.2);
  let accumulatedDelay = 0;

  for (let i = 0; i < baseCount; i++) {
    const weights = types.map((_, idx) => 1 + idx * (waveNumber / 10));
    const totalWeight = weights.reduce((s, w) => s + w, 0);
    let r = Math.random() * totalWeight;
    let pickIndex = 0;
    for (let j = 0; j < weights.length; j++) {
      r -= weights[j];
      if (r <= 0) { pickIndex = j; break; }
    }
    const type = types[pickIndex];

    const delay = 200 + Math.floor(Math.random() * 1000);
    accumulatedDelay += delay;

    const multiplier = 1 + waveNumber * 0.5 + Math.random() * 0.1;

    spawns.push({ type, delay: accumulatedDelay, multiplier: Number(multiplier.toFixed(2)) });
  }

  return { waveNumber, spawns };
}

export default { generateRandomWave };
