import { debankHeader } from "../../requests/request-body/request-body";

export async function getPrices(token: any) {
  try {
    const res = await fetch(
      `https://pro-openapi.debank.com/v1/token?chain_id=base&id=${token}`,
      debankHeader
    );
    const data = await res.json();
    return Number(data?.price);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getEthPrice() {
  try {
    const res = await fetch(
      "https://api.dexscreener.com/latest/dex/pairs/base/0xb4CB800910B228ED3d0834cF79D697127BBB00e5"
    );
    const data = await res.json();
    return Number(data.pairs[0].priceNative);
  } catch (error) {
    console.log(error);
    return null;
  }
}
