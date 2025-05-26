#[starknet::component]
pub mod BTCFiStrategyComponent {

    use crate::strategies::interface;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::{ContractAddress, contract_address_const};
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
    }

    #[event]
    #[derive(Drop, PartialEq, starknet::Event)]
    pub enum Event {

    }

    #[embeddable_as(BTCFiStrategyImpl)]
    pub impl BTCFiStrategy<TContractState, +HasComponent<TContractState>, +Drop<TContractState>> of interface::IBTCFiStrategy<ComponentState<TContractState>> {
        
        fn get_exchange_rate(self: @ComponentState<TContractState>) -> u256 {
            100000 // 100% = 1
        }
    }


    #[generate_trait]
    pub impl InternalImpl<TContractState, +HasComponent<TContractState>> of InternalTrait<TContractState> {

        fn initializer(ref self: ComponentState<TContractState>, payment_token: ContractAddress, oracle_address: ContractAddress) {
            self.payment_token.write(payment_token);
            self.oracle_address.write(oracle_address);
            self.wbtc_address.write(contract_address_const::<0x04d220f611f103e5f79ceeae76becb9438dba49e105fd6783c7321e42db9afef>());
            self.vwbtc_address.write(contract_address_const::<0x076ce66eba78210a836fca94ab91828c0f6941ad88585a700f3e473a9b4af870>());
        }

        fn swap_to_wbtc(ref self: ComponentState<TContractState>, amount: u256) -> u256 {
            1
        }

        fn deposit_wbtc(ref self: ComponentState<TContractState>, amount: u256) {
        }

    }
}