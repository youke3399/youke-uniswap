import { Token, Ether, NativeCurrency } from "@uniswap/sdk-core";

export type ChainTokens = {
  [symbol: string]: Token | NativeCurrency;
};

export type TokensMap = {
  [chainId: number]: ChainTokens;
};

// 多链 token 配置，结构为 chainId -> tokens
export const swapTokens: TokensMap = {
  1: {
    ETH: Ether.onChain(1),
    /* WETH: new Token(
            1,
            '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            18,
            'WETH',
            'Wrapped Ether'
        ), */
    RPL: new Token(
      1,
      "0xD33526068D116cE69F19A9ee46F0bd304F21A51f",
      18,
      "RPL",
      "Rocket Pool"
    ),
    USDT: new Token(
      1,
      "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      6,
      "USDT",
      "Tether USD"
    ),
    USDC: new Token(
      1,
      "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      6,
      "USDC",
      "USD Coin"
    ),
  },
  42161: {
    ETH: Ether.onChain(42161),
    USDC: new Token(
      42161,
      "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
      6,
      "USDC",
      "USD Coin"
    ),
    USDT: new Token(
      42161,
      "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
      6,
      "USDT",
      "USD₮0 USD"
    ),
    ARB: new Token(
      42161,
      "0x912CE59144191C1204E64559FE8253a0e49E6548",
      18,
      "ARB",
      "Arbitrum"
    ),
  },
  10: {
    ETH: Ether.onChain(10),
    USDC: new Token(
      10,
      "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
      6,
      "USDC",
      "USD Coin"
    ),
    USDT: new Token(
      10,
      "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
      6,
      "USDT",
      "Tether USD"
    ),
     OP: new Token(
      10,
      "0x4200000000000000000000000000000000000042",
      18,
      "OP",
      "Optimism"
    ),
  },
  8453: {
    ETH: Ether.onChain(8453),
    USDC: new Token(
      8453,
      "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      6,
      "USDC",
      "USD Coin"
    ),
  },
  324: {
    ETH: Ether.onChain(324),
    USDC: new Token(
      324,
      "0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4",
      6,
      "USDC",
      "USD Coin"
    ),
    ZK: new Token(
      324,
      "0x5A7d6b2F92C77FAD6CCaBd7EE0624E64907Eaf3E",
      18,
      "ZK",
      "zkSync"
    ),
  },
  130: {
    ETH: Ether.onChain(130),
    USDC: new Token(
      130,
      "0x078D782b760474a361dDA0AF3839290b0EF57AD6",
      6,
      "USDC",
      "USD Coin"
    ),
    UNI: new Token(
      130,
      "0x8f187aA05619a017077f5308904739877ce9eA21",
      18,
      "UNI",
      "Uniswap"
    ),
  },
};
