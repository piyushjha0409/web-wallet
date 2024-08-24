import { useState } from "react";
import "./App.css";
import { generateMnemonic } from "bip39";
import { EthWallet } from "./components/EthWallet";
import { SolanaWallet } from "./components/SolanaWallet";

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <button
        onClick={async function () {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }}
        style={{
          fontSize: "12px",
          paddingLeft: "4px",
          paddingRight: "4px",
          marginRight: "12px",
        }}
      >
        Generate Seed Phrase
      </button>

      <input type="text" value={mnemonic} />

      <div style={{ padding: "12px"}}>
      <SolanaWallet mnemonic={mnemonic} />
      </div>
      <div style={{ padding: "12px"}}> 
      <EthWallet mnemonic={mnemonic} />
      </div>
    </>
  );
}

export default App;
