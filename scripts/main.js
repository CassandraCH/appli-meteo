import tabJoursOrdonne from "./Utilitaire/gestionTemps.js";

// Clé de l'API openweathermap
const cleAPI = "7ba5ef6edaf235f00a2f97e8ee4da108";
let resultatAPI;

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");

const heure = document.querySelectorAll(".heure-prevision-nom");
const tempPourH = document.querySelectorAll(".heure-prevision-valeur");

const joursDiv = document.querySelectorAll(".jour-prevision-nom");
const tempJoursDiv = document.querySelectorAll(".jour-prevision-temp");

const icone = document.querySelector(".logo-meteo");
const chargement = document.querySelector(".overlay-icone-chargement");

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
        console.log(data);
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
        for(let i = 0; i < tempPourH.length; i++){
            tempPourH[i].innerText = `${Math.trunc(resultatAPI.hourly[i*3].temp)} °C`
        }

        // trois premières lettres des jours de la semaine
        for(let i = 0; i < tabJoursOrdonne.length; i++){
            joursDiv[i].innerText = tabJoursOrdonne[i].slice(0,3);
        }

        // temperature par jour
        for(let i = 0; i < 7; i++){
            tempJoursDiv[i].innerText = `${Math.trunc(resultatAPI.daily[i+1].temp.day)} °C`
        }

        // Icone dynamique
        if(heureActuelle >=6 && heureActuelle < 21){
            icone.src = `ressources/jour/${resultatAPI.current.weather[0].icon}.svg`;
        }
        else{
            icone.src = `ressources/nuit/${resultatAPI.current.weather[0].icon}.svg`;
        }

        chargement.classList.add("disparition");
    })
    .catch( (err) => console.log(err)); // si il y a une erreur, on l'affiche
}
