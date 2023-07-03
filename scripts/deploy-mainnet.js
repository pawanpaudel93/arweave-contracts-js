const fs = require("fs");
const path = require("path");
const { WarpFactory } = require("warp-contracts");
const { DeployPlugin, ArweaveSigner } = require("warp-contracts-plugin-deploy");
require("dotenv").config();

(async () => {
  let wallet;

  const warp = WarpFactory.forMainnet().use(new DeployPlugin());
  let walletDir = path.resolve(".secrets");
  let walletFilename = process.env.WALLET_PATH ?? path.join(walletDir, `/wallet.json`);

  if (fs.existsSync(walletFilename)) {
    wallet = JSON.parse(fs.readFileSync(walletFilename));
  } else {
    ({ jwk: wallet } = await warp.generateWallet());
    if (!fs.existsSync(walletDir)) fs.mkdirSync(walletDir);
    fs.writeFileSync(walletFilename, JSON.stringify(wallet));
  }

  const contractsDir = path.resolve("contracts");
  const contractSrc = fs.readFileSync(path.join(contractsDir, "contract.js"), "utf8");
  const initState = JSON.parse(fs.readFileSync(path.join(contractsDir, "init-state.json"), "utf8"));

  console.log("Deployment started");
  const result = await warp.deploy({
    wallet: new ArweaveSigner(wallet),
    initState: JSON.stringify(initState),
    src: contractSrc,
  });

  console.log("Deployment completed: ", {
    ...result,
    sonar: `https://sonar.warp.cc/#/app/contract/${result.contractTxId}`,
  });
})();
