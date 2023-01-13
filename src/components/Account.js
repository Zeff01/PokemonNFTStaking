import React from "react";
import { useWeb3React } from "@web3-react/core";
import networkIDNames from "../utils/networkNames";
import { toHex, truncateAddress } from "../utils/utils";

const Account = ({ fontColor }) => {
  const { active, account, library, chainId, connector, activate, deactivate } =
    useWeb3React();
  return (
    <div
      className=" flex justify-end  flex-col md:flex-row bg-black"
      style={{ color: fontColor }}
    >
      <div className=" flex flex-col text-sm text-left] ">
        {active ? (
          <span className="flex  w-[180px] inputLabel">
            <p>Connected to:&nbsp; {truncateAddress(account)}</p>
          </span>
        ) : (
          <p className="inputLabel  w-[180px]">Not connected</p>
        )}
        <h2 className="flex w-[90px] inputLabel">
          <p>Status:&nbsp;</p>
          {active ? " 🟢" : " 🔴"}
        </h2>
      </div>

      <div className="flex flex-col text-sm ">
        <h2 className="w-[130px] flex inputLabel">
          <p>Network:&nbsp;</p>
          <p className="inputLabel">{`${
            chainId ? networkIDNames(chainId) : "None"
          }`}</p>
        </h2>
        <h2 className="flex w-[130px] inputLabel">
          <p> Network ID:&nbsp;</p>
          {` ${chainId ? chainId : "0"}`}
        </h2>
      </div>
    </div>
  );
};

export default Account;
