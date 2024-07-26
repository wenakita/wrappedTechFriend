export function formatTopPairs(pairs: any) {
  const output = [];
  if (pairs.length < 4) {
    for (let i = 0; i < 1; i++) {
      output.push(pairs[i]);
    }
  } else {
    for (let i = 0; i <= 4; i++) {
      output.push(pairs[i]);
    }
  }
  return output;
}
