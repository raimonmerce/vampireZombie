import Tile from '../../classes/dungeon/main/Tile'
import {sizeTile} from "../../constants"

type Subtile3DProps = {
  x: number,
  z: number,
  size: number,
  color: string
}

function Subtile3D({x, z, size, color}: Subtile3DProps) {
  return(
    <mesh 
    position={[x,0,z]}
    rotation={[-Math.PI/2,0,0]}
  >
    <planeGeometry args={[size,size]}/>
    <meshBasicMaterial color={color}/>
  </mesh>
  )
}

type Tile3DProps = {
    tile: Tile
}

export default function Tile3D({tile}: Tile3DProps) {

  return (
    <>
      {tile.getType() === "Room" ?
        <Subtile3D x={tile.getPosition().x * sizeTile} z={tile.getPosition().y * sizeTile} size={sizeTile} color={"red"} />
        :
        <>
          <Subtile3D x={tile.getPosition().x * sizeTile} z={tile.getPosition().y * sizeTile} size={sizeTile/3} color={"brown"} />
          {tile.isGridOcupied("N") &&
            <Subtile3D x={tile.getPosition().x * sizeTile} z={tile.getPosition().y * sizeTile + 1} size={sizeTile/3} color={"brown"} />
          }
          {tile.isGridOcupied("E") &&
            <Subtile3D x={tile.getPosition().x * sizeTile + 1} z={tile.getPosition().y * sizeTile} size={sizeTile/3} color={"brown"} />
          }
          {tile.isGridOcupied("S") &&
            <Subtile3D x={tile.getPosition().x * sizeTile} z={tile.getPosition().y * sizeTile - 1} size={sizeTile/3} color={"brown"} />
          }
          {tile.isGridOcupied("W") &&
            <Subtile3D x={tile.getPosition().x * sizeTile - 1} z={tile.getPosition().y * sizeTile} size={sizeTile/3} color={"brown"} />
          }
        </>
      }
    </>
  )
}

