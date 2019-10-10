function generateNonce(length) {
  const uint32 = new Uint32Array(length);
  window.crypto.getRandomValues(uint32);

  return uint32.join("");
}

export default generateNonce;
