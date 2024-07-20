import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()_+{}|";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }
    setPassword(pass);
  }, [length, charAllowed, numAllowed, setPassword]);

 useEffect(()=>{
  passGen()

 } , [length , numAllowed , charAllowed ,passGen])

const passRef= useRef(null)
const copy=useCallback(()=>{
    passRef.current?.select();
  window.navigator.clipboard.writeText(password)
} , [password])

  



  return (
    <>
      <div className="w-full h-screen bg-yellow-200 text-white flex text-xl flex-wrap items-center justify-center ">
        <div className="bg-gray-800  mx-10 flex flex-col justify-center items-center h-2/4 my-8 p-4 rounded-lg shadow-xl shadow-gray-900   ">
         
             <div className=" text-center text-lg font-serif text-yellow-400 tracking-wide mb-4  ">
            <h1>PASSWORD GENERATOR</h1>
          </div>

          <div className="input flex justify-center ">
            <input
              type="text "
              value={password}
              placeholder="Password"
              readOnly
              ref={passRef}
              className="w-5/6 rounded-xl text-black outline-none border-none px-3 py-2 my-2 mx-1"
            />
            <button onClick={copy}  className="bg-blue-700 w-1/6 rounded-xl text-xs h-10 my-2">
              Save
            </button>
          </div>
          <div className="wide-container text-xs gap-x-2 bg-black h-18 p-6 flex justify-between  items-center rounded-3xl mt-12 ">
            <div className="flex flex-col gap-x-2">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                className="cursor-pointer w-16 "
              />
              <label> Length : {length}</label>
            </div>
            <div className="numbers gap-x-2">
              <input type="checkbox" defaultChecked={numAllowed} onChange={()=>{setNumAllowed((prev)=>!prev)}} className="mx-1" />
              <label>numbers</label>
            </div>
            <div className="numbers gap-x-2">
              <input type="checkbox" defaultChecked={charAllowed}  onChange={()=>{setCharAllowed((prev)=>!prev)}} className="mx-1" />
              <label>Character</label>
            </div>
         
          </div>
          </div>
         
        </div>
     
    </>
  );
}

export default App;
