import CryptoJS from "crypto-js";
// ! This is hard coded, and would not be in production.
const USERNAME = "root";
const BASE = process.env.REACT_APP_API_BASE;
const AUTH = process.env.REACT_APP_API_AUTH;
const NOTES = process.env.REACT_APP_API_NOTES;
const APPSECRET = process.env.REACT_APP_SECRET;
const URL = "http://example.org";
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
          "X-MICROTIME": microtime
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
      .catch(() => {
        return null;
      });
  },
  getAllNotes() {
    return fetch(
      new Request(URL, {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          "X-TOKEN": token
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
      .catch(() => {
        return null;
      });
  },
  getNote(id) {
    return fetch(
      new Request(`${URL}${id}`, {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          "X-TOKEN": token
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
      .catch(() => {
        return null;
      });
  },
  saveNote(data) {
    return fetch(
      new Request(URL, {
        method: "POST",
        mode: "cors",
        headers: new Headers({
          "X-TOKEN": token,
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
    return fetch(
      new Request(`${URL}${data.guid}`, {
        method: "PUT",
        mode: "cors",
        headers: new Headers({
          "X-TOKEN": token,
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
  deleteNote(id) {
    return fetch(
      new Request(`${URL}${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: new Headers({
          "X-TOKEN": token
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
      .catch(() => {
        return null;
      });
  }
};

export default Api;
