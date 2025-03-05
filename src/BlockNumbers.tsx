import React, { useState, useEffect } from "react";
import { useChain } from "./context";

export const BlockNumbers: React.FC = () => {
  const { api } = useChain();
  const [blockNumber, setBlockNumber] = useState<number | null>(null);

  useEffect(() => {
    const subscription = api.query.System.Number.watchValue(
      "best"
    ).subscribe((number) => {
      setBlockNumber(Number(number));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [api]);

  return (
    <div className="chain-info">
      <div className="text-label">Current Block</div>
      <div className="block-number">
        {blockNumber === null ? (
          <span className="loading-pulse">Syncing...</span>
        ) : (
          <span className="block-badge"># {blockNumber.toLocaleString()}</span>
        )}
      </div>
    </div>
  );
};
