const poolCreatorABI: any[] = [
  {
    inputs: [
      {
        internalType: "contract LSSVMPairERC721ETH",
        name: "_erc721ETHTemplate",
        type: "address",
      },
      {
        internalType: "contract LSSVMPairERC721ERC20",
        name: "_erc721ERC20Template",
        type: "address",
      },
      {
        internalType: "contract LSSVMPairERC1155ETH",
        name: "_erc1155ETHTemplate",
        type: "address",
      },
      {
        internalType: "contract LSSVMPairERC1155ERC20",
        name: "_erc1155ERC20Template",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_protocolFeeRecipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_protocolFeeMultiplier",
        type: "uint256",
      },
      { internalType: "address", name: "_owner", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "LSSVMPairFactory__BondingCurveNotWhitelisted",
    type: "error",
  },
  { inputs: [], name: "LSSVMPairFactory__CannotCallRouter", type: "error" },
  { inputs: [], name: "LSSVMPairFactory__FeeTooLarge", type: "error" },
  { inputs: [], name: "LSSVMPairFactory__InvalidPair", type: "error" },
  { inputs: [], name: "LSSVMPairFactory__ReentrantCall", type: "error" },
  {
    inputs: [],
    name: "LSSVMPairFactory__SettingsNotEnabledForCollection",
    type: "error",
  },
  {
    inputs: [],
    name: "LSSVMPairFactory__SettingsNotEnabledForPair",
    type: "error",
  },
  { inputs: [], name: "LSSVMPairFactory__UnauthorizedCaller", type: "error" },
  { inputs: [], name: "LSSVMPairFactory__ZeroAddress", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract ICurve",
        name: "bondingCurve",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "isAllowed", type: "bool" },
    ],
    name: "BondingCurveStatusUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "target",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "isAllowed", type: "bool" },
    ],
    name: "CallTargetStatusUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "recipientAddress",
        type: "address",
      },
    ],
    name: "DefaultProtocolFeeRecipientUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "poolAddress",
        type: "address",
      },
      { indexed: true, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ERC1155Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "poolAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ERC20Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "poolAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "NFTDeposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "poolAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "initialBalance",
        type: "uint256",
      },
    ],
    name: "NewERC1155Pair",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "poolAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "initialIds",
        type: "uint256[]",
      },
    ],
    name: "NewERC721Pair",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
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
        internalType: "uint256",
        name: "newMultiplier",
        type: "uint256",
      },
    ],
    name: "ProtocolFeeMultiplierUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "referrerAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipientAddress",
        type: "address",
      },
    ],
    name: "ProtocolFeeRecipientReferralAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract LSSVMRouter",
        name: "router",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "isAllowed", type: "bool" },
    ],
    name: "RouterStatusUpdate",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "referrerAddress", type: "address" },
      {
        internalType: "address payable",
        name: "recipientAddress",
        type: "address",
      },
    ],
    name: "addProtocolFeeRecipientReferral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "tokenAddress", type: "address" },
      { internalType: "address", name: "proposedAuthAddress", type: "address" },
    ],
    name: "authAllowedForToken",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "contract ICurve", name: "", type: "address" }],
    name: "bondingCurveAllowed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_defaultProtocolFeeRecipient",
        type: "address",
      },
    ],
    name: "changeDefaultProtocolFeeRecipient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_protocolFeeMultiplier",
        type: "uint256",
      },
    ],
    name: "changeProtocolFeeMultiplier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "closeLock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "contract ERC20", name: "token", type: "address" },
          { internalType: "contract IERC1155", name: "nft", type: "address" },
          {
            internalType: "contract ICurve",
            name: "bondingCurve",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "assetRecipient",
            type: "address",
          },
          {
            internalType: "enum LSSVMPair.PoolType",
            name: "poolType",
            type: "uint8",
          },
          { internalType: "uint128", name: "delta", type: "uint128" },
          { internalType: "uint96", name: "fee", type: "uint96" },
          { internalType: "uint128", name: "spotPrice", type: "uint128" },
          { internalType: "uint256", name: "nftId", type: "uint256" },
          {
            internalType: "uint256",
            name: "initialNFTBalance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "initialTokenBalance",
            type: "uint256",
          },
          { internalType: "address", name: "hookAddress", type: "address" },
          { internalType: "address", name: "referralAddress", type: "address" },
        ],
        internalType: "struct LSSVMPairFactory.CreateERC1155ERC20PairParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createPairERC1155ERC20",
    outputs: [
      {
        internalType: "contract LSSVMPairERC1155ERC20",
        name: "pair",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC1155", name: "_nft", type: "address" },
      {
        internalType: "contract ICurve",
        name: "_bondingCurve",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_assetRecipient",
        type: "address",
      },
      {
        internalType: "enum LSSVMPair.PoolType",
        name: "_poolType",
        type: "uint8",
      },
      { internalType: "uint128", name: "_delta", type: "uint128" },
      { internalType: "uint96", name: "_fee", type: "uint96" },
      { internalType: "uint128", name: "_spotPrice", type: "uint128" },
      { internalType: "uint256", name: "_nftId", type: "uint256" },
      { internalType: "uint256", name: "_initialNFTBalance", type: "uint256" },
      { internalType: "address", name: "_hookAddress", type: "address" },
      { internalType: "address", name: "_referralAddress", type: "address" },
    ],
    name: "createPairERC1155ETH",
    outputs: [
      {
        internalType: "contract LSSVMPairERC1155ETH",
        name: "pair",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "contract ERC20", name: "token", type: "address" },
          { internalType: "contract IERC721", name: "nft", type: "address" },
          {
            internalType: "contract ICurve",
            name: "bondingCurve",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "assetRecipient",
            type: "address",
          },
          {
            internalType: "enum LSSVMPair.PoolType",
            name: "poolType",
            type: "uint8",
          },
          { internalType: "uint128", name: "delta", type: "uint128" },
          { internalType: "uint96", name: "fee", type: "uint96" },
          { internalType: "uint128", name: "spotPrice", type: "uint128" },
          { internalType: "address", name: "propertyChecker", type: "address" },
          {
            internalType: "uint256[]",
            name: "initialNFTIDs",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "initialTokenBalance",
            type: "uint256",
          },
          { internalType: "address", name: "hookAddress", type: "address" },
          { internalType: "address", name: "referralAddress", type: "address" },
        ],
        internalType: "struct LSSVMPairFactory.CreateERC721ERC20PairParams",
        name: "params",
        type: "tuple",
      },
    ],
    name: "createPairERC721ERC20",
    outputs: [
      {
        internalType: "contract LSSVMPairERC721ERC20",
        name: "pair",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC721", name: "_nft", type: "address" },
      {
        internalType: "contract ICurve",
        name: "_bondingCurve",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_assetRecipient",
        type: "address",
      },
      {
        internalType: "enum LSSVMPair.PoolType",
        name: "_poolType",
        type: "uint8",
      },
      { internalType: "uint128", name: "_delta", type: "uint128" },
      { internalType: "uint96", name: "_fee", type: "uint96" },
      { internalType: "uint128", name: "_spotPrice", type: "uint128" },
      { internalType: "address", name: "_propertyChecker", type: "address" },
      { internalType: "uint256[]", name: "_initialNFTIDs", type: "uint256[]" },
      { internalType: "address", name: "_hookAddress", type: "address" },
      { internalType: "address", name: "_referralAddress", type: "address" },
    ],
    name: "createPairERC721ETH",
    outputs: [
      {
        internalType: "contract LSSVMPairERC721ETH",
        name: "pair",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "defaultProtocolFeeRecipient",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC1155", name: "nft", type: "address" },
      { internalType: "uint256", name: "id", type: "uint256" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "depositERC1155",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ERC20", name: "token", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "depositERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract IERC721", name: "_nft", type: "address" },
      { internalType: "uint256[]", name: "ids", type: "uint256[]" },
      { internalType: "address", name: "recipient", type: "address" },
    ],
    name: "depositNFTs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "settings", type: "address" },
      { internalType: "address", name: "pairAddress", type: "address" },
    ],
    name: "disableSettingsForPair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "settings", type: "address" },
      { internalType: "address", name: "pairAddress", type: "address" },
    ],
    name: "enableSettingsForPair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "erc1155ERC20Template",
    outputs: [
      {
        internalType: "contract LSSVMPairERC1155ERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "erc1155ETHTemplate",
    outputs: [
      {
        internalType: "contract LSSVMPairERC1155ETH",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "erc721ERC20Template",
    outputs: [
      {
        internalType: "contract LSSVMPairERC721ERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "erc721ETHTemplate",
    outputs: [
      {
        internalType: "contract LSSVMPairERC721ETH",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "pairAddress", type: "address" }],
    name: "getPairNFTType",
    outputs: [
      {
        internalType: "enum ILSSVMPairFactoryLike.PairNFTType",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "pairAddress", type: "address" }],
    name: "getPairTokenType",
    outputs: [
      {
        internalType: "enum ILSSVMPairFactoryLike.PairTokenType",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "referrerAddress", type: "address" },
    ],
    name: "getProtocolFeeRecipient",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "pairAddress", type: "address" }],
    name: "getSettingsForPair",
    outputs: [
      { internalType: "bool", name: "settingsEnabled", type: "bool" },
      { internalType: "uint96", name: "bps", type: "uint96" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "pairAddress", type: "address" }],
    name: "isValidPair",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "openLock",
    outputs: [],
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
    name: "protocolFeeMultiplier",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "protocolFeeRecipientReferral",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract LSSVMRouter", name: "", type: "address" },
    ],
    name: "routerStatus",
    outputs: [
      { internalType: "bool", name: "allowed", type: "bool" },
      { internalType: "bool", name: "wasEverTouched", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ICurve",
        name: "bondingCurve",
        type: "address",
      },
      { internalType: "bool", name: "isAllowed", type: "bool" },
    ],
    name: "setBondingCurveAllowed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract LSSVMRouter",
        name: "_router",
        type: "address",
      },
      { internalType: "bool", name: "isAllowed", type: "bool" },
    ],
    name: "setRouterAllowed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "settingsForCollection",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "settingsForPair",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "settings", type: "address" },
      { internalType: "address", name: "collectionAddress", type: "address" },
      { internalType: "bool", name: "enable", type: "bool" },
    ],
    name: "toggleSettingsForCollection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "contract ERC20", name: "token", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "withdrawERC20ProtocolFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawETHProtocolFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];

export default poolCreatorABI;
