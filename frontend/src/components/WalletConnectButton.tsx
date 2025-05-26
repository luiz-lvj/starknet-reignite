
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle } from 'lucide-react';

interface WalletConnectButtonProps {
  isConnected: boolean;
  onConnect: () => void;
}

export const WalletConnectButton = ({ isConnected, onConnect }: WalletConnectButtonProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate wallet connection delay
    setTimeout(() => {
      setIsConnecting(false);
      onConnect();
    }, 1500);
  };

  if (isConnected) {
    return (
      <Button 
        variant="outline" 
        onClick={onConnect}
        className="bg-green-500/20 border-green-500/50 text-green-300 hover:bg-green-500/30 transition-all duration-200"
      >
        <CheckCircle className="w-4 h-4 mr-2" />
        0x1234...5678
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none transition-all duration-200 transform hover:scale-105"
    >
      <Wallet className="w-4 h-4 mr-2" />
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
};
