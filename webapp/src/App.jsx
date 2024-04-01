const tg = window.Telegram.WebApp
import { useEffect } from "react";

function App() {

  useEffect( ()=>{
    tg.ready();
  })
  
  const onClose = ()=>{
    tg.close()
  }

  return (
    <>
      <div>
        <p className="bg-red-400">ffdsfdsfdsfdsfds</p>
        <button onClick={onClose}>close</button>
      </div>
    </>
  );
}

export default App;
