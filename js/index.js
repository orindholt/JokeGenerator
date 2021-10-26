document.addEventListener("DOMContentLoaded", ()=>{
    const apiUrl = 'https://icanhazdadjoke.com/';
    const jokeTxt = document.querySelector("#jokeTxt");
    async function newJoke(){
        const reponse = await fetch(apiUrl, {headers: {Accept: "application/json"}});
        const data = await reponse.json();
        if(data.status !== 200){
            if(data.status == 429){
                jokeTxt.innerHTML = `Woah. Too fast!`;
            } else {
                jokeTxt.innerHTML = `There was an ERROR!<br>Error status: (${data.status})`;
            }
        } else {
            jokeTxt.textContent = data.joke;
        }
    }
    newJoke();
    document.querySelector("#jokeBtn").addEventListener("click", newJoke);
});