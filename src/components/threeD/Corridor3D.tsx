import Corridor from '../../classes/dungeon/main/Corridor'
import Tile from '../../classes/dungeon/main/Tile'
import { useEffect, useState } from 'react';
import Tile3D from './Tile3D';

type Corridor3DProps = {
  corridor: Corridor
}

export default function Corridor3D({corridor}: Corridor3DProps) {
  const [tiles, setTiles] = useState<Tile[]>([]);
  
  useEffect(() => {
    setTiles(corridor.getTiles());    
  }, [corridor])

  return (
    <>
      {tiles.map((tile, index) => (
        <Tile3D key={index} tile={tile} />
      ))}
    </>
  )
}
