import CryptoJS from "crypto-js";
import generateNonce from "./generateNonce";

function generateHMAC(secret, username, method, route, microtime) {
  const nonce = generateNonce(8);
  const msgParts = [method, route, microtime, nonce];
  const msg = msgParts.join("+");
  const signature = CryptoJS.HmacSHA512(msg, secret);
  const digest = btoa(`${username}:${nonce}:${signature.toString()}`);

  return digest;
}

export default generateHMAC;
