import tokenImages from "../contracts/token-images";
export function detectERC20IMG(type: string, data: any) {
  let IMG = "";
  if (type !== undefined) {
    console.log(type);
    switch (type) {
      case "pools":
        IMG = detectPoolERC20(data);
        break;
      case "mints":
        IMG = tokenImages.eth;
    }
  }

  return IMG;
}

function detectPoolERC20(data: any) {
  switch (data) {
    case "$Friend":
      return tokenImages?.friend;

    case "$oooOOO":
      return tokenImages?.goddog;
  }
  return null;
}
