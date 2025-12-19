export const MAP_WIDTH = 15;
export const MAP_HEIGHT = 10;
export const TILE_SIZE = 64;

export const initialMapGrid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export const ENEMY_PATH = [
    { x: 14 * TILE_SIZE + TILE_SIZE / 2, y: 7 * TILE_SIZE + TILE_SIZE / 2 }, 
    { x: 13 * TILE_SIZE + TILE_SIZE / 2, y: 7 * TILE_SIZE + TILE_SIZE / 2 }, 
    { x: 12 * TILE_SIZE + TILE_SIZE / 2, y: 7 * TILE_SIZE + TILE_SIZE / 2 }, 
    { x: 12 * TILE_SIZE + TILE_SIZE / 2, y: 1 * TILE_SIZE + TILE_SIZE / 2 }, 
    { x: 1 * TILE_SIZE + TILE_SIZE / 2, y: 1 * TILE_SIZE + TILE_SIZE / 2 }, 
    { x: 1 * TILE_SIZE + TILE_SIZE / 2, y: 4 * TILE_SIZE + TILE_SIZE / 2 }, 
    { x: 10 * TILE_SIZE + TILE_SIZE / 2, y: 4 * TILE_SIZE + TILE_SIZE / 2 }, 
    { x: 10 * TILE_SIZE + TILE_SIZE / 2, y: 7 * TILE_SIZE + TILE_SIZE / 2 }, 
    { x: 2 * TILE_SIZE + TILE_SIZE / 2, y: 7 * TILE_SIZE + TILE_SIZE / 2 }, 
    { x: 1 * TILE_SIZE + TILE_SIZE / 2, y: 7 * TILE_SIZE + TILE_SIZE / 2 },
];