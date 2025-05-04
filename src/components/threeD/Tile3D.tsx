import Tile from '../../classes/dungeon/main/Tile'
import { useEffect, useState } from 'react';
import {sizeTile} from "../../constants"

type Tile3DProps = {
    tile: Tile
}

export default function Tile3D({tile}: Tile3DProps) {
  const [color, setColor] = useState<string>("red");
  const [size, setSize] = useState<number>(sizeTile);

  useEffect(() => {
    if (tile.getType() === "Room") setColor("red"); 
    else {
      setSize(sizeTile/3)
      setColor("brown");
    }    
  }, [tile])
  return (
    <>
      <mesh 
      position={[
        tile.getPosition().x * sizeTile,
        0,
        tile.getPosition().y * sizeTile
      ]}
      rotation={[-Math.PI/2,0,0]}
      >
        <planeGeometry args={[size,size]}/>
        <meshBasicMaterial color={color}/>
      </mesh>

    </>
  )
}

