import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

type Props = {
  mnemonic: string;
};

export function SolanaWallet({ mnemonic }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  return (
    //TODO: Add try and catch phrase
    <div>
      <button
        onClick={async () => {
          try {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            //m represents the master node
            // 44 represents the role of bip44
            // 501 is the blockchain code often used for the solana operations/ api calls
            //currentIndex is each time we make a wallet we would increment it by one
            //0 is the change which typically represents the non-change address
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIndex((prev) => prev + 1);
            setPublicKeys([...publicKeys, keypair.publicKey.toString()]);
          } catch (err) {
            setError("Error generating the wallet keys!");
          }
        }}
      >
        Add Solana Wallets
      </button>

      {error && <div>{error}</div>}

      {publicKeys.map((p, index) => (
        <div key={index}>
          Wallet {index + 1}: {p}
        </div>
      ))}
    </div>
  );
}
