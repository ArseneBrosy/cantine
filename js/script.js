const DAYS = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi"
];
const today = DAYS[new Date().getDay()];

let request = new XMLHttpRequest();
request.open("GET", "https://menu-api.eldora.ch/api/v1/xml/menu/9133", true);
request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status === 200)
  {
    const doc = request.responseXML;
    console.log(doc.querySelector(`${today} Menu1`));
    console.log(doc.querySelector(today));
  }
};
request.send(null);