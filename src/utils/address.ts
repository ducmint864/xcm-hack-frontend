import { SS58String, Binary, AccountId, Enum } from "polkadot-api";
import {
  XcmV3Junctions,
  XcmV3MultiassetAssetId,
  XcmV3MultiassetFungibility,
  XcmV3WeightLimit,
  XcmV3Junction,
} from "@polkadot-api/descriptors";

const encodeAccount = AccountId().enc;

export const getBeneficiary = (address: SS58String) =>
  Enum("V3", {
    parents: 0,
    interior: XcmV3Junctions.X1(
      XcmV3Junction.AccountId32({
        network: undefined,
        id: Binary.fromBytes(encodeAccount(address)),
      })
    ),
  });
