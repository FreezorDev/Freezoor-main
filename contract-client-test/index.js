require('dotenv').config();
const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs');

// Replace with your own values
const PRIVATE_KEY_FILE = 'private_key.json';

const PROGRAM_ID = "H3fU4MPURKgputAJBAp9FqdrYbekc8WumwbjDBt96ygT"

const DOCUMENT_HASH = '4f9c3633e8859bbe74114c4f82aa23ada90dc9a7b59643fd36451239ee1163ea'; // sample document hash
const EMAIL_HASH = '2b01fb431edfe93bdf096bb312c1e4d53e86dd73a9ae41873366645245656d2d'; // sample email hash

(async () => {
  // Read and parse the private key from a JSON file
  const privateKeyJSON = JSON.parse(fs.readFileSync(PRIVATE_KEY_FILE, 'utf-8'));
  const privateKey = new Uint8Array(privateKeyJSON);

  // Create a connection to the Solana cluster
  const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

  // Create a keypair from the private key
  const payerAccount = new solanaWeb3.Account(privateKey);

  // Get the public key of the program from the program ID
  const programId = new solanaWeb3.PublicKey(PROGRAM_ID);

  // Create a new account to store the FreezorData
  const freezorDataAccount = new solanaWeb3.Account();

  // Calculate the minimum balance required to create the account
  const lamports = await connection.getMinimumBalanceForRentExemption(1024);

  // Create a transaction to create the FreezorData account
  const createAccountTransaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.createAccount({
      fromPubkey: payerAccount.publicKey,
      newAccountPubkey: freezorDataAccount.publicKey,
      lamports,
      space: 1024,
      programId,
    })
  );

  // Sign and send the create account transaction
  await solanaWeb3.sendAndConfirmTransaction(connection, createAccountTransaction, [payerAccount, freezorDataAccount]);

  // Create the instruction data by concatenating the documentHash and emailHash separated by a '|'
  const instructionData = Buffer.from(DOCUMENT_HASH + '|' + EMAIL_HASH, 'utf-8');

  // Create the transaction to send the instruction to the smart contract
  const transaction = new solanaWeb3.Transaction().add(
    new solanaWeb3.TransactionInstruction({
      keys: [
        { pubkey: freezorDataAccount.publicKey, isSigner: true, isWritable: true },
      ],
      programId,
      data: instructionData,
    })
  );

  // Sign and send the transaction
  await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [payerAccount, freezorDataAccount]);

  console.log('Transaction sent and confirmed');
})();
