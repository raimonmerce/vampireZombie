import './App.css'
import Dungeon from './classes/dungeon/main/Dungeon'
import { useState } from 'react';
import Main from './components/threeD/Main';
import precreated from "./assets/precreated/dungeon.json" with { type: "json" };
import {DungeonData} from "./types"

function App() {
  const [dungeon, setDungeon] = useState<Dungeon | null>(null)
  const handleOnClick = () => {
    const dungeonData = precreated as DungeonData;
    const dungeonEntity = new Dungeon();
    dungeonEntity.load(dungeonData);
    console.log(dungeonData);
    dungeonEntity.getFloor(0).print();
    console.log("A");
    setDungeon(dungeonEntity)
    console.log("B");
  }

  return (
    <>
      <button onClick={handleOnClick}>
        Generate Room
      </button>

      <Main dungeon={dungeon}/>
    </>
  )
}

export default App
