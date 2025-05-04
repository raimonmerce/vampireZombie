import Dungeon from '../../classes/dungeon/main/Dungeon';
import DungeonFloor from '../../classes/dungeon/main/DungeonFloor';
import Room from '../../classes/dungeon/main/Room';
import Corridor from '../../classes/dungeon/main/Corridor';
import { useEffect, useState } from 'react';
import Tile3D from './Tile3D';

type Dungeon3DProps = {
  dungeon: Dungeon;
};

export default function Dungeon3D({ dungeon }: Dungeon3DProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [corridors, setCorridors] = useState<Corridor[]>([]);
  const [currentFloor, setCurrentFloor] = useState<DungeonFloor>();

  useEffect(() => {
    const dungeonFloor = dungeon.getFloor(0) as DungeonFloor;
    if (!dungeonFloor) return;
    setCurrentFloor(dungeonFloor)
    const loadedRooms = dungeonFloor.getRooms();
    setRooms(loadedRooms);
    const loadedCorridors = dungeonFloor.getCorridor();
    setCorridors(loadedCorridors);
  }, [dungeon]);

  if (!currentFloor) return;

  return (
    <>
      <mesh>
        <boxGeometry/>
        <meshBasicMaterial color={"blue"}/>
      </mesh>
      {rooms.map((room) => (
        room.getFloor().getTiles().map((position, index) => {
          const tile = currentFloor.getTile(position)
          if (!tile) return;
          return (
            <Tile3D key={index} tile={tile} />
          )
        })
      ))}
      {corridors.map((corridor) => (
        corridor.getTiles().map((position, index) => {
          const tile = currentFloor.getTile(position)
          if (!tile) return;
          return (
            <Tile3D key={index} tile={tile} />
          )
        })
      ))}
    </>
  );
}
