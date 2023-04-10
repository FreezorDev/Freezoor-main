const fs = require('fs');
const { Connection, Account, PublicKey, SystemProgram, Transaction, TransactionInstruction, sendAndConfirmTransaction } = require('@solana/web3.js');
const borsh = require('borsh');

const programId = new PublicKey('E3s69Ww8GhHuQgVqqBkykTRAwHcfxovXnGumdXJbU4jh');
const walletJSONPath = 'wallet.json';

// Define the schema for FreezorData
class FreezorData {
  constructor(fields = { document_hash: '', email_hash: '' }) {
    this.document_hash = fields.document_hash;
    this.email_hash = fields.email_hash;
  }
}

const FreezorDataSchema = new Map([
  [FreezorData, {
    kind: 'struct',
    fields: [
      ['document_hash', 'string'],
      ['email_hash', 'string'],
    ],
  }],
]);

// Helper function to deserialize data from the smart contract
function deserializeFreezorData(data) {
  return borsh.deserializeUnchecked(FreezorDataSchema, FreezorData, data);
}

// Helper function to serialize data for the smart contract
function serializeFreezorData(data) {
  return borsh.serialize(FreezorDataSchema, data);
}

function loadWalletSecretKey(walletPath) {
  const walletJSON = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
  const secretKey = Uint8Array.from(walletJSON);
  return secretKey;
}

// Interact with the smart contract
async function storeData(documentHash, emailHash) {
  const secretKey = loadWalletSecretKey(walletJSONPath);
  const walletAccount = new Account(secretKey);

  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  const lamports = await connection.getMinimumBalanceForRentExemption(serializeFreezorData(new FreezorData()).length);

  const dataAccount = new Account();
  const createAccountInstruction = SystemProgram.createAccount({
    fromPubkey: walletAccount.publicKey,
    newAccountPubkey: dataAccount.publicKey,
    lamports,
    space: serializeFreezorData(new FreezorData()).length,
    programId,
  });

  const instructionData = Buffer.from(`${documentHash}|${emailHash}`, "utf8");
  console.log(instructionData);
  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: dataAccount.publicKey, isSigner: false, isWritable: true },
    ],
    programId,
    data: instructionData,
  });

  const transaction = new Transaction().add(createAccountInstruction, instruction);
  transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  transaction.setSigners(walletAccount.publicKey, dataAccount.publicKey);
  transaction.sign(walletAccount, dataAccount);

  const txid = await sendAndConfirmTransaction(connection, transaction, [walletAccount, dataAccount]);
  console.log('Transaction sent:', txid);




  return dataAccount.publicKey;
}



async function main() {
  const documentHash = 'test';
  const emailHash = 'test2';

  try {
    const dataAccountPubkey = await storeData(documentHash, emailHash);
    console.log('Data stored in account:', dataAccountPubkey.toBase58());
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
