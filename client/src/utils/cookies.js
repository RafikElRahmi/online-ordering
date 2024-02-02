export  function  getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export function tokenization(res) {
  const tokenData = res.headers.get("Authorization");
  if (tokenData) {
    const token = tokenData?.split(";")[0].split(" ")[1];
    const expires = tokenData?.split(";")[1].split("=")[1];
    document.cookie = `token=${token}; expires=${new Date(
      expires
    ).toUTCString()}; path=/`;
    return true;
  }
  return false;
}
export function clearToken() {
  document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
