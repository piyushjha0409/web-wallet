import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";


type Props = {
    mnemonic: string;
}

export function EthWallet({ mnemonic }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [walletAddress, setWalletAddress] = useState<string[]>([]);

  return (
    <div>
      <button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
          const hdNode = HDNodeWallet.fromSeed(seed);
          const child = hdNode.derivePath(derivationPath);
          const privateKey = child.privateKey;
          const wallet = new Wallet(privateKey);
          setCurrentIndex((prev) => prev + 1);
          setWalletAddress([...walletAddress, wallet.address]);
        }}
      >
        Add Ethereum wallet
      </button>

      {walletAddress.map(p => 
        <div>
            Eth - {p}
        </div>
      )}
    </div>
  );
}
