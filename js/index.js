/* import "core-js/stable";
import "regenerator-runtime/runtime"; */
document.addEventListener("DOMContentLoaded", ()=>{
    const jokeTxt = document.querySelector("#jokeTxt");
    const jokeList = document.querySelector("#jokeList");

    const queryString = window.location.search;
    const urlParams = (param) => new URLSearchParams(queryString).get(param);
    const url = 'https://icanhazdadjoke.com/';
    // async fetch method

    /* const myFetch = async (api) =>{
        const response = await fetch(api, {headers: {Accept: "application/json"}});
        const data = await response.json();
        return data;
    } */

    // async axios method
    async function ax(api){
        const config = {
            method: "get",
            url: api,
            headers: {Accept: "application/json"}
        }
        const response = await axios(config);
        return response;
    }

    // new joke function
    function newJoke(search = ""){
        console.log(`${url}${search ? `search?term=${search}` : ""}`);
        ax(`${url}${search ? `search?term=${search}` : ""}`).then(data => {
            data = data.data;
            if(!search){
                jokeTxt.textContent = data.joke;
            } else {
                data.results.forEach(result => jokeList.innerHTML += `<li>${result.joke}</li>`);
            }
        });
    }
    newJoke();
    console.log(newJoke(urlParams("term")));
    document.querySelector("#jokeBtn").addEventListener("click", ()=>{newJoke()});
});