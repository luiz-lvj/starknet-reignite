
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WalletConnectButton } from '@/components/WalletConnectButton';
import { StrategyCard } from '@/components/StrategyCard';
import { Wallet, TrendingUp, Shield, Zap } from 'lucide-react';

const strategies = [
  {
    id: 'btc-fi',
    name: 'BTC Fi Strategy',
    description: '50% WBTC + 50% deposited on Vesu vWBTC for optimal Bitcoin exposure with yield generation',
    totalSupply: '1,247.82',
    pricePerToken: '$1.0234',
    apy: '12.5%',
    tvl: '$2,450,000',
    assets: ['WBTC', 'vWBTC'],
    riskLevel: 'Medium',
    featured: true
  },
  {
    id: 'eth-yield',
    name: 'ETH Yield Optimizer',
    description: 'Automated ETH staking strategy with liquid staking tokens for maximum returns',
    totalSupply: '3,891.45',
    pricePerToken: '$1.0567',
    apy: '8.9%',
    tvl: '$5,200,000',
    assets: ['ETH', 'stETH'],
    riskLevel: 'Low',
    featured: false
  },
  {
    id: 'stable-farm',
    name: 'Stable Farm',
    description: 'Conservative stablecoin farming across multiple protocols for steady yields',
    totalSupply: '15,234.67',
    pricePerToken: '$1.0012',
    apy: '6.2%',
    tvl: '$8,900,000',
    assets: ['USDC', 'USDT', 'DAI'],
    riskLevel: 'Low',
    featured: false
  }
];

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Strategy Vaults</h1>
        </div>
        <WalletConnectButton 
          isConnected={isWalletConnected} 
          onConnect={() => setIsWalletConnected(!isWalletConnected)} 
        />
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Maximize Your DeFi Returns
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Discover automated investment strategies on StarkNet. 
            Deposit your assets and let our vaults optimize returns while you sleep.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">$16.5M+</div>
              <div className="text-gray-300">Total Value Locked</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">9.2%</div>
              <div className="text-gray-300">Average APY</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <div className="text-gray-300">Active Strategies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Strategies Section */}
      <div className="relative z-10 px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-white">Available Strategies</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Auto-compound</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {strategies.map((strategy) => (
              <StrategyCard 
                key={strategy.id} 
                strategy={strategy} 
                userHoldings={isWalletConnected ? "0.0" : null}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Index;
