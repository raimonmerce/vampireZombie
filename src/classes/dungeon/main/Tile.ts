import { PositionXY, Grid3x3, TileType, TileStyle, CoordinatesType } from "../../../types";

export default class Tile {
    private position: PositionXY;
    private grid: Grid3x3;
    private type: TileType;
    private style: TileStyle;

    constructor(
        position: PositionXY,
        type: TileType,
        style: TileStyle
    ) {
        this.position = position;
        this.grid = this.generateInitialGrid(type);
        this.type = type;
        this.style = style;
    }

    private generateInitialGrid(type: TileType): Grid3x3 {
        switch (type) {
            case "Room":
                return {
                    NW: "Floor", N: "Floor", NE: "Floor",
                    W:  "Floor", C: "Floor", E:  "Floor",
                    SW: "Floor", S: "Floor", SE: "Floor"
                  };
            case "Corridor":
                return {
                    NW: null, N: null, NE: null,
                    W:  null, C: "Floor", E:  null,
                    SW: null, S: null, SE: null
                };
            default:
                throw new Error(`Invalid TileType: ${type}`);
        }
    }

    connectTiles(tileId: CoordinatesType): void {
        this.grid[tileId] = "Floor";
    }

    getPosition(): PositionXY {
        return this.position;
    }

    setPosition(position: PositionXY): void {
      this.position = position;
    }

    getType(): TileType {
        return this.type;
    }

    setType(type: TileType): void {
      this.type = type;
    }

    getStyle(): TileStyle {
        return this.style;
    }

    setStyle(style: TileStyle): void {
      this.style = style;
    }
}