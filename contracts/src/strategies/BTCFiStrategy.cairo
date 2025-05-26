#[starknet::component]
pub mod BTCFiStrategyComponent {

    use crate::strategies::interface;

    #[storage]
    pub struct Storage {

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
}