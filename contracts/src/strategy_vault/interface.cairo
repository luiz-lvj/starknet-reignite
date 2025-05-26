use starknet::ContractAddress;

#[starknet::interface]
pub trait IStrategyVault<TContractState> {

    fn deposit(ref self: TContractState, amount: u256) -> u256;

    
    fn exchange_rate(self: @TContractState) -> u256;
    // fn total_supply(self: @TContractState) -> u256;
    fn payment_token(self: @TContractState) -> ContractAddress;


    
}