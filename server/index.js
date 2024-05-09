const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak.js");
const { toHex } = require("ethereum-cryptography/utils.js");
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const accounts = [];
let lastSignature, lastMessageHash;

for (let i = 0; i < 3; i++) {
  const randomPrivateKey = secp256k1.utils.randomPrivateKey();
  const publicKey = secp256k1.getPublicKey(randomPrivateKey);
  accounts.push({
    address: toHex(keccak256(publicKey)),
    privateKey: toHex(keccak256(randomPrivateKey)),
    balance: Math.floor(Math.random() * 101),
  });
}

console.log(accounts);

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const account = accounts.find((account) => account.address === address);
  const balance = account["balance"] || 0;
  res.send({ balance });
});

app.post("/sign", (req, res) => {
  const { publicKey } = req.body;
  lastMessageHash = new Uint8Array(32).fill(1);
  try {
    const account = accounts.find((account) => (account.address = publicKey));
    lastSignature = secp256k1.sign(lastMessageHash, account.privateKey);
    res.status(200).send("Signature Succesful");
  } catch (e) {
    console.error("--- SIGNATURE ERROR ---", e);
    res.status(400).send("Signature Failed");
  }
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;
  let senderAccount = accounts.find((account) => account.address === sender);
  let recipientAccount = accounts.find(
    (account) => account.address === recipient
  );
  try {
    const publicKey = secp256k1.getPublicKey(senderAccount.privateKey);
    let verified = secp256k1.verify(lastSignature, lastMessageHash, publicKey);
    if (verified && senderAccount.balance > amount) {
      senderAccount.balance -= amount;
      recipientAccount.balance += amount;
      res.status(200).send("TRANSACTION SUCCESFUL");
      console.log(accounts);
    }
  } catch (e) {
    console.error("--Transaction Error --", e);
    res.status(400).send("TRANSACTION FAILED");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// function setInitialBalance(address) {
//   if (!balances[address]) {
//     balances[address] = 0;
//   }
// }
