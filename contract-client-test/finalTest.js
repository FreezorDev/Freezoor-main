const fs = require("fs");
const path = require("path");
const {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  Keypair,
} = require("@solana/web3.js");
const borsh = require("borsh");

// Replace with your deployed program ID
const PROGRAM_ID = "E3s69Ww8GhHuQgVqqBkykTRAwHcfxovXnGumdXJbU4jh";
const RPC_URL = "https://api.devnet.solana.com";

// Read the wallet.json file created with Solana CLI
const walletPath = path.join(__dirname, "wallet.json");
const walletJSON = JSON.parse(fs.readFileSync(walletPath, "utf-8"));

// Deserialize the wallet.json to get the keypair
const wallet = Keypair.fromSecretKey(Uint8Array.from(walletJSON));

// Connect to the devnet cluster
const connection = new Connection(RPC_URL);

// Define the FreezorData schema
class FreezorData {
  document_hash = "";
  email_hash = "";

  constructor(fields) {
    if (fields) {
      this.document_hash = fields.document_hash;
      this.email_hash = fields.email_hash;
    }
  }
}

const FreezorDataSchema = new Map([
  [
    FreezorData,
    {
      kind: "struct",
      fields: [
        ["document_hash", "string"],
        ["email_hash", "string"],
      ],
    },
  ],
]);

// Serialize instruction data using Borsh
function serializeInstructionData(documentHash, emailHash) {
  const data = new FreezorData({
    document_hash: documentHash,
    email_hash: emailHash,
  });
  return borsh.serialize(FreezorDataSchema, data);
}

async function main() {
  // Fetch the account associated with the smart contract
  const programId = new PublicKey(PROGRAM_ID);
  const freezorDataAccount = await PublicKey.createWithSeed(
    wallet.publicKey,
    "freezor",
    programId
  );

  // Check if the account exists and create it if it doesn't
  const accountInfo = await connection.getAccountInfo(freezorDataAccount);
  if (accountInfo === null) {
    console.log("Creating Freezor Data Account...");
    const createAccountIx = SystemProgram.createAccountWithSeed({
      fromPubkey: wallet.publicKey,
      newAccountPubkey: freezorDataAccount,
      basePubkey: wallet.publicKey,
      seed: "freezor",
      lamports: await connection.getMinimumBalanceForRentExemption(83), // 83 is the size of FreezorData (32 + 32 + 1 + 1 + 4 + 4 + 4 + 4)
      space: 83,
      programId: programId,
    });

    const createAccountTx = new Transaction().add(createAccountIx);
    await sendAndConfirmTransaction(connection, createAccountTx, [wallet]);
    console.log("Freezor Data Account created!");
  }

  // Send the transaction to write data to the smart contract
  const instructionData = serializeInstructionData(
    "document_hash_example",
    "email_hash_example"
  );
  const instruction = new Transaction().add({
    keys: [{ pubkey: freezorDataAccount, isSigner: false, isWritable: true }],
    programId: programId,
    data: instructionData,
  });

  await sendAndConfirmTransaction(connection, instruction, [wallet]);
  console.log("Data written to Freezor Data Account");
}

main()
  .then(() => console.log("Done"))
  .catch((err) => console.error(err));
