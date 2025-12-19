export const TILE_SIZE = 64; 

export const TOWER_CONFIGS = {
    BASIC_CANNON: {
        id: 'BASIC_CANNON',
        name: '基本火砲',
        price: 50,
        damage: 10,
        cooldown: 500,
        pixelRange: 3 * TILE_SIZE, 
        projectileSpeed: 200,
        projectileColor: 'orange',
    },
    SNIPER_TOWER: {
        id: 'SNIPER_TOWER',
        name: '狙擊炮',
        price: 150,
        damage: 50, 
        cooldown: 1500, 
        pixelRange: 7 * TILE_SIZE, 
        projectileSpeed: 400,
        projectileColor: 'red',
    }
};