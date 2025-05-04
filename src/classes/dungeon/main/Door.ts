import { PositionXY } from "../../../types";

export default class Door {
    private position: PositionXY;
    constructor(
        position: PositionXY,
    ) {
        this.position = position;
    }

    getPosition(): PositionXY {
        return this.position;
    }
    
    setPosition(position: PositionXY): void {
        this.position = position;
    }
}