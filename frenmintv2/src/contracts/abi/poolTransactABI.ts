const poolTransactABI: any[] = [
  {
    inputs: [
      {
        internalType: "contract IRoyaltyEngineV1",
        name: "royaltyEngine",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "LSSVMPairERC20__AssetRecipientNotPaid", type: "error" },
  { inputs: [], name: "LSSVMPairERC20__MsgValueNotZero", type: "error" },
  { inputs: [], name: "LSSVMPairERC20__RoyaltyNotPaid", type: "error" },
  { inputs: [], name: "LSSVMPair__AlreadyInitialized", type: "error" },
  {
    inputs: [
      {
        internalType: "enum CurveErrorCodes.Error",
        name: "error",
        type: "uint8",
      },
    ],
    name: "LSSVMPair__BondingCurveError",
    type: "error",
  },
  { inputs: [], name: "LSSVMPair__DemandedInputTooLarge", type: "error" },
  { inputs: [], name: "LSSVMPair__FunctionNotAllowed", type: "error" },
  { inputs: [], name: "LSSVMPair__InvalidDelta", type: "error" },
  { inputs: [], name: "LSSVMPair__InvalidSpotPrice", type: "error" },
  { inputs: [], name: "LSSVMPair__NftNotTransferred", type: "error" },
  { inputs: [], name: "LSSVMPair__NonTradePoolWithTradeFee", type: "error" },
  { inputs: [], name: "LSSVMPair__NotRouter", type: "error" },
  { inputs: [], name: "LSSVMPair__OutputTooSmall", type: "error" },
  { inputs: [], name: "LSSVMPair__RoyaltyTooLarge", type: "error" },
  { inputs: [], name: "LSSVMPair__TargetNotAllowed", type: "error" },
  { inputs: [], name: "LSSVMPair__TradeFeeTooLarge", type: "error" },
  { inputs: [], name: "LSSVMPair__WrongPoolType", type: "error" },
  { inputs: [], name: "LSSVMPair__ZeroSwapAmount", type: "error" },
  { inputs: [], name: "Ownable_NewOwnerZeroAddress", type: "error" },
  { inputs: [], name: "Ownable_NotOwner", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint128",
        name: "newDelta",
        type: "uint128",
      },
    ],
    name: "DeltaUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint96",
        name: "newFee",
        type: "uint96",
      },
    ],
    name: "FeeUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "NFTWithdrawal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "numNFTs",
        type: "uint256",
      },
    ],
    name: "NFTWithdrawal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint128",
        name: "newSpotPrice",
        type: "uint128",
      },
    ],
    name: "SpotPriceUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "royaltyAmount",
        type: "uint256",
      },
    ],
    name: "SwapNFTInPair",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numNFTs",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "royaltyAmount",
        type: "uint256",
      },
    ],
    name: "SwapNFTInPair",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "royaltyAmount",
        type: "uint256",
      },
    ],
    name: "SwapNFTOutPair",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numNFTs",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "royaltyAmount",
        type: "uint256",
      },
    ],
    name: "SwapNFTOutPair",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenWithdrawal",
    type: "event",
  },
  {
    inputs: [],
    name: "ROYALTY_ENGINE",
    outputs: [
      { internalType: "contract IRoyaltyEngineV1", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bondingCurve",
    outputs: [
      {
        internalType: "contract ICurve",
        name: "_bondingCurve",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "assetId", type: "uint256" },
      { internalType: "uint256", name: "saleAmount", type: "uint256" },
    ],
    name: "calculateRoyaltiesView",
    outputs: [
      {
        internalType: "address payable[]",
        name: "royaltyRecipients",
        type: "address[]",
      },
      { internalType: "uint256[]", name: "royaltyAmounts", type: "uint256[]" },
      { internalType: "uint256", name: "royaltyTotal", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "newRecipient",
        type: "address",
      },
    ],
    name: "changeAssetRecipient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint128", name: "newDelta", type: "uint128" }],
    name: "changeDelta",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint96", name: "newFee", type: "uint96" }],
    name: "changeFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newReferral", type: "address" }],
    name: "changeReferralAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint128", name: "newSpotPrice", type: "uint128" },
    ],
    name: "changeSpotPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "delta",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "contract ILSSVMPairFactoryLike",
        name: "_factory",
        type: "address",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "fee",
    outputs: [{ internalType: "uint96", name: "", type: "uint96" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAssetRecipient",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "assetId", type: "uint256" },
      { internalType: "uint256", name: "numNFTs", type: "uint256" },
    ],
    name: "getBuyNFTQuote",
    outputs: [
      {
        internalType: "enum CurveErrorCodes.Error",
        name: "error",
        type: "uint8",
      },
      { internalType: "uint256", name: "newSpotPrice", type: "uint256" },
      { internalType: "uint256", name: "newDelta", type: "uint256" },
      { internalType: "uint256", name: "inputAmount", type: "uint256" },
      { internalType: "uint256", name: "protocolFee", type: "uint256" },
      { internalType: "uint256", name: "royaltyAmount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFeeRecipient",
    outputs: [
      {
        internalType: "address payable",
        name: "_feeRecipient",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "assetId", type: "uint256" },
      { internalType: "uint256", name: "numNFTs", type: "uint256" },
    ],
    name: "getSellNFTQuote",
    outputs: [
      {
        internalType: "enum CurveErrorCodes.Error",
        name: "error",
        type: "uint8",
      },
      { internalType: "uint256", name: "newSpotPrice", type: "uint256" },
      { internalType: "uint256", name: "newDelta", type: "uint256" },
      { internalType: "uint256", name: "outputAmount", type: "uint256" },
      { internalType: "uint256", name: "protocolFee", type: "uint256" },
      { internalType: "uint256", name: "royaltyAmount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hook",
    outputs: [
      { internalType: "contract IPairHooks", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      {
        internalType: "address payable",
        name: "_assetRecipient",
        type: "address",
      },
      { internalType: "uint128", name: "_delta", type: "uint128" },
      { internalType: "uint96", name: "_fee", type: "uint96" },
      { internalType: "uint128", name: "_spotPrice", type: "uint128" },
      { internalType: "address", name: "_hookAddress", type: "address" },
      { internalType: "address", name: "_referralAddress", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes[]", name: "calls", type: "bytes[]" },
      { internalType: "bool", name: "revertOnFail", type: "bool" },
    ],
    name: "multicall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nft",
    outputs: [{ internalType: "address", name: "_nft", type: "address" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "nftId",
    outputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC1155BatchReceived",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC1155Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pairVariant",
    outputs: [
      {
        internalType: "enum ILSSVMPairFactoryLike.PairVariant",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "poolType",
    outputs: [
      {
        internalType: "enum LSSVMPair.PoolType",
        name: "_poolType",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "referralAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "spotPrice",
    outputs: [{ internalType: "uint128", name: "", type: "uint128" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "numNFTs", type: "uint256[]" },
      {
        internalType: "uint256",
        name: "minExpectedTokenOutput",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "tokenRecipient",
        type: "address",
      },
      { internalType: "bool", name: "isRouter", type: "bool" },
      { internalType: "address", name: "routerCaller", type: "address" },
    ],
    name: "swapNFTsForToken",
    outputs: [
      { internalType: "uint256", name: "outputAmount", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "numNFTs", type: "uint256[]" },
      {
        internalType: "uint256",
        name: "maxExpectedTokenInput",
        type: "uint256",
      },
      { internalType: "address", name: "nftRecipient", type: "address" },
      { internalType: "bool", name: "isRouter", type: "bool" },
      { internalType: "address", name: "routerCaller", type: "address" },
    ],
    name: "swapTokenForSpecificNFTs",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      { internalType: "contract ERC20", name: "_token", type: "address" },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newOwner", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC1155", name: "a", type: "address" },
      { internalType: "uint256[]", name: "ids", type: "uint256[]" },
      { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
    ],
    name: "withdrawERC1155",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ERC20", name: "a", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "withdrawERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC721", name: "a", type: "address" },
      { internalType: "uint256[]", name: "nftIds", type: "uint256[]" },
    ],
    name: "withdrawERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default poolTransactABI;
