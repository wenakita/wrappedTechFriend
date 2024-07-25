export function formatUserName(target: any) {
  let formatted;
  if (/\s/.test(target)) {
    formatted = target.replace(/\s/, "%20");
    return formatted;
  }
  return target;
}
