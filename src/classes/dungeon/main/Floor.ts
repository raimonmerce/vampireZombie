import Tile from "./Tile"

export default class Floor {
    private tiles: Set<Tile> = new Set();
    constructor() {}

    addTile(tile: Tile): void {
        this.tiles.add(tile);
    }

    getTiles(): Tile[] {
        return Array.from(this.tiles);
    }
}