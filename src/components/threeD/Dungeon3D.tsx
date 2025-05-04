import Dungeon from '../../classes/dungeon/main/Dungeon';
import Room from '../../classes/dungeon/main/Room';
import Corridor from '../../classes/dungeon/main/Corridor';
import { useEffect, useState } from 'react';
import Room3D from './Room3D';
import Corridor3D from './Corridor3D';

type Dungeon3DProps = {
  dungeon: Dungeon;
};

export default function Dungeon3D({ dungeon }: Dungeon3DProps) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [corridors, setCorridors] = useState<Corridor[]>([]);

  useEffect(() => {
    const dungeonFloor = dungeon.getFloor(0);
    if (!dungeonFloor) return;
    const loadedRooms = dungeonFloor.getRooms();
    setRooms(loadedRooms);
    const loadedCorridors = dungeonFloor.getCorridor();
    setCorridors(loadedCorridors);
  }, [dungeon]);

  return (
    <>
      <mesh>
        <boxGeometry/>
        <meshBasicMaterial color={"blue"}/>
      </mesh>
      {rooms.map((room, index) => (
        <Room3D key={index} room={room} />
      ))}
      {corridors.map((corridor, index) => (
        <Corridor3D key={index} corridor={corridor} />
      ))}
    </>
  );
}
