function getMicrotime(float) {
  const now = new Date().getTime() / 1000;
  const s = parseInt(now, 10);

  return float ? now : Math.round((now - s) * 1000) / 1000 + " " + s;
}

export default getMicrotime;
