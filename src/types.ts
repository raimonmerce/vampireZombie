import Tile from './classes/dungeon/main/Tile';

export type PositionXY = {
    x: number,
    y: number
}

export type DoorData = {
  x: number,
  y: number,
  d: 1|2|3|4
}

export type CoordinatesType = 
  | "NW" | "N" | "NE"
  | "W"  | "C" | "E"
  | "SW" | "S" | "SE";


export type Grid3x3 = Record<CoordinatesType, SubtileType>;

export type TileType = null | "Room" | "Corridor";

export type TileGrid = null | Tile;

export type SubtileType = null | "Floor" | "Other";

export type TileStyle = "Stone" | "Wood";

export type WallStyle = "Stone" | "Wood";

export type DungeonData = {
  name: string;
  floors: {
    [floorNumber: string]: DungeonFloorData;
  };
};

export type DungeonFloorData = {
  width: number;
  height: number;
  rooms: {
    [roomId: string]: RoomData;
  };
  corridors: {
    [corridorId: string]: {
      tiles: PositionXY[];
    };
  };
}

export type RoomData = {
  tiles: PositionXY[];
  doors: {
    [doorId: string]: DoorData;
  }
}

/*
UP: 0
RIGHT: 1
BOTTOM: 2
LEFT: 3
*/