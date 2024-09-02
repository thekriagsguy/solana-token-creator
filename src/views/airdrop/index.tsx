import React, { FC, useEffect, useCallback, Dispatch, SetStateAction } from "react";
import useUserSOLBalanceStore from "../../stores/useUserSOLBalanceStore";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, TransactionSignature } from "@solana/web3.js";
import { notify } from "../../utils/notifications";
import { AiOutlineClose } from "react-icons/ai";

import Branding from "../../components/Branding";

interface AirdropViewProps {
  setOpenAirdrop: Dispatch<SetStateAction<boolean>>;
}


export const AirdropView: FC<AirdropViewProps> = ({setOpenAirdrop}) => {

  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const onClick = useCallback(async() => {
    if (!publicKey) {
      notify({
        type: "error",
        message: "Sorry Error",
        description: "Wallet not Connected"
      });
      return;
    }

    let signature: TransactionSignature = "";
    try {
      signature = await connection.requestAirdrop(publicKey,LAMPORTS_PER_SOL);
      notify({
        type: "success",
        message: "Airdrop Successfully Recieved",
        txid: signature
      });

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature
      });

      getUserSOLBalance(publicKey, connection);
      
    } catch (error: any) {
      notify({
        type: "error",
        message: "Airdrop Failed",
        description: error?.message,
        txid: signature
      });
      console.log("error: ", `Airdrop Failed ${error?.message}`, signature);
    }
  }, [publicKey, connection, getUserSOLBalance]);

  const CloseModal = () => (
    <a onClick={() => setOpenAirdrop(false)} className="group mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-blue-600/60">
      <i className="text-2xl text-white group-hover:text-white">
        <AiOutlineClose />
      </i>
    </a>
  );

  return(
    <>
        <section className="flex w-full items-center py-6 px-0 lg:p-10">
          <div className="container">
            <div className="bg-default-950/40 mx-auto max-w-5xl overflow-hidden rounded-2xl backdrop-blur-2xl">

             <div className="grid gap-10 lg:grid-cols-2">
              <Branding image="auth-img" title="To Build your Solana Token Creator" message="Try and create your first ever Solana Project" />
              <div className="lg:ps-0 flex h-full flex-col p-10">
                <div className="pb-10">
                  <a className="flex">
                    <img src="assets/images/logo1.png" alt="logo" className="h-10"></img>
                  </a>
                </div>

                <div className="my-auto pb-6 text-center">
                  <h4 className="mb-4 text-2xl font-bold text-white">
                    {
                      wallet && (
                        <p>SOL Balance: {(balance || 0).toLocaleString()}</p>
                      )
                    }
                  </h4>
                  <p className="text-default-300 mx-auto mb-5 max-w-sm">
                    You can Claim your 1 Airdrop to Test/Create Token in our Platform
                  </p>

                  <div className="flex items-start justify-center">
                    <img src="assets/images/logout.svg" alt="" className="h-40"></img>
                  </div>

                    <div className="mb-6 text-center">
                      <button onClick={onClick} disabled={!publicKey} className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500">
                        <span className="fw-bold">AirDrop 1 Sol</span>
                      </button>
                      <CloseModal />
                    </div>
                  
                </div>
              </div>
             </div>
            </div>
          </div>
        </section>
    </>
  )
};