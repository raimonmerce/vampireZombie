import Dungeon from '../../classes/dungeon/main/Dungeon';
import Room from '../../classes/dungeon/main/Room';
import { useEffect, useState } from 'react';
import Room3D from './Room3D';

type Dungeon3DProps = {
  dungeon: Dungeon;
};

export default function Dungeon3D({ dungeon }: Dungeon3DProps) {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const dungeonFloor = dungeon.getFloor(0);
    if (!dungeonFloor) return;
    const loadedRooms = Array.from(dungeonFloor.getRooms());
    setRooms(loadedRooms);
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
    </>
  );
}
