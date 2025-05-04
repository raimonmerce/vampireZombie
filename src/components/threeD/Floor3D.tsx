import Floor from '../../classes/dungeon/main/Floor'
import Tile from '../../classes/dungeon/main/Tile'
import { useEffect, useState } from 'react';
import Tile3D from './Tile3D';

type Floor3DProps = {
  floor: Floor
}

export default function Floor3D({floor}: Floor3DProps) {
    const [tiles, setTiles] = useState<Tile[]>([]);
  
  useEffect(() => {
    setTiles(floor.getTiles());    
  }, [floor])

  return (
    <>
      {tiles.map((tile, index) => (
        <Tile3D key={index} tile={tile} />
      ))}
    </>
  )
}

