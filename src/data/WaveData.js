export const ENEMY_TYPES = {
    ENEMY_1: {
        id: 'ENEMY_1',
        name: 'enemy_1',
        health: 100,
        speed: 60,
        bounty: 10,
        color: 'green',
        size: 30,
        leakDamage: 1,
    },
    ENEMY_2: {
        id: 'ENEMY_2',
        name: 'enemy_2',
        health: 200,
        speed: 40,
        bounty: 20,
        color: 'orange',
        size: 40,
        leakDamage: 3,
    },
    ENEMY_3: {
        id: 'ENEMY_3',
        name: 'enemy_3',
        health: 80, 
        speed: 80, 
        bounty: 5,
        color: 'purple', 
        size: 20,
        leakDamage: 2, 
    },
    ENEMY_4: {
        id: 'ENEMY_4',
        name: 'enemy_4',
        health: 300, 
        speed: 30, 
        bounty: 40,
        color: 'blue',
        size: 50,
        leakDamage: 5,
    }
};

export const WAVE_CONFIGS = [
    {
        waveNumber: 1,
        spawns: [
            { type: ENEMY_TYPES.ENEMY_1.id, delay: 0},
            { type: ENEMY_TYPES.ENEMY_3.id, delay: 500},
            { type: ENEMY_TYPES.ENEMY_3.id, delay: 600},
            { type: ENEMY_TYPES.ENEMY_3.id, delay: 700},
            { type: ENEMY_TYPES.ENEMY_1.id, delay: 1000},
            { type: ENEMY_TYPES.ENEMY_1.id, delay: 2000},
            { type: ENEMY_TYPES.ENEMY_1.id, delay: 3000},
            { type: ENEMY_TYPES.ENEMY_1.id, delay: 4000},
        ]
    },
    {
        waveNumber: 2,
        spawns: [
            { type: ENEMY_TYPES.ENEMY_1.id, delay: 0 },
            { type: ENEMY_TYPES.ENEMY_3.id, delay: 500 },
            { type: ENEMY_TYPES.ENEMY_3.id, delay: 700 },
            { type: ENEMY_TYPES.ENEMY_1.id, delay: 800 },
            { type: ENEMY_TYPES.ENEMY_1.id, delay: 900 },
            { type: ENEMY_TYPES.ENEMY_2.id, delay: 1000 },
            { type: ENEMY_TYPES.ENEMY_1.id, delay: 2000 },
            { type: ENEMY_TYPES.ENEMY_2.id, delay: 4000 },
            { type: ENEMY_TYPES.ENEMY_4.id, delay: 6000 },
            { type: ENEMY_TYPES.ENEMY_3.id, delay: 7000 },
            { type: ENEMY_TYPES.ENEMY_3.id, delay: 8000 },
            { type: ENEMY_TYPES.ENEMY_2.id, delay: 9000 },
            { type: ENEMY_TYPES.ENEMY_4.id, delay: 10000 },
        ]
    },
    {
        waveNumber: 3,
        spawns: [
            { type: ENEMY_TYPES.ENEMY_3.id, delay: 0 },
            { type: ENEMY_TYPES.ENEMY_3.id, delay: 500 },
            { type: ENEMY_TYPES.ENEMY_3.id, delay: 600 },
            { type: ENEMY_TYPES.ENEMY_1.id, delay: 700 },
            { type: ENEMY_TYPES.ENEMY_1.id, delay: 900 },
            { type: ENEMY_TYPES.ENEMY_2.id, delay: 1000 },
            { type: ENEMY_TYPES.ENEMY_2.id, delay: 2000 },
            { type: ENEMY_TYPES.ENEMY_2.id, delay: 3000 },
            { type: ENEMY_TYPES.ENEMY_4.id, delay: 6000 },
            { type: ENEMY_TYPES.ENEMY_4.id, delay: 7000 },
            { type: ENEMY_TYPES.ENEMY_4.id, delay: 7500 },
            { type: ENEMY_TYPES.ENEMY_4.id, delay: 8000 },
            { type: ENEMY_TYPES.ENEMY_4.id, delay: 8500 },
        ]
    },
];