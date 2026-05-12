import { useEffect, useState } from 'react';
import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handler = (state: NetInfoState) => {
      const online = Boolean(state.isConnected && state.isInternetReachable !== false);
      setIsOnline(online);
    };

    NetInfo.fetch().then(handler);
    const unsubscribe = NetInfo.addEventListener(handler);
    return unsubscribe;
  }, []);

  return { isOnline };
}
