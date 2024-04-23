import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const range = (e) => {
    setLength(parseInt(e.target.value));
  };

  const charAllowed = () => {
    setCharacter((previous) => !previous);
  };

  const numberAllowed = () => {
    setNumber((previous) => !previous);
  };

  const passwordGenerator = useCallback(() => {
    let code = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*()_+={}`~[]";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      code += str.charAt(char);
    }

    setPassword(code);
  }, [length, number, character]);

  const handleCopy = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <>
      <h1 className="mb-12">Password Generator</h1>
      <div className="flex overflow-hidden">
        <input
          type="text"
          value={password}
          placeholder="Password"
          // ref={passwordRef}
          readOnly
          className="w-full bg-slate-10 px-3 py-4"
        />
        <button onClick={handleCopy} className="bg-orange-500 rounded-none">
          Copy
        </button>
      </div>
      <div className="flex items-center mt-6">
        <input
          className="cursor-pointer"
          type="range"
          min={8}
          max={20}
          value={length}
          onChange={range}
        />
        <label className="ml-2">{length}</label>
      </div>
      <div className="flex items-center gap-x-1 mt-3">
        <input type="checkbox" checked={number} onChange={numberAllowed} />
        <label className="ml-2">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1 mt-3">
        <input type="checkbox" checked={character} onChange={charAllowed} />
        <label className="ml-2">Characters</label>
      </div>
    </>
  );
}

export default App;
