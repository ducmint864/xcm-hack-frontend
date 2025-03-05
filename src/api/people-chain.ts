import { TypedApi, createClient } from "polkadot-api";
import { getSmProvider } from "polkadot-api/sm-provider";
import { smoldotRelayChain } from "./relay-chain";
import { paseo_people as paseoPeople } from "@polkadot-api/descriptors";
import { smoldot } from "./smoldot";

const smoldotParaChain = Promise.all([
  smoldotRelayChain,
  import("polkadot-api/chains/paseo_people"),
]).then(([relayChain, { chainSpec }]) =>
  smoldot.addChain({ chainSpec, potentialRelayChains: [relayChain] }),
);

const provider = getSmProvider(smoldotParaChain);
export const peopleParachain = createClient(provider);

export const PASEO_PEOPLE_CHAIN_ID = 1004;
export const paseoPeopleChainApi = peopleParachain.getTypedApi(paseoPeople);
export type PaseoPeopleChainApi = TypedApi<typeof paseoPeople>;
