const DAYS = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi"
];
let today = new Date().getDay();

const menusLayout = document.querySelector("#menus");

let request = new XMLHttpRequest();
request.open("GET", "https://menu-api.eldora.ch/api/v1/xml/menu/9133", true);

let doc;

request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status === 200)
  {
    doc = request.responseXML;
    refresh(doc);
  }
};
request.send(null);

function refresh(doc) {
  const libPrix1 = doc.querySelector("LibPrix1").innerHTML;
  const libPrix2 = doc.querySelector("LibPrix2").innerHTML;
  document.querySelector("#restaurant-name").innerHTML = doc.querySelector("nomEts").innerHTML;
  menusLayout.innerHTML = "";
  for (let menu of doc.querySelector(`${DAYS[today]} Menus`).children) {
    const htmlCard = `<div class="menu-card">
        <h1>${menu.querySelector("TitreFr").innerHTML}</h1>
        <p>${menu.querySelector("CorpsFr").innerHTML.replace(/(\r\n|\r|\n)/g, '<br>')}</p>
        <div class="menu-footer"><p>${libPrix1} ${menu.querySelector("Prix1").innerHTML}</p>
        <p>${libPrix2} ${menu.querySelector("Prix2").innerHTML}</p></div></div>`;
    menusLayout.innerHTML += htmlCard;
  }
  document.querySelector("#day-name").innerHTML = DAYS[today];
  document.querySelector("#loading").style.display = "none";
  document.querySelector("#main").style.display = "block";
}

function previousDay() {
  if (today > 1) {
    today--;
  }
  refresh(doc);
}

function nextDay() {
  if (today < 5) {
    today++;
  }
  refresh(doc);
}