// Clé de l'API openweathermap
const cleAPI = "7ba5ef6edaf235f00a2f97e8ee4da108";
let resultatAPI;

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");

const heure = document.querySelectorAll(".heure-prevision-nom");
const tempPourH = document.querySelectorAll(".heure-prevision-valeur");


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( (position) => {
        // console.log(position);
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
        AppelAPI(longitude,latitude);
    }, () => {
        alert("Vous avez refusé la géolocalisation, l'application ne peut donc pas fonctionner :\ Veuillez à l'activer ;)");
    })
}

function AppelAPI(long, lat){
    // fetch retourne une promesse => ça va se résoudre quand la requête se sera bien effectuée
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${cleAPI}`)
    .then( (reponse) => {
        // on reçoit des données brutes => on les met au format json
        return reponse.json();
    })
    .then ( (data) => {
        // on s'occupe des données
        resultatAPI = data;

        temps.innerText = resultatAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatAPI.current.temp)}°C`;
        localisation.innerHTML = resultatAPI.timezone;

        // heures (par tranche de 3) avec leur temperature
        let heureActuelle = new Date().getHours();

        for(let i = 0; i < heure.length; i++){
            let heureIncr = heureActuelle + (i*3);

            if(heureIncr > 24){
                heure[i].innerText = `${heureIncr - 24} h`;
            }
            else if(heureIncr === 24){
                heure[i].innerText = `00 h`;
            }
            else{
               heure[i].innerText = `${heureIncr} h`;
            }

        }

        // temperature toute les 3h
        for(let j = 0; j < tempPourH.length; j++){
            tempPourH[j].innerText = `${Math.trunc(resultatAPI.hourly[j*3].temp)} °C`
        }
    })
}
