import React from "react";
import { useWeb3React } from "@web3-react/core";
import networkIDNames from "../utils/networkNames";
import { truncateAddress } from "../utils/utils";

const Account = ({ fontColor }) => {
  const { active, account, chainId, activate, deactivate } = useWeb3React();

  return (
    <div
      className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4"
      style={{ color: fontColor }}
    >
      <div className="flex flex-col text-sm">
        {active ? (
          <span className="flex items-center">
            <p>Connected to:&nbsp;</p>
            <p className="font-semibold">{truncateAddress(account)}</p>
          </span>
        ) : (
          <p className="font-semibold">Not connected</p>
        )}
        <div className="flex items-center">
          <p>Status:&nbsp;</p>
          <span className={active ? "text-green-500" : "text-red-500"}>
            {active ? "🟢" : "🔴"}
          </span>
        </div>
      </div>

      <div className="flex flex-col text-sm">
        <div className="flex items-center">
          <p>Network:&nbsp;</p>
          <p className="font-semibold">
            {chainId ? networkIDNames(chainId) : "None"}
          </p>
        </div>
        <div className="flex items-center">
          <p>Network ID:&nbsp;</p>
          <p className="font-semibold">{chainId ? chainId : "0"}</p>
        </div>
      </div>

      <div className="flex space-x-2">
        {active ? (
          <button
            onClick={deactivate}
            className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded-lg shadow"
          >
            Disconnect
          </button>
        ) : (
          <button
            onClick={activate}
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-1 px-3 rounded-lg shadow"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Account;
