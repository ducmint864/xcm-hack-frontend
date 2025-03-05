import { SS58String, Enum } from "polkadot-api";
import { PASEO_PEOPLE_CHAIN_ID } from "./people-chain";
import { paseoAssetHubChainApi } from "./asset-hub-chain";
import {
  XcmV3Junctions,
  XcmV3WeightLimit,
  XcmV3Junction,
} from "@polkadot-api/descriptors";
import { getBeneficiary, getNativeAsset } from "../utils"

/**
 *
 * @notice Transfer tokens from paseo asset hub to paseo people chain
 * @param address
 * @param amount
 */
export const reserveTransferToParachain = (
  address: SS58String,
  amount: bigint
) => {
  // Do sth cool soon
  return paseoAssetHubChainApi.tx.PolkadotXcm.limited_reserve_transfer_assets({
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
};
