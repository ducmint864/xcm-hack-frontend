import { SS58String, Enum } from "polkadot-api";
import {
  XcmV3Junctions,
  XcmV3MultiassetAssetId,
  XcmV3MultiassetFungibility,
  XcmV3WeightLimit,
  XcmV3Junction,
} from "@polkadot-api/descriptors";
import { getBeneficiary, getNativeAsset } from "../utils/";
import { paseoRelayChainApi } from "./relay-chain";
import { PASEO_PEOPLE_CHAIN_ID, paseoPeopleChainApi } from "./people-chain";

export const teleportToParaChain = (address: SS58String, amount: bigint) =>
  paseoRelayChainApi.tx.XcmPallet.limited_teleport_assets({
    dest: Enum("V3", {
      parents: 0,
      interior: XcmV3Junctions.X1(
        XcmV3Junction.Parachain(PASEO_PEOPLE_CHAIN_ID)
      ),
    }),
    beneficiary: getBeneficiary(address),
    assets: getNativeAsset(amount, 0),
    fee_asset_item: 0,
    weight_limit: XcmV3WeightLimit.Unlimited(),
  });

export const teleportToRelayChain = (address: SS58String, amount: bigint) =>
  paseoPeopleChainApi.tx.PolkadotXcm.limited_teleport_assets({
    dest: Enum("V3", {
      parents: 1,
      interior: XcmV3Junctions.Here(),
    }),
    beneficiary: getBeneficiary(address),
    assets: getNativeAsset(amount, 1),
    fee_asset_item: 0,
    weight_limit: XcmV3WeightLimit.Unlimited(),
  });
