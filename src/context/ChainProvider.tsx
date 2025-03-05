import { PolkadotClient } from "polkadot-api";
import { createContext, useContext } from "react";
import { PaseoAssetHubChainApi, PaseoRelayChainApi } from "../api";

export const chainCtx = createContext<{
  client: PolkadotClient;
  api: PaseoAssetHubChainApi | PaseoRelayChainApi;
} | null>(null);
export const useChain = () => useContext(chainCtx)!;

export const ChainProvider = chainCtx.Provider;
