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
request.open("GET", "https://corsproxy.io/?https%3A%2F%2Fmenu-api.eldora.ch%2Fapi%2Fv1%2Fxml%2Fmenu%2F9133", true);

let doc;

request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status === 200) {
    doc = request.responseXML;
    console.log(doc);
    refresh(doc);
  }
};
request.send(null);

function refresh(doc) {
  const libPrix1 = doc.querySelector("LibPrix1").innerHTML;
  const libPrix2 = doc.querySelector("LibPrix2").innerHTML;
  document.querySelector("#restaurant-name").innerHTML = doc.querySelector("nomEts").innerHTML;
  menusLayout.innerHTML = "";
  if (doc.querySelector(DAYS[today]) === null) {
    menusLayout.innerHTML += "<p>Pas de menus</p>";
  } else {
    for (let menu of doc.querySelector(`${DAYS[today]} Menus`).children) {
      const htmlCard = `<div class="menu-card">
        <h1>${menu.querySelector("TitreFr").innerHTML}</h1>
        <p>${menu.querySelector("CorpsFr").innerHTML.replace(/(\r\n|\r|\n)/g, '<br>')}</p>
        <div class="menu-footer"><p>${libPrix1} ${menu.querySelector("Prix1").innerHTML}</p>
        <p>${libPrix2} ${menu.querySelector("Prix2").innerHTML}</p></div></div>`;
      menusLayout.innerHTML += htmlCard;
    }
  }
  document.querySelector("#day-name").innerHTML = DAYS[today];
  document.querySelector("#loading").style.display = "none";
  document.querySelector("#main").style.display = "block";
}

function previousDay() {
  if (today > 0) {
    today--;
  } else {
    today = 6;
  }
  refresh(doc);
}

function nextDay() {
  if (today < 6) {
    today++;
  } else {
    today = 0;
  }
  refresh(doc);
}