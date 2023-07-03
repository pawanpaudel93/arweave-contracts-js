const fs = require("fs");
const path = require("path");
const { WarpFactory } = require("warp-contracts");
const { DeployPlugin } = require("warp-contracts-plugin-deploy");

(async () => {
  let wallet;

  const warp = WarpFactory.forMainnet().use(new DeployPlugin());
  let walletDir = path.resolve(".secrets");
  let walletFilename = path.join(walletDir, `/wallet_${warp.environment}.json`);
  if (fs.existsSync(walletFilename)) {
    wallet = JSON.parse(fs.readFileSync(walletFilename));
  } else {
    ({ jwk: wallet } = await warp.generateWallet());
    if (!fs.existsSync(walletDir)) fs.mkdirSync(walletDir);
    fs.writeFileSync(walletFilename, JSON.stringify(wallet));
  }
  const contractSrc = fs.readFileSync(
    path.join(__dirname, "../contracts/contract.js"),
    "utf8"
  );

  const initState = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../contracts/init-state.json"),
      "utf8"
    )
  );

  console.log("Deployment started");
  const result = await warp.deploy({
    wallet,
    initState: JSON.stringify(initState),
    src: contractSrc,
  });

  console.log("Deployment completed: ", {
    ...result,
    sonar: `https://sonar.warp.cc/#/app/contract/${result.contractTxId}`,
  });
})();
