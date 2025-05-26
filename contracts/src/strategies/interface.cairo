#[starknet::interface]
pub trait IBTCFiStrategy<TComponentState> {
    fn get_exchange_rate(self: @TComponentState) -> u256;
}