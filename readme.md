## ECDSA Node

I have done this problem in the past as a Mentor for Alchemy University about a year ago.
Recently I've decided to rereview this material to get a deeper understanding of foundational blockchain concepts and the EVM.

What makes this solution novel is that we are able to keep all private key interactions on the backend. The client is only ever aware of the public key/address and we send it via API to the backend and then find the appropraite accounts private key using the public key. We then have a user sign a tx, and then verify they've signed before executing the transfer. This is closer to what is truly happening with transfers on Ethereum and other EVM based chains.

You could extend this to be closer to a provider like MetaMask by storing the private keys in the browser and encrypting them with a password the user defines, and decrypting them once the password is entered, and signing with the keys from the browser.

Here is a [stack exchange](https://ethereum.stackexchange.com/questions/159607/where-does-metamask-store-the-private-key-when-the-account-is-only-locked-with) on how

---

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.
