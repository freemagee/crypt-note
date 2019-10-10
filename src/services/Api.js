import CryptoJS from "crypto-js";
// ! This is hard coded, and would not be in production.
const USERNAME = "root";
const BASE = process.env.REACT_APP_API_BASE;
const AUTH = process.env.REACT_APP_API_AUTH;
const NOTES = process.env.REACT_APP_API_NOTES;
const APPSECRET = process.env.REACT_APP_SECRET;
// The token is a global. After Auth, the token will contain a GUID provided from the API which will allow access.
let token = null;

function getMicrotime(float) {
  const now = new Date().getTime() / 1000;
  const s = parseInt(now, 10);

  return float ? now : Math.round((now - s) * 1000) / 1000 + " " + s;
}

function generateNonce(length) {
  const uint32 = new Uint32Array(length);
  window.crypto.getRandomValues(uint32);

  return uint32.join("");
}

function generateHMAC(method, route, microtime) {
  const nonce = generateNonce(8);
  const msgParts = [method, route, microtime, nonce];
  const msg = msgParts.join("+");
  const signature = CryptoJS.HmacSHA512(msg, APPSECRET);
  const digest = btoa(`${USERNAME}:${nonce}:${signature.toString()}`);

  return digest;
}

const Api = {
  getAuth() {
    const microtime = getMicrotime(true);
    const hmac = generateHMAC("GET", AUTH, microtime);

    return fetch(
      new Request(`${BASE}${AUTH}`, {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          Authorization: `hmac ${hmac}`,
          "X-Microtime": microtime,
          "X-Token": null
        })
      })
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("There has been a problem retrieving auth token");
        }
      })
      .then(json => {
        if (json.status === "success" && json.data !== null) {
          token = json.data;
          return json.status;
        } else {
          throw new Error(json.message);
        }
      })
      .catch(error => {
        return null;
      });
  },
  getAllNotes() {
    const microtime = getMicrotime(true);
    const hmac = generateHMAC("GET", NOTES, microtime);

    return fetch(
      new Request(`${BASE}${NOTES}`, {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          Authorization: `hmac ${hmac}`,
          "X-Microtime": microtime,
          "X-Token": token
        })
      })
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("There has been a problem retrieving data");
        }
      })
      .then(json => {
        if (json.status === "success" && json.data !== null) {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      })
      .catch(error => {
        return null;
      });
  },
  getNote(id) {
    const route = `${NOTES}${id}`;
    const microtime = getMicrotime(true);
    const hmac = generateHMAC("GET", route, microtime);

    return fetch(
      new Request(`${BASE}${route}`, {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          Authorization: `hmac ${hmac}`,
          "X-Microtime": microtime,
          "X-Token": token
        })
      })
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("There has been a problem retrieving data");
        }
      })
      .then(json => {
        if (json.status === "success" && json.data !== null) {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      })
      .catch(error => {
        return null;
      });
  },
  saveNote(data) {
    const microtime = getMicrotime(true);
    const hmac = generateHMAC("POST", NOTES, microtime);

    return fetch(
      new Request(`${BASE}${NOTES}`, {
        method: "POST",
        mode: "cors",
        headers: new Headers({
          Authorization: `hmac ${hmac}`,
          "X-Microtime": microtime,
          "X-Token": token,
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(data)
      })
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("There has been a problem saving the data");
        }
      })
      .then(json => {
        if (json.status === "success" && json.data !== null) {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      })
      .catch(() => {
        return null;
      });
  },
  updateNote(data) {
    const route = `${NOTES}${data.guid}`;
    const microtime = getMicrotime(true);
    const hmac = generateHMAC("PUT", route, microtime);

    return fetch(
      new Request(`${BASE}${route}`, {
        method: "PUT",
        mode: "cors",
        headers: new Headers({
          Authorization: `hmac ${hmac}`,
          "X-Microtime": microtime,
          "X-Token": token,
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(data)
      })
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("There has been a problem updating the note");
        }
      })
      .then(json => {
        if (json.status === "success" && json.data !== null) {
          return json.data;
        } else {
          throw new Error(json.message);
        }
      })
      .catch(error => {
        return null;
      });
  },
  deleteNote(id) {
    const route = `${NOTES}${id}`;
    const microtime = getMicrotime(true);
    const hmac = generateHMAC("DELETE", route, microtime);

    return fetch(
      new Request(`${BASE}${route}`, {
        method: "DELETE",
        mode: "cors",
        headers: new Headers({
          Authorization: `hmac ${hmac}`,
          "X-Microtime": microtime,
          "X-Token": token
        })
      })
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("There has been a problem deleting the data");
        }
      })
      .then(json => {
        if (json.status === "success") {
          return { status: "success" };
        } else {
          throw new Error(json.message);
        }
      })
      .catch(error => {
        return null;
      });
  }
};

export default Api;
