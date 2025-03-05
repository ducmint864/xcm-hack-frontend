import "./App.css";
import { TransferrableBalance } from "./TransferrableBalance";
import { BlockNumbers } from "./BlockNumbers";
import { ChainProvider, MainProvider } from "./context";
import { Teleport } from "./Teleport";
import {
  paseoAssetHubChainApi,
  paraChain,
  relayChain,
  paseoRelayChainApi,
  paseoPeopleChainApi,
} from "./api";
import { ReserveTransfer } from "./ReserveTransfer";
import { Card } from "./components/Card";

function App() {
  return (
    <MainProvider>
      <div className="app-container">
        <div className="banner-container">
          <div className="banner-content">
            <div className="love-banner">
              I love OpenGuild ♥️. I love Polkadot ♥️. I love OpenGuild ♥️. I love Polkadot ♥️.
            </div>
          </div>
        </div>
        
        <div className="app-header">
          <h1>Polkadot XCM Transfer Hub</h1>
						<p className="subtitle">
						✨ Transfer assets seamlessly between Polkadot parachains ✨
						<span className="subtitle-underline"></span>
						</p>
        </div>

        <div className="grid-container">
          <ChainProvider value={{ client: relayChain, api: paseoRelayChainApi }}>
            <Card title="Paseo Relay Chain" className="chain-source">
              <BlockNumbers />
              <TransferrableBalance />
            </Card>
          </ChainProvider>

          <ChainProvider value={{ client: paraChain, api: paseoAssetHubChainApi }}>
            <Card title="Paseo AssetHub" className="chain-destination">
              <BlockNumbers />
              <TransferrableBalance />
            </Card>
          </ChainProvider>
        </div>

        <Teleport />

        <div className="grid-container">
          <ChainProvider value={{ client: relayChain, api: paseoPeopleChainApi }}>
            <Card title="Paseo People Chain" className="chain-source">
              <BlockNumbers />
              <TransferrableBalance />
            </Card>
          </ChainProvider>

          <ReserveTransfer />
        </div>
      </div>
    </MainProvider>
  );
}

export default App;
