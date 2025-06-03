import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { mainnet, arbitrum, optimism, base, zksync } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes";

const config = getDefaultConfig({
  transports: {
    [mainnet.id]: http(import.meta.env.VITE_MAINNET_RPC_URL!),
    [optimism.id]: http(import.meta.env.VITE_OPTIMISM_RPC_URL!),
    [arbitrum.id]: http(import.meta.env.VITE_ARBITRUM_ONE_RPC_URL!),
    [base.id]: http(import.meta.env.VITE_BASE_RPC_URL!),
    [zksync.id]: http(import.meta.env.VITE_ZKSYNC_RPC_URL!),
  },
  appName: "youke",
  projectId: "22048dfbe94bf2f4a260f89c33252adf", // 到 https://cloud.walletconnect.com 注册获取
  chains: [mainnet, arbitrum, optimism, base, zksync],
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AppRoutes />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
