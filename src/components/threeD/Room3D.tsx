import Room from '../../classes/dungeon/main/Room'
import Floor from '../../classes/dungeon/main/Floor'
import { useEffect, useState } from 'react';
import Floor3D from './Floor3D';

type Room3DProps = {
    room: Room
}

export default function Room3D({room}: Room3DProps) {
  const [floor, setFloor] = useState<Floor | null>(null);

  useEffect(() => {
    const floor = room.getFloor();
    setFloor(floor);
  }, [room]);

  return (
    <>
      {floor &&
        <Floor3D floor={floor} />
      }
    </>
  );
}

