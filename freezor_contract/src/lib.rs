use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

// Data structure for storing documentHash and emailHash
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct FreezorData {
    pub document_hash: String,
    pub email_hash: String,
}

// Entry point for the smart contract
entrypoint!(process_instruction);
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;

    if account.owner != program_id {
        msg!("Account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    let mut freezor_data = FreezorData::try_from_slice(&account.data.borrow())?;
    let (document_hash, email_hash) = parse_instruction_data(instruction_data)?;

    freezor_data.document_hash = document_hash;
    freezor_data.email_hash = email_hash;
    freezor_data.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Stored documentHash and emailHash");
    Ok(())
}

//for parsing the instruction data
fn parse_instruction_data(instruction_data: &[u8]) -> Result<(String, String), ProgramError> {
    let data = std::str::from_utf8(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;
    let mut parts = data.split('|');

    let document_hash = parts
        .next()
        .ok_or(ProgramError::InvalidInstructionData)?
        .to_string();
    let email_hash = parts
        .next()
        .ok_or(ProgramError::InvalidInstructionData)?
        .to_string();

    Ok((document_hash, email_hash))
}