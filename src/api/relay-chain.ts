import { TypedApi, createClient } from "polkadot-api";
import { paseo } from "@polkadot-api/descriptors";
import { getSmProvider } from "polkadot-api/sm-provider";
import { smoldot } from "./smoldot";

export const smoldotRelayChain = import("polkadot-api/chains/paseo").then(
  ({ chainSpec }) => smoldot.addChain({ chainSpec }),
);

const provider = getSmProvider(smoldotRelayChain);
export const relayChain = createClient(provider);

export const paseoRelayChainApi = relayChain.getTypedApi(paseo);
export type PaseoRelayChainApi = TypedApi<typeof paseo>;
