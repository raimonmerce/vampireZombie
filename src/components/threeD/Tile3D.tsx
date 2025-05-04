import Tile from '../../classes/dungeon/main/Tile'
import { useEffect } from 'react';
import {sizeTile} from "../../constants"

type Tile3DProps = {
    tile: Tile
}

export default function Tile3D({tile}: Tile3DProps) {
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
        <planeGeometry args={[sizeTile,sizeTile]}/>
        <meshBasicMaterial color={"red"}/>
      </mesh>

    </>
  )
}

