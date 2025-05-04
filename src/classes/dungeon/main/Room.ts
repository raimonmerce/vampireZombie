import Floor from "./Floor"
import Wall from "./Wall"
import Door from "./Door"
import Roof from "./Roof"
import Tile from "./Tile"
import { PositionXY} from "../../../types";

export default class Room {
    private roomId: number;
    private floor: Floor;
    private roof: Roof;
    private walls: Set<Wall> = new Set();
    private doors: Set<Door> = new Set();
    private positions: PositionXY[];

    constructor(id: number, positions: PositionXY[]) {
        this.roomId = id;
        this.positions = positions;
        this.floor = new Floor();
        this.positions.map((position: PositionXY) => {
            this.floor.addTile(new Tile(position, "Room", "Stone")) 
        })
        this.roof = new Roof();
    }

    getFloor(): Floor {
        return this.floor;
    }
}