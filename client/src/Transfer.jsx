import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { hexToBytes } from "ethereum-cryptography/utils.js";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isSigned, setIsSigned] = useState(false);

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer() {
    try {
      let response = await server.post(`send`, {
        sender: address,
        recipient: recipient,
        amount: parseInt(sendAmount),
      });
      if (response.status === 200) {
        alert("Transaction Succesfull");
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  const signTx = async () => {
    try {
      await server.post("/sign", {
        publicKey: address,
      });
    } catch (error) {
      console.log("CLIENT SIGNATURE ERROR", error);
    } finally {
      setIsSigned(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSigned) {
      signTx();
    }

    if (isSigned) {
      transfer();
    }
  };

  return (
    <form className="container transfer" onSubmit={handleSubmit}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <input
        type="submit"
        className="button"
        value={isSigned ? "Transfer" : "Sign"}
      />
    </form>
  );
}

export default Transfer;
