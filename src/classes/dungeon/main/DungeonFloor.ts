import Room from "./Room"
import Corridor from "./Corridor"
import Tile from "./Tile"
import {PositionXY, TileGrid} from "../../../types"
import {minRooms, maxRooms, minWidthRoom, maxHeigthRoom} from "../../../constants"
import {getRandomElementFronRange} from "../../../utils"
import {DungeonFloorData} from "../../../types"

export default class DungeonFloor {
    private roomNumber: number = 0;
    private rooms: Set<Room> = new Set();
    private corridors: Set<Corridor> = new Set();
    private grid: TileGrid[][] = [];
    private width: number = 0;
    private height: number = 0;

    constructor() {}

    load(num: number, data: DungeonFloorData): void {
        this.roomNumber = num;
        this.height = data.height;
        this.width = data.width;
        this.grid = Array.from({ length: this.height }, () =>
            Array.from({ length: this.width }, () => null)
        );

        this.rooms = new Set();

        for (const [roomKey, roomData] of Object.entries(data.rooms)) {
            const tiles = roomData.tiles;
            tiles.map((tile) => {
                this.setTile(tile, new Tile(tile, "Room", "Stone"));
                //new Tile(position, "Room", "Stone")
            })
            this.rooms.add(new Room(parseInt(roomKey, 10), roomData.tiles));
        }

        this.corridors = new Set();

        for (const [corridoKey, corridorData] of Object.entries(data.corridors)) {
            const tiles = corridorData.tiles;
            tiles.map((tile) => {
                this.setTile(tile, new Tile(tile, "Corridor", "Wood"));
            })
            this.corridors.add(new Corridor(parseInt(corridoKey, 10), corridorData.tiles));
        }
    }

    generate(num: number): void {
        this.roomNumber = num;
        this.height = getRandomElementFronRange(minWidthRoom, maxHeigthRoom);
        this.width = getRandomElementFronRange(minWidthRoom, maxHeigthRoom);
        this.grid = Array.from({ length: this.height }, () =>
            Array.from({ length: this.width }, () => null)
        );
        const numberRooms = getRandomElementFronRange(minRooms, maxRooms)
        for (let i = 0; i < numberRooms; ++i){
            this.rooms.add(new Room(i, this.getAvailableRoom()))
        };
    }

    getAvailableRoom(): PositionXY[] {
        const attempts = 100;
        for (let i = 0; i < attempts; i++) {
            const tile = this.getRandomEmptyTile();
            if (!tile) break;
        
            if (!this.hasAdjacentRoom(tile)) {
                this.setTile(tile, new Tile(tile, "Room", "Stone"));
                return [tile];
            }
        }
      
        throw new Error("No valid position found for a new room.");
    }

    private hasAdjacentRoom(pos: PositionXY): boolean {
        const directions = [
            { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
            { dx: -1, dy: 0 },                   { dx: 1, dy: 0 },
            { dx: -1, dy: 1 },  { dx: 0, dy: 1 },  { dx: 1, dy: 1 },
        ];
      
        return directions.some(({ dx, dy }) => {
            const x = pos.x + dx;
            const y = pos.y + dy;
            const tile = this.getTile({x,y});
            return tile?.getType() === "Room";
        });
    }

    private getRandomEmptyTile(): PositionXY | null {
        const emptyTiles = this.getEmptyTiles();
        if (emptyTiles.length === 0) return null;
        const index = Math.floor(Math.random() * emptyTiles.length);
        return emptyTiles[index];
    }

    getEmptyTiles(): PositionXY[] {
        const empty: PositionXY[] = [];
      
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.grid[y][x] === null) {
                empty.push({ x, y });
                }
            }
        }
      
        return empty;
    }

    public connectRooms(): void {
        const roomCenters = Array.from(this.rooms).map(r => r.getFloor().getTiles()[0]);
        const connected: PositionXY[] = [roomCenters[0]];
        const unconnected = roomCenters.slice(1);
      
        while (unconnected.length > 0) {
            let connectedRoom = null;
            let targetRoom = null;
        
            for (const target of unconnected) {
                for (const source of connected) {
                if (this.isCorridorFreePath(source, target)) {
                    connectedRoom = source;
                    targetRoom = target;
                    break;
                }
                }
                if (connectedRoom && targetRoom) break;
            }
        
            if (!connectedRoom || !targetRoom) {
                throw new Error("No valid non-intersecting corridor path found.");
            }
        
            this.drawCorridor(connectedRoom, targetRoom);
            connected.push(targetRoom);
            unconnected.splice(unconnected.indexOf(targetRoom), 1);
        }
    }

    private isCorridorFreePath(from: PositionXY, to: PositionXY): boolean {
        let x = from.x;
        let y = from.y;
      
        // Try horizontal first
        while (x !== to.x) {
            if (this.getTile(from)?.getType() === "Corridor") return false;
            x += x < to.x ? 1 : -1;
        }
      
        while (y !== to.y) {
            if (this.getTile(from)?.getType() === "Corridor") return false;
            y += y < to.y ? 1 : -1;
        }
      
        return this.getTile(from)?.getType() !== "Corridor";
    }

    private drawCorridor(from: PositionXY, to: PositionXY): void {
        let x = from.x;
        let y = from.y;
      
        while (x !== to.x) {
            this.setTile(from, new Tile(from, "Corridor", "Wood"));
            x += x < to.x ? 1 : -1;
        }
      
        while (y !== to.y) {
            this.setTile(from, new Tile(from, "Corridor", "Wood"));
            y += y < to.y ? 1 : -1;
        }
      
        this.setTile(from, new Tile(from, "Corridor", "Wood"));
    }

    getTile(pos: PositionXY): TileGrid | undefined {
        if (pos.y < 0 || pos.y >= this.height || pos.x < 0 || pos.x >= this.width) return undefined;
        return this.grid[pos.y][pos.x];
    }
    
    setTile(pos: PositionXY, type: TileGrid): void {
        if (pos.y >= 0 && pos.y < this.height && pos.x >= 0 && pos.x < this.width) {
          this.grid[pos.y][pos.x] = type;
        }
    }

    addRoom(element: Room): void {
        this.rooms.add(element);
    }
    
    removeRoom(element: Room): void {
        this.rooms.delete(element);
    }
    
    getRooms(): Room[] {
        return Array.from(this.rooms);
    }
    
    addCorridor(element: Corridor): void {
        this.corridors.add(element);
    }
    
    removeCorridor(element: Corridor): void {
        this.corridors.delete(element);
    }
    
    getCorridor(): Corridor[] {
        return Array.from(this.corridors);
    }

    print(): void {
        const horizontalEdge = '.' + '.'.repeat(this.width) + '.';
        console.log(horizontalEdge);
      
        for (let y = 0; y < this.height; y++) {
            let row = '.';
            for (let x = 0; x < this.width; x++) {
                const tile = this.getTile({x, y});
                switch (tile?.getType()) {
                case "Room":
                    row += 'R';
                    break;
                case "Corridor":
                    row += 'C';
                    break;
                default:
                    row += ' ';
                }
            }
            row += '.';
            console.log(row);
        }
      
        console.log(horizontalEdge);
    }
}