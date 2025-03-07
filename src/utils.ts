import {
  XcmV3Junctions,
  XcmV3MultiassetAssetId,
  XcmV3MultiassetFungibility,
  XcmV3WeightLimit,
  XcmV3Junction,
} from "@polkadot-api/descriptors";
import { SS58String, Binary, AccountId, Enum } from "polkadot-api";

export const decimalSeparatorDisplay = ".";
export const decimalSeparatorsInput = [".", ","];
export const decimalSeparatorRegex = ",|.";

export const getDecimalSeparator = (inputString: string) => {
  const parts = new RegExp(
    `^(-)?(\\d*)(${decimalSeparatorRegex})?((\\d+))?$`
  ).exec(inputString);

  return parts ? parts[3] : null;
};

export type FormatCurrencyOptions = {
  nDecimals: number;
  padToDecimals: boolean;
  decimalSeparator: string;
};

const defaultOptions: FormatCurrencyOptions = {
  nDecimals: Infinity,
  padToDecimals: true,
  decimalSeparator: decimalSeparatorDisplay,
};

export const formatCurrency = (
  value: bigint | null,
  precision: number,
  options: Partial<FormatCurrencyOptions> = {}
): string => {
  const { nDecimals, padToDecimals, decimalSeparator } = {
    ...defaultOptions,
    ...options,
  };
  if (value === null) return "";
  const precisionMultiplier = 10n ** BigInt(precision);
  if (nDecimals < precision) {
    value = value / 10n ** BigInt(precision - (nDecimals + 1));
    const rounded = Math.abs(Number(value % 10n)) > 4;
    const rounding = rounded ? (value < 0 ? -1n : 1n) : 0n;
    value = value / 10n + rounding;
    value *= 10n ** BigInt(precision - nDecimals);
  }
  const isNegative = value < 0n;
  const absValue = isNegative ? value * -1n : value;
  let intPartStr = (absValue / precisionMultiplier).toString();
  if (isNegative) intPartStr = "-" + intPartStr;
  const decimalPart = absValue % precisionMultiplier;

  if (
    nDecimals === 0 ||
    (nDecimals === Infinity && decimalPart === 0n) ||
    (padToDecimals === false && decimalPart === 0n)
  )
    return intPartStr;

  let newDecimalPart = decimalPart
    .toString()
    .padStart(precision, "0")
    .replace(/00*$/, "");

  if (nDecimals !== Infinity && padToDecimals === true) {
    newDecimalPart = newDecimalPart.padEnd(nDecimals, "0");
  }

  return intPartStr + decimalSeparator + newDecimalPart;
};

type BigNumber = {
  value: bigint;
  precision: bigint;
};

export const divideBigInt = (
  numerator: BigNumber,
  denominator: BigNumber,
  targetPrecision?: bigint
) => {
  const precision = targetPrecision ?? numerator.precision;
  return (
    (10n ** precision * (numerator.value * 10n ** denominator.precision)) /
    denominator.value /
    10n ** numerator.precision
  );
};

export const getNativeAsset = (amount: bigint, parents: 1 | 0) =>
  Enum("V3", [
    {
      id: XcmV3MultiassetAssetId.Concrete({
        parents,
        interior: XcmV3Junctions.Here(),
      }),
      fun: XcmV3MultiassetFungibility.Fungible(amount),
    },
  ]);

export const getBeneficiary = (address: SS58String) => {
  const encodeAccount = AccountId().enc;
  return Enum("V3", {
    parents: 0,
    interior: XcmV3Junctions.X1(
      XcmV3Junction.AccountId32({
        network: undefined,
        id: Binary.fromBytes(encodeAccount(address)),
      })
    ),
  });
};
