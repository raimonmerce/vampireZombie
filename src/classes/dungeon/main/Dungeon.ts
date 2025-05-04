import DungeonFloor from "./DungeonFloor"
import {numberFloors} from "../../../constants"
import {DungeonData} from "../../../types"

export default class Dungeon {
    private name: string = "";
    private numberFloors: number = 0;
    private floors: DungeonFloor[] = [];
    
    constructor() {}

    generate() {
        this.name = "random";
        this.numberFloors = numberFloors;
        this.floors = [];
        for (let i = 0; i < this.numberFloors; ++i){
            const df = new DungeonFloor()
            df.generate(i)
            this.floors.push(df);
        }
    }

    load(data: DungeonData) {
        console.log("data", data)
        this.name = data.name;
        const floors = data.floors;
        this.numberFloors = Object.keys(floors).length;
        this.floors = [];

        for (const [floorKey, floorData] of Object.entries(floors)) {
            const floor = new DungeonFloor();
            floor.load(parseInt(floorKey, 10), floorData)
            this.floors.push(floor);
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