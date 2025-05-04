import DungeonFloor from "./DungeonFloor"
import {minRooms, maxRooms} from "../../../constants"

export default class Dungeon {
    private numberFloors: number;
    private floors: DungeonFloor[];
    private width: number;
    private height: number;
    constructor(
        numberFloors: number,
        width: number,
        height: number
    ) {
        this.height = height;
        this.width = width;
        this.numberFloors = numberFloors;
        this.floors = [];
    }

    private getRandomElement(
        lower: number,
        upper: number
    ): number {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower;
    }

    generate() {
        this.floors = [];
        for (let i = 0; i < this.numberFloors; ++i){
            this.floors.push(
                new DungeonFloor(
                    this.width,
                    this.height,
                    this.getRandomElement(minRooms, maxRooms)
                )
            );
        }
    }

    getFloor(level: number) : DungeonFloor{
        return this.floors[level];
    }

    print() {
        console.log("Dungeon:")
        for (let i = 0; i < this.floors.length; ++i){
            console.log("-Floor ", i,":")
            this.floors[i].print()
        }
    }
}