const URL = process.env.REACT_APP_APIURL;
const KEY = process.env.REACT_APP_APIKEY;

const Api = {
  getAllNotes() {
    return fetch(
      new Request(URL, {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          "X-Api-Key": KEY
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
          "X-Api-Key": KEY,
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
  }
};

export default Api;
