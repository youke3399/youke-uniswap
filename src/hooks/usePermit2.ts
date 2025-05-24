import { useWalletClient, usePublicClient, useChainId } from "wagmi";
import { providers } from "ethers";
import { Token } from "@uniswap/sdk-core";
import { readContract, writeContract } from "viem/actions";
import {
  UNIVERSAL_ROUTER_ADDRESS,
  UniversalRouterVersion,
} from "@uniswap/universal-router-sdk";
import { erc20Abi } from "viem";
import { AllowanceProvider, PERMIT2_ADDRESS } from "@uniswap/permit2-sdk";
// Simplified Permit2 ABI: only approve function
const permit2Abi = [
  {
    inputs: [
      { internalType: "address", name: "token", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint160", name: "amount", type: "uint160" },
      { internalType: "uint48", name: "expiration", type: "uint48" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export function usePermit2() {
  const chainId = useChainId();
  const permit2Address = PERMIT2_ADDRESS;
  const universalRouterAddress = UNIVERSAL_ROUTER_ADDRESS(
    UniversalRouterVersion.V2_0,
    chainId
  ) as `0x${string}`;
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  async function approveTokenForPermit2({
    token,
    account,
    amount,
  }: {
    token: Token & { address: `0x${string}` };
    account: `0x${string}`;
    amount: bigint;
  }) {
    if (!walletClient) throw new Error("No wallet client available");
    if (!publicClient) throw new Error("No public client available");

    const MAX_UINT256 = BigInt(2) ** BigInt(256) - BigInt(1);
    const MAX_UINT160 = 2n ** 160n - 1n;
    const ONE_YEAR = Math.floor(Date.now() / 1000) + 3600 * 24 * 365;

    // Step 1: Check and approve token to Permit2
    const currentAllowance = await readContract(publicClient, {
      address: token.address,
      abi: erc20Abi,
      functionName: "allowance",
      args: [account, permit2Address],
    });

    console.log("ERC20 allowance to Permit2:", currentAllowance.toString());

    if (currentAllowance < amount) {
      const txHash = await writeContract(walletClient, {
        account,
        address: token.address,
        abi: erc20Abi,
        functionName: "approve",
        args: [permit2Address, MAX_UINT256],
      });
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });
      console.log("ERC20 allowance receipt:", receipt.transactionHash);
    }

    // Step 2: Check and approve Permit2 -> Universal Router
    const ethersProvider = new providers.JsonRpcProvider(
      publicClient?.transport?.url
    );
    const allowanceProvider = new AllowanceProvider(
      ethersProvider,
      permit2Address
    );

    const {
      amount: rawPermit2Allowance,
      expiration: currentPermit2Expiration,
    } = await allowanceProvider.getAllowanceData(
      token.address,
      account,
      universalRouterAddress
    );
    const currentPermit2Allowance = rawPermit2Allowance.toBigInt();

    console.log(
      "Permit2 allowance to UniversalRouter:",
      currentPermit2Allowance.toString()
    );
    console.log("expiration:", currentPermit2Expiration.toString());

    const now = Math.floor(Date.now() / 1000);

    if (
      currentPermit2Allowance < amount ||
      currentPermit2Expiration < now + 60
    ) {
      const txHashPermit2 = await writeContract(walletClient, {
        account,
        address: permit2Address,
        abi: permit2Abi,
        functionName: "approve",
        args: [token.address, universalRouterAddress, MAX_UINT160, ONE_YEAR],
      });
      const receiptPermit2 = await publicClient.waitForTransactionReceipt({
        hash: txHashPermit2,
      });
      console.log("Permit2 allowance receipt:", receiptPermit2.transactionHash);
    }
  }

  return {
    approveTokenForPermit2,
  };
}
