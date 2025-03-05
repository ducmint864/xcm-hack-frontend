import React, { useRef, useState } from "react";
import { reserveTransferToParachain } from "./api";
import { useSelectedAccount, useToken } from "./context";
import { TxEvent } from "polkadot-api";
import { Button } from "./components/Button";
import { Card } from "./components/Card";

const TxStatus: React.FC<{ status: TxEvent | null }> = ({ status }) => {
  if (!status) return null;

  let statusMessage = "";
  let statusType = "";

  if (status.type === "signed") {
    statusMessage = `Transaction signed: ${status.txHash.slice(
      0,
      10
    )}...${status.txHash.slice(-8)}`;
    statusType = "info";
  } else if (status.type === "broadcasted") {
    statusMessage = `Transaction broadcasted: ${status.txHash.slice(
      0,
      10
    )}...${status.txHash.slice(-8)}`;
    statusType = "info";
  } else if (status.type === "txBestBlocksState") {
    statusMessage = status.found
      ? `Transaction included in block: ${status.block.hash.slice(
          0,
          10
        )}...${status.block.hash.slice(-8)}-${status.block.index}`
      : `Transaction broadcasted: ${status.txHash.slice(
          0,
          10
        )}...${status.txHash.slice(-8)}`;
    statusType = status.found ? "success" : "info";
  } else if (status.type === "finalized") {
    statusMessage = `Transaction finalized in block: ${status.block.hash.slice(
      0,
      10
    )}...${status.block.hash.slice(-8)}-${status.block.index}`;
    statusType = "success";
  }

  return (
    <div className={`tx-status tx-status-${statusType}`}>{statusMessage}</div>
  );
};

export const ReserveTransfer: React.FC = () => {
  const { decimals, symbol } = useToken();
  const account = useSelectedAccount();
  const [amount, setAmount] = useState<string>("0");
  const [txStatus, setTxStatus] = useState<TxEvent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ref = useRef<bigint>(0n);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    ref.current = BigInt(Math.floor(Number(value) * 10 ** decimals));
  };

  const transfer = () => {
    setIsLoading(true);
    reserveTransferToParachain(account.address, ref.current)
      .signSubmitAndWatch(account.polkadotSigner)
      .subscribe({
        next: (x) => {
          setTxStatus(x);
          if (x.type === "finalized") {
            setTimeout(() => {
              setTxStatus(null);
              setIsLoading(false);
            }, 3000);
          }
        },
        error: (err) => {
          console.error("Reserve transfer error:", err);
          setIsLoading(false);
        },
      });
  };

  return (
    <Card title="XCM Reserve Transfer" className="transfer-container">
      <div className="transfer-description">
        Move assets between chains using the XCM Reserve-based transfer
        mechanism.
      </div>
      <div className="transfer-controls reserve-transfer">
        <div className="amount-input-container">
          <span className="token-symbol-input">{symbol}</span>
          <div className="amount-input">
            <input
              type="number"
              onChange={handleAmountChange}
              value={amount}
              min="0"
              step="0.1"
              placeholder="Amount"
              style={{
                WebkitAppearance: "none",
                MozAppearance: "textfield",
                appearance: "textfield",
              }}
            />
          </div>
        </div>

        <Button
          variant="primary"
          onClick={transfer}
          disabled={isLoading || Number(amount) <= 0}
          isLoading={isLoading && txStatus?.type !== "finalized"}
          className="reserve-btn"
        >
          <span className="reserve-icon">🔄</span> Reserve Transfer to ParaChain
        </Button>
      </div>

      {txStatus && <TxStatus status={txStatus} />}
    </Card>
  );
};
