import './App.css'
import Dungeon from './classes/dungeon/main/Dungeon'
import { useState } from 'react';
import Main from './components/threeD/Main';

function App() {
  const [dungeon, setDungeon] = useState<Dungeon | null>(null)
  const handleOnClick = () => {
    const newDungeon = new Dungeon(2, 10, 10);
    newDungeon.generate();
    newDungeon.getFloor(0).print();
    setDungeon(newDungeon)
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
