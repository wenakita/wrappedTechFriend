const poolSwapABI = [
  {
    inputs: [
      {
        internalType: "contract ILSSVMPairFactoryLike",
        name: "_factory",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "VeryFastRouter__BondingCurveQuoteError", type: "error" },
  { inputs: [], name: "VeryFastRouter__InvalidPair", type: "error" },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "contract ILSSVMPairFactoryLike",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract LSSVMPair", name: "pair", type: "address" },
      { internalType: "uint256", name: "numNFTs", type: "uint256" },
      { internalType: "uint256", name: "slippageScaling", type: "uint256" },
      { internalType: "uint256", name: "assetId", type: "uint256" },
    ],
    name: "getNFTQuoteForBuyOrderWithPartialFill",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract LSSVMPair", name: "pair", type: "address" },
      { internalType: "uint256", name: "numNFTs", type: "uint256" },
      { internalType: "uint256", name: "slippageScaling", type: "uint256" },
      { internalType: "uint256", name: "nftId", type: "uint256" },
    ],
    name: "getNFTQuoteForSellOrderWithPartialFill",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract LSSVMPair", name: "pair", type: "address" },
    ],
    name: "getPairBaseQuoteTokenBalance",
    outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC1155", name: "nft", type: "address" },
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256[]", name: "ids", type: "uint256[]" },
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    name: "pairTransferERC1155From",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ERC20", name: "token", type: "address" },
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "pairTransferERC20From",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC721", name: "nft", type: "address" },
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" },
    ],
    name: "pairTransferNFTFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "contract LSSVMPair",
                name: "pair",
                type: "address",
              },
              { internalType: "bool", name: "isERC721", type: "bool" },
              { internalType: "uint256[]", name: "nftIds", type: "uint256[]" },
              {
                internalType: "uint256",
                name: "maxInputAmount",
                type: "uint256",
              },
              { internalType: "uint256", name: "ethAmount", type: "uint256" },
              {
                internalType: "uint256",
                name: "expectedSpotPrice",
                type: "uint256",
              },
              {
                internalType: "uint256[]",
                name: "maxCostPerNumNFTs",
                type: "uint256[]",
              },
            ],
            internalType: "struct VeryFastRouter.BuyOrderWithPartialFill[]",
            name: "buyOrders",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "contract LSSVMPair",
                name: "pair",
                type: "address",
              },
              { internalType: "bool", name: "isETHSell", type: "bool" },
              { internalType: "bool", name: "isERC721", type: "bool" },
              { internalType: "uint256[]", name: "nftIds", type: "uint256[]" },
              { internalType: "bool", name: "doPropertyCheck", type: "bool" },
              {
                internalType: "bytes",
                name: "propertyCheckParams",
                type: "bytes",
              },
              {
                internalType: "uint128",
                name: "expectedSpotPrice",
                type: "uint128",
              },
              {
                internalType: "uint256",
                name: "minExpectedOutput",
                type: "uint256",
              },
              {
                internalType: "uint256[]",
                name: "minExpectedOutputPerNumNFTs",
                type: "uint256[]",
              },
            ],
            internalType: "struct VeryFastRouter.SellOrderWithPartialFill[]",
            name: "sellOrders",
            type: "tuple[]",
          },
          {
            internalType: "address payable",
            name: "tokenRecipient",
            type: "address",
          },
          { internalType: "address", name: "nftRecipient", type: "address" },
          { internalType: "bool", name: "recycleETH", type: "bool" },
        ],
        internalType: "struct VeryFastRouter.Order",
        name: "swapOrder",
        type: "tuple",
      },
    ],
    name: "swap",
    outputs: [
      { internalType: "uint256[]", name: "results", type: "uint256[]" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

export default poolSwapABI;
