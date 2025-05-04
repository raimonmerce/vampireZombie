import Room from "./Room"
import Corridor from "./Corridor"
import {PositionXY, TileType} from "../../../types"

export default class DungeonFloor {
    private rooms: Set<Room> = new Set();
    private corridors: Set<Corridor> = new Set();
    private grid: TileType[][];
    private width: number;
    private height: number;

    constructor(
        width: number,
        height: number,
        numberRooms: number
    ) {
        this.height = height;
        this.width = width;
        this.grid = Array.from({ length: height }, () =>
            Array.from({ length: width }, () => null)
        );
        for (let i = 0; i < numberRooms; ++i){
            this.rooms.add(new Room(this.getAvailableRoom()))
        };
        this.connectRooms();
    }

    getAvailableRoom(): PositionXY[] {
        const attempts = 100;
        for (let i = 0; i < attempts; i++) {
            const tile = this.getRandomEmptyTile();
            if (!tile) break;
        
            const { x, y } = tile;
            if (!this.hasAdjacentRoom(x, y)) {
                this.setTile(x, y, "Room");
                return [{ x, y }];
            }
        }
      
        throw new Error("No valid position found for a new room.");
    }

    private hasAdjacentRoom(x: number, y: number): boolean {
        const directions = [
            { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
            { dx: -1, dy: 0 },                   { dx: 1, dy: 0 },
            { dx: -1, dy: 1 },  { dx: 0, dy: 1 },  { dx: 1, dy: 1 },
        ];
      
        return directions.some(({ dx, dy }) => {
            const tile = this.getTile(x + dx, y + dy);
            return tile === "Room";
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
        const roomCenters = Array.from(this.rooms).map(r => r.getFloor().getTiles()[0].getPosition());
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
            if (this.getTile(x, y) === "Corridor") return false;
            x += x < to.x ? 1 : -1;
        }
      
        while (y !== to.y) {
            if (this.getTile(x, y) === "Corridor") return false;
            y += y < to.y ? 1 : -1;
        }
      
        return this.getTile(x, y) !== "Corridor";
    }

    private drawCorridor(from: PositionXY, to: PositionXY): void {
        let x = from.x;
        let y = from.y;
      
        while (x !== to.x) {
            this.setTile(x, y, "Corridor");
            x += x < to.x ? 1 : -1;
        }
      
        while (y !== to.y) {
            this.setTile(x, y, "Corridor");
            y += y < to.y ? 1 : -1;
        }
      
        this.setTile(x, y, "Corridor");
    }

    getTile(x: number, y: number): TileType | undefined {
        if (y < 0 || y >= this.height || x < 0 || x >= this.width) return undefined;
        return this.grid[y][x];
    }
    
    setTile(x: number, y: number, type: TileType): void {
        if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
          this.grid[y][x] = type;
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
                const tile = this.getTile(x, y);
                switch (tile) {
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