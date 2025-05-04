import { PositionXY} from "../../../types";
import Tile from "./Tile"

export default class Corridor {
    private roomId: number;
    private tiles: Set<Tile> = new Set();
    constructor(id: number, positions: PositionXY[]) {
        this.roomId = id;
        positions.map((position: PositionXY) => {
            this.tiles.add(new Tile(position, "Corridor", "Wood")) 
        })
    }

    getTiles(): Tile[] {
        return Array.from(this.tiles);
    }
}