import { PositionXY } from "../../../types";

export default class Floor {
    private tilePositions: Set<PositionXY> = new Set();
    constructor() {}

    addTile(tilePosition: PositionXY): void {
        this.tilePositions.add(tilePosition);
    }

    getTiles(): PositionXY[] {
        return Array.from(this.tilePositions);
    }
}