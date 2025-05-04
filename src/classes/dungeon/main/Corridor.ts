import { PositionXY} from "../../../types";

export default class Corridor {
    private roomId: number;
    private tiles: Set<PositionXY> = new Set();
    constructor(id: number, positions: PositionXY[]) {
        this.roomId = id;
        positions.map((position: PositionXY) => {
            this.tiles.add(position); 
        })
    }

    getTiles(): PositionXY[] {
        return Array.from(this.tiles);
    }
}