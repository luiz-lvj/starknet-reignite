


#[starknet::component]
pub mod BTCFiStrategyComponent {

    use crate::strategies::interface::{IBTCFiStrategy, IERC4626, IERC4626Dispatcher, IERC4626DispatcherTrait, IWBTC, IWBTCDispatcher, IWBTCDispatcherTrait};
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::{ContractAddress, get_caller_address,contract_address_const};
    use core::array::{ArrayTrait, SpanTrait};
    use core::traits::{Into, TryInto};
    use pragma_lib::abi::{
        IPragmaABIDispatcher, IPragmaABIDispatcherTrait, ISummaryStatsABIDispatcher, ISummaryStatsABIDispatcherTrait
    };
    use pragma_lib::types::{DataType, AggregationMode, PragmaPricesResponse};

    #[storage]
    pub struct Storage {
        pub payment_token: ContractAddress,
        pub oracle_address: ContractAddress,
        pub wbtc_address: ContractAddress,
        pub vwbtc_address: ContractAddress,
        pub wbtc_pair_id: felt252
    }

    #[event]
    #[derive(Drop, PartialEq, starknet::Event)]
    pub enum Event {
        Deposit: Deposit,
        Initialize: Initialize,
        BTCSwap: BTCSwap
    }

    #[derive(Drop, PartialEq, starknet::Event)]
    pub struct Deposit {
        pub amount: u256,
        pub wbtc_amount: u256,
        pub vwbtc_amount: u256, 
        pub user: ContractAddress
    }

    #[derive(Drop, PartialEq, starknet::Event)]
    pub struct Initialize {
        pub payment_token: ContractAddress,
        pub oracle_address: ContractAddress
    }

    #[derive(Drop, PartialEq, starknet::Event)]
    pub struct BTCSwap {
        pub amount: u256,
        pub wbtc_amount: u256,
        pub user: ContractAddress
    }

    #[embeddable_as(BTCFiStrategyImpl)]
    pub impl BTCFiStrategy<TContractState, +HasComponent<TContractState>, +Drop<TContractState>> of IBTCFiStrategy<ComponentState<TContractState>> {

        fn deposit_strategy(ref self: ComponentState<TContractState>, amount: u256) {
            let wbtc_amount = self.swap_to_wbtc(amount);
            let vwbtc_amount = self.deposit_wbtc(wbtc_amount / 2);

            self.emit(Deposit {
                amount: amount,
                wbtc_amount: wbtc_amount,
                vwbtc_amount: vwbtc_amount,
                user: get_caller_address()
            });
        }
        
        fn get_exchange_rate(self: @ComponentState<TContractState>) -> u128 {
            let conversion_rate: PragmaPricesResponse = self.get_wbtc_conversion_rate();
            conversion_rate.price
        }
    }


    #[generate_trait]
    pub impl InternalImpl<TContractState, +HasComponent<TContractState>> of InternalTrait<TContractState> {

        fn initializer(ref self: ComponentState<TContractState>, payment_token: ContractAddress, oracle_address: ContractAddress) {
            self.payment_token.write(payment_token);
            self.oracle_address.write(oracle_address);
            self.wbtc_address.write(contract_address_const::<0x00abbD6f1e590eB83adDD87ba5ac27960d859b1F17d11a3c1CD6A0006704B141>());
            self.vwbtc_address.write(contract_address_const::<0x076ce66eba78210a836fca94ab91828c0f6941ad88585a700f3e473a9b4af870>());
            self.wbtc_pair_id.write(6287680677296296772); // see pragma docs for more info

            self.emit(Initialize {
                payment_token: payment_token,
                oracle_address: oracle_address
            });
        }

        fn swap_to_wbtc(ref self: ComponentState<TContractState>, amount: u256) -> u256 {

            let wbtc_dispatcher = IWBTCDispatcher {contract_address: self.wbtc_address.read()};
            wbtc_dispatcher.mint(get_caller_address(), amount);

            self.emit(BTCSwap {
                amount: amount,
                wbtc_amount: amount,
                user: get_caller_address()
            });

            amount
        }

        fn deposit_wbtc(ref self: ComponentState<TContractState>, amount: u256) -> u256 {

            let vwbtc_dispatcher = IERC4626Dispatcher {contract_address: self.vwbtc_address.read()};
            let caller = get_caller_address();

            vwbtc_dispatcher.deposit(amount, caller)

        }

        fn get_wbtc_conversion_rate(self: @ComponentState<TContractState>) -> PragmaPricesResponse {

            let oracle_dispatcher = IPragmaABIDispatcher {contract_address: self.oracle_address.read()};
            oracle_dispatcher.get_data(DataType::SpotEntry((self.wbtc_pair_id.read())), AggregationMode::ConversionRate)
        }

    }
}