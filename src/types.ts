export type PositionXY = {
    x: number,
    y: number
}

export type CoordinatesType = 
  | "NW" | "N" | "NE"
  | "W"  | "C" | "E"
  | "SW" | "S" | "SE";


export type Grid3x3 = Record<CoordinatesType, SubtileType>;

export type TileType = null | "Room" | "Corridor";

export type SubtileType = null | "Floor" | "Other";

export type TileStyle = "Stone" | "Wood";

export type WallStyle = "Stone" | "Wood";