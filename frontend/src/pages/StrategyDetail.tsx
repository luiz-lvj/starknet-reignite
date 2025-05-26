
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, DollarSign, Wallet, Shield, Info, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WalletConnectButton } from '@/components/WalletConnectButton';
import { useState } from 'react';

const strategies = {
  'btc-fi': {
    name: 'BTC Fi Strategy',
    description: 'This strategy provides optimal Bitcoin exposure while generating yield through sophisticated DeFi protocols. By maintaining a balanced 50/50 split between WBTC and Vesu vWBTC, users benefit from both price appreciation and yield generation.',
    longDescription: 'The BTC Fi Strategy is designed for Bitcoin maximalists who want to earn yield on their holdings. The strategy automatically rebalances between holding WBTC directly and depositing it into Vesu protocol to earn vWBTC rewards. This approach provides users with exposure to Bitcoin price movements while generating additional returns through Vesu\'s lending protocol.',
    totalSupply: '1,247.82',
    pricePerToken: '$1.0234',
    apy: '12.5%',
    tvl: '$2,450,000',
    assets: [
      { name: 'WBTC', allocation: '50%', amount: '623.91', value: '$1,225,000' },
      { name: 'vWBTC', allocation: '50%', amount: '623.91', value: '$1,225,000' }
    ],
    riskLevel: 'Medium',
    fees: {
      management: '0.5%',
      performance: '10%'
    },
    features: [
      'Auto-rebalancing',
      'Yield optimization',
      'Risk management',
      'Gas optimization'
    ]
  }
};

const StrategyDetail = () => {
  const { id } = useParams();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  
  const strategy = strategies[id as keyof typeof strategies];
  
  if (!strategy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Strategy Not Found</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300">Return to Home</Link>
        </div>
      </div>
    );
  }

  const userHoldings = isWalletConnected ? '0.0' : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Strategy Vaults</h1>
          </div>
        </div>
        <WalletConnectButton 
          isConnected={isWalletConnected} 
          onConnect={() => setIsWalletConnected(!isWalletConnected)} 
        />
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Strategy Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{strategy.name}</h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                {strategy.description}
              </p>
            </div>
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
              {strategy.riskLevel} Risk
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Metrics */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{strategy.apy}</div>
                    <div className="text-sm text-gray-400">APY</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{strategy.tvl}</div>
                    <div className="text-sm text-gray-400">TVL</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{strategy.totalSupply}</div>
                    <div className="text-sm text-gray-400">Total Supply</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-1">{strategy.pricePerToken}</div>
                    <div className="text-sm text-gray-400">Price per Token</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Asset Allocation */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {strategy.assets.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{asset.name[0]}</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold">{asset.name}</div>
                          <div className="text-sm text-gray-400">{asset.allocation}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{asset.amount}</div>
                        <div className="text-sm text-gray-400">{asset.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Strategy Details */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {strategy.longDescription}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Features</h4>
                    <ul className="space-y-2">
                      {strategy.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-gray-300">
                          <Shield className="w-4 h-4 text-green-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-3">Fees</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-300">
                        <span>Management Fee:</span>
                        <span>{strategy.fees.management}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Performance Fee:</span>
                        <span>{strategy.fees.performance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Holdings */}
            {userHoldings !== null && (
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Wallet className="w-5 h-5" />
                    <span>Your Holdings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">{userHoldings}</div>
                    <div className="text-sm text-gray-400 mb-4">Vault Tokens</div>
                    <div className="text-lg text-gray-300">≈ $0.00</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Deposit/Withdraw */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Manage Position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isWalletConnected ? (
                  <>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Amount to Deposit</label>
                      <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="0.0"
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button className="bg-green-500 hover:bg-green-600 text-white">
                        Deposit
                      </Button>
                      <Button variant="outline" className="border-red-500/50 text-red-300 hover:bg-red-500/20">
                        Withdraw
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-400 mb-4">Connect your wallet to deposit</p>
                    <WalletConnectButton 
                      isConnected={isWalletConnected} 
                      onConnect={() => setIsWalletConnected(!isWalletConnected)} 
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Links */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">External Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a 
                  href="#" 
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <span className="text-gray-300">View on Explorer</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
                <a 
                  href="#" 
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <span className="text-gray-300">Audit Report</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              </CardContent>
            </Card>
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

export default StrategyDetail;
