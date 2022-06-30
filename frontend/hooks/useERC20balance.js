import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
const useERC20Balance = (props) => {
  const { account } = useMoralisWeb3Api();
  const { isInitialized } = useMoralis();
  let { walletAddress, chainId } = useMoralisDapp();
  console.log("[ND][useERC20Balance] props:", props);
  // if there's an external walletAddressed passed by props, use that
  walletAddress = props.address ?? walletAddress;
  chainId = props.chainId ?? "0x01"
  const [assets, setAssets] = useState();

  console.log("[ND][useERC20Balance] address: %c,  props: %c", walletAddress, props);



  if (props.symbol !== undefined) {
    //  pass param to `fetchERC20Balance(symbol)`

  }

  useEffect(() => {
    if (isInitialized) {
      fetchERC20Balance()
        .then((balance) => setAssets(balance))
        .catch((e) => alert(e.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, chainId, walletAddress]);

  const fetchERC20Balance = async () => {
    console.log("[useERC20balance][result] fetching");
      // let thecall = account;
    if (props.symbol !== undefined) {
      //  pass param to `fetchERC20Balance(symbol)`
      
    }
    return await account
      .getTokenBalances({
        address: walletAddress,
        chain: chainId,
      })
      .then((result) => {
        console.log("[useERC20balance][result] result:", result);
        return result;
      })
      .catch((e) => alert(e.message));
  };

  return { fetchERC20Balance, assets };
};

export default useERC20Balance;
