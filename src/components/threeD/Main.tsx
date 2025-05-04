import Dungeon3D from "./Dungeon3D";
import Dungeon from '../../classes/dungeon/main/Dungeon'
import {Canvas} from "@react-three/fiber"
import {OrbitControls} from "@react-three/drei" 
type MainProps = {
    dungeon: Dungeon | null
}

export default function Main({dungeon}: MainProps) {


  return (
    <>
      <Canvas style={{width: "100vw", height:"100vh", background: "green"}}>
        {dungeon &&
            <Dungeon3D dungeon={dungeon}/>
        }
        <OrbitControls/>
      </Canvas>

    </>
  )
}