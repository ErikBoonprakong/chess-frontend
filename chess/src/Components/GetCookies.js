function cookieObj() {
  const cookies = document.cookie.split("; ");
  if (!cookies) return false;
  const cookiesObj = {};
  cookies.forEach((cookie) => {
    const [name, value] = cookie.split("=");
    cookiesObj[name] = value;
  });
  console.log(document.cookie);
  return cookiesObj;
}

export default cookieObj;
