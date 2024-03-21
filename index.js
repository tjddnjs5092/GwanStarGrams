/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RecoilRoot} from 'recoil';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      //캐시 시간 5분
      cacheTime: 1000 * 60 * 5,
    },
  },
});

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </QueryClientProvider>
);
AppRegistry.registerComponent(appName, () => Root);
