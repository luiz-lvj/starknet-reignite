
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, DollarSign, Star } from 'lucide-react';

interface Strategy {
  id: string;
  name: string;
  description: string;
  totalSupply: string;
  pricePerToken: string;
  apy: string;
  tvl: string;
  assets: string[];
  riskLevel: string;
  featured: boolean;
}

interface StrategyCardProps {
  strategy: Strategy;
  userHoldings?: string | null;
}

export const StrategyCard = ({ strategy, userHoldings }: StrategyCardProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <Link to={`/strategy/${strategy.id}`}>
      <Card className="group bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden">
        {strategy.featured && (
          <div className="absolute top-4 right-4 z-10">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </div>
        )}
        
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {strategy.name}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {strategy.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-3">
            <Badge className={`text-xs ${getRiskColor(strategy.riskLevel)}`}>
              {strategy.riskLevel} Risk
            </Badge>
            <div className="flex space-x-1">
              {strategy.assets.map((asset, index) => (
                <Badge key={index} variant="outline" className="text-xs border-white/20 text-gray-300">
                  {asset}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <TrendingUp className="w-3 h-3" />
                <span>APY</span>
              </div>
              <div className="text-lg font-bold text-green-400">{strategy.apy}</div>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-1 text-xs text-gray-400">
                <Users className="w-3 h-3" />
                <span>TVL</span>
              </div>
              <div className="text-lg font-bold text-white">{strategy.tvl}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-gray-400">Total Supply</div>
              <div className="text-sm font-semibold text-gray-200">{strategy.totalSupply}</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-xs text-gray-400">Price/Token</div>
              <div className="text-sm font-semibold text-gray-200">{strategy.pricePerToken}</div>
            </div>
          </div>

          {userHoldings && (
            <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-300">Your Holdings</span>
                <span className="text-sm font-semibold text-blue-200">{userHoldings} tokens</span>
              </div>
            </div>
          )}
        </CardContent>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </Link>
  );
};
