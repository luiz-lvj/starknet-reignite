#[starknet::contract]
pub mod StrategyVault {

    use crate::strategies::interface::IBTCFiStrategy;
use crate::strategy_vault::interface;
    use crate::strategies::BTCFiStrategy::{BTCFiStrategyComponent};
    use openzeppelin_token::erc20::erc20::{ERC20Component, ERC20HooksEmptyImpl};
    use openzeppelin_token::erc20::interface::{ IERC20Dispatcher, IERC20DispatcherTrait };
    use starknet::{ContractAddress, get_caller_address, get_contract_address};
    use starknet::storage::StoragePointerReadAccess;    

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);
    component!(path: BTCFiStrategyComponent, storage: btcfi_strategy, event: BTCFiStrategyEvent);

    #[abi(embed_v0)]
    impl ERC20Impl = ERC20Component::ERC20Impl<ContractState>;
    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;

    #[abi(embed_v0)]
    impl BTCFiStrategyImpl = BTCFiStrategyComponent::BTCFiStrategyImpl<ContractState>;
    impl BTCFiStrategyInternalImpl = BTCFiStrategyComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        payment_token: ContractAddress,
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        #[substorage(v0)]
        btcfi_strategy: BTCFiStrategyComponent::Storage,
    }

    #[event]
    #[derive(Drop, PartialEq, starknet::Event)]
    pub enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event,
        #[flat]
        BTCFiStrategyEvent: BTCFiStrategyComponent::Event,
    }

    pub mod Errors {
        pub const DEPOSIT_TRANSFER_FAILED: felt252 = 'Deposit transfer failed';
    }


    pub trait StrategyVaultTrait<TContractState> {
        fn get_exchange_rate(self: @TContractState) -> u256;
    }

    #[constructor]
    fn constructor(ref self: ContractState, payment_token: ContractAddress, oracle_address: ContractAddress, name: ByteArray, symbol: ByteArray) {
        self.erc20.initializer(name, symbol);
        self.btcfi_strategy.initializer(payment_token, oracle_address);
    }

    #[abi(embed_v0)]
    impl StrategyVaultImpl of interface::IStrategyVault<ContractState> {

        fn deposit(ref self: ContractState, amount: u256) -> u256 {

            let payment_token = self.payment_token.read();
            let payment_token_dispatcher = IERC20Dispatcher{ contract_address: payment_token };

            let caller = get_caller_address();

            assert(payment_token_dispatcher.transfer_from(caller, get_contract_address(), amount), Errors::DEPOSIT_TRANSFER_FAILED);

            let exchange_rate = self.exchange_rate();

            let amount_to_mint = amount * exchange_rate / 100000;

            self.btcfi_strategy.deposit_strategy(amount_to_mint);

            self.erc20.mint(caller, amount_to_mint);

            amount_to_mint
        }



        fn exchange_rate(self: @ContractState) -> u256 {
            100000 // 100% = 1
        }

        fn payment_token(self: @ContractState) -> ContractAddress {
            self.payment_token.read()
        }
    
    }

    
}