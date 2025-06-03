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
    PEPE: new Token(
      1,
      "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
      18,
      "PEPE",
      "pepe"
    ),
  },
  42161: {
    ETH: Ether.onChain(42161),
    USDT: new Token(
      42161,
      "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
      6,
      "USDT",
      "Tether USD"
    ),
    USDC: new Token(
      42161,
      "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      6,
      "USDC",
      "USD Coin"
    ),
  },
  10: {
    ETH: Ether.onChain(10),
    USDT: new Token(
      10,
      "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
      6,
      "USDT",
      "Tether USD"
    ),
    USDC: new Token(
      10,
      "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
      6,
      "USDC",
      "USD Coin"
    ),
  },
  8453: {
    ETH: Ether.onChain(8453),
    USDT: new Token(
      8453,
      "0x2eA0325f6D8AcCd8b6D4b3E2e2a58E10bAAb9786",
      6,
      "USDT",
      "Tether USD"
    ),
    USDC: new Token(
      8453,
      "0xd9AA94D2c0e4F38e3D69f4687c7D97c4008A8E68",
      6,
      "USDC",
      "USD Coin"
    ),
  },
  324: {
    ETH: Ether.onChain(324),
    USDT: new Token(
      324,
      "0x7821a81c0baa7f50a3063c0b51984d081658969d",
      6,
      "USDT",
      "Tether USD"
    ),
    USDC: new Token(
      324,
      "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
      6,
      "USDC",
      "USD Coin"
    ),
  },
};
