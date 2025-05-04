import Floor from "./Floor"
import Wall from "./Wall"
import Door from "./Door"
import Roof from "./Roof"
import Tile from "./Tile"
import { PositionXY} from "../../../types";

export default class Room {
    private floor: Floor;
    private roof: Roof;
    private walls: Set<Wall> = new Set();
    private doors: Set<Door> = new Set();
    private positions: PositionXY[];

    constructor(positions: PositionXY[]) {
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