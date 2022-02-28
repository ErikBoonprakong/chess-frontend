function cookieObj() {
  console.log("cookies: \n" + document.cookie);
  document.cookie = ";SameSite=None; Secure";
  console.log("sameSite = None cookies: \n" + document.cookie);
  const cookies = document.cookie.split("; ");
  if (!cookies) return false;
  const cookiesObj = {};
  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookiesObj[name] = value;
  });

  return cookiesObj;
}

export default cookieObj;
