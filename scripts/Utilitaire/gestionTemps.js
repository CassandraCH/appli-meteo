const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

let aujourdhui = new Date();
let options = {weekday: 'long'};
let jourActuel = aujourdhui.toLocaleDateString('fr-FR', options);
// console.log(jourActuel, aujourdhui);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let tabJoursOrdonne = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));

// console.log(tabJoursOrdonne);

export default tabJoursOrdonne;