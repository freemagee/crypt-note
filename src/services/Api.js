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
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        console.log(error);
        return null;
      });
  }
};

export default Api;
