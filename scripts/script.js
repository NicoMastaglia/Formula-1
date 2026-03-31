const MAIN = document.getElementById("main");
const standingBtn = document.getElementById("standing-btn");
const resultBtn = document.getElementById("result-btn");
const buttonBg = document.getElementById("test");
const nationalityMapping = {
  British: "United Kingdom",
  Monegasque: "Monaco",
  Dutch: "Netherlands",
  Swiss: "Switzerland",
  American: "United States",
  French: "France",
  German: "Germany",
  Greek: "Greece",
  Spanish: "Spain",
  Portuguese: "Portugal",
  Italian: "Italy",
  Japanese: "Japan",
  Chinese: "China",
  Argentine: "Argentina",
  Argentinian: "Argentina",
  Austrian: "Austria",
  Belgian: "Belgium",
  Brazilian: "Brazil",
  Canadian: "Canada",
  Danish: "Denmark",
  Egyptian: "Egypt",
  Finnish: "Finland",
  Greek: "Greece",
  Icelandic: "Iceland",
  Irish: "Ireland",
  Mexican: "Mexico",
  Norwegian: "Norway",
  Polish: "Poland",
  Russian: "Russia",
  Swedish: "Sweden",
  Turkish: "Turkey",
  Thai: "Thailand",
  Vietnamese: "Vietnam",
  Australian: "Australia",
  Newzealander: "New Zealand",
  Emirati: "United Arab Emirates",
  Saudi: "Saudi Arabia",
  Korean: "South Korea",
  Indian: "India",
  Pakistani: "Pakistan",
};

function refresh() {
  if (standingBtn.classList[1] == "not-select") {
    loadResultPage();
  } else {
    loadStandingPage();
  }
}

async function loadStandingPage() {
  standingBtn.classList.add("select");
  standingBtn.classList.remove("not-select");
  resultBtn.classList.add("not-select");
  resultBtn.classList.remove("select");
  buttonBg.style.right = "60%";

  MAIN.innerHTML = "";
  const content = `
  <div class="section" id="constructor-standing">
  <p class="section-title">Classifica costruttori</p>
  <div class="information">
        <span id="team">Team</span>
        <span>Vittorie</span>
        <span>Punti</span>
        </div>
        <div id="constructor-standing-data"></div>
        </div>
        
        <div class="section" id="driver-standing">
        <p class="section-title">Classifica piloti</p>
        <div class="driver-information">
        <span id="driver">Pilota</span>
        <span id="team">Team</span>
        <span>Vittorie</span>
        <span>Punti</span>
        </div>
        <div id="driver-standing-data"></div>
        </div>
        `;
  MAIN.innerHTML = content;

  printConstructorStanding(await getConstructorsStanding());
  printDriverStanding(await GetDriverStanding());
}

async function loadResultPage() {
  resultBtn.classList.add("select");
  resultBtn.classList.remove("not-select");
  standingBtn.classList.add("not-select");
  standingBtn.classList.remove("select");
  buttonBg.style.right = "20%";

  MAIN.innerHTML = "";
  const content = `
      <div class="race-box">
        <div class="race-list"></div>
        <div class="race-result"></div>
      </div>
  `;
  MAIN.innerHTML = content;

  printRaceList(await getRaceList());
  printRaceResult(await getRaceResult(1));

  const raceList = document.querySelector(".race-list");
  raceList.addEventListener("wheel", (e) => {
    e.preventDefault();
    raceList.scrollLeft += e.deltaY;
  });
}

function checkYear(year) {
  currentYear = new Date().getFullYear();

  if (year >= 1950 && year <= currentYear) {
    return true;
  } else {
    return false;
  }
}

async function getConstructorsStanding() {
  const year = document.getElementById("year").value;
  url = `https://api.jolpi.ca/ergast/f1/${year}/constructorstandings/`;
  if (checkYear(year)) {
    const response = await fetch(url);
    if (!response.ok) {
      return "Errore nel caricamento dei dati";
    }

    const result = await response.json();
    if (result.MRData.StandingsTable.StandingsLists.length == 0) {
      return "Nessun risultato rilevato in questo anno";
    } else {
      return result.MRData.StandingsTable.StandingsLists[0]
        .ConstructorStandings;
    }
  } else {
    return "Nessun risultato rilevato in questo anno";
  }
}

async function GetDriverStanding() {
  const year = document.getElementById("year").value;
  url = `https://api.jolpi.ca/ergast/f1/${year}/driverstandings/`;
  if (checkYear(year)) {
    const response = await fetch(url);
    if (!response.ok) {
      return "Errore nel caricamento dei dati";
    }

    const result = await response.json();
    if (result.MRData.StandingsTable.StandingsLists.length == 0) {
      return "Nessun risultato rilevato in questo anno";
    } else {
      return result.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    }
  } else {
    return "Nessun risultato rilevato in questo anno";
  }
}

async function getFlag(country) {
  const normalizedInput =
    country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
  const countryName = nationalityMapping[normalizedInput] || normalizedInput;

  url = `https://restcountries.com/v3.1/name/${countryName}`;
  const response = await fetch(url);
  if (!response.ok) {
    return "https://flagcdn.com/w320/white.png";
  }

  const result = await response.json();
  return result[0]?.flags?.png || "https://flagcdn.com/w320/white.png";
}

async function printConstructorStanding(data) {
  const constructorStanding = document.getElementById(
    "constructor-standing-data",
  );
  constructorStanding.textContent = "";

  if (typeof data == "string") {
    let newLine = `<p>
    <span class="team-name" style="width: 100%">${data}</span>
    </p>`;
    constructorStanding.innerHTML += newLine;
  } else {
    for (let i = 0; i < data.length; i++) {
      let flagUrl = await getFlag(
        data[i].Constructor.nationality.replace(/\s+/g, ""),
      );

      let newLine = `<p>
      <span class="team-name"><img src="${flagUrl}" class="flag-img"> ${i + 1}. ${data[i].Constructor.name}</span>
      <span class="team-wins">${data[i].wins}</span>
      <span class="team-point">${data[i].points}</span>
      </p>`;
      constructorStanding.innerHTML += newLine;
    }
  }
}

async function printDriverStanding(data) {
  const driverrStanding = document.getElementById("driver-standing-data");
  driverrStanding.textContent = "";

  if (typeof data == "string") {
    let newLine = `<p>
    <span class="team-name" style="width: 100%">${data}</span>
    </p>`;
    driverrStanding.innerHTML += newLine;
  } else {
    for (let i = 0; i < data.length; i++) {
      let flagUrl = await getFlag(
        data[i].Driver.nationality.replace(/\s+/g, ""),
      );

      let newLine = `<p>
      <span class="team-name">
      <img src="${flagUrl}" class="flag-img"> 
      ${i + 1}. 
      ${data[i].Driver.familyName}
      </span>
      <span class="driver-team">${data[i].Constructors[data[i].Constructors.length - 1].name}</span>
      <span class="team-wins">${data[i].wins}</span>
      <span class="team-point">${data[i].points}</span>
      </p>`;
      driverrStanding.innerHTML += newLine;
    }
  }
}

async function getRaceList() {
  const year = document.getElementById("year").value;
  url = `https://api.jolpi.ca/ergast/f1/${year}/`;

  if (checkYear(year)) {
    const response = await fetch(url);
    if (!response.ok) {
      return "Errore nel caricamento dei dati";
    }

    const result = await response.json();
    if (result.MRData.RaceTable.Races.length != 0) {
      return result.MRData.RaceTable.Races;
    } else {
      return "Nessun risultato rilevato in questo anno";
    }
  } else {
    return "Nessun risultato rilevato in questo anno";
  }
}

async function printRaceList(data) {
  const raceContainer = document.querySelector(".race-list");
  if (typeof data != "string") {
    raceContainer.innerHTML += "<div class='cover'></div>";
    for (let i = 0; i < data.length; i++) {
      let newLine = `
        <span 
          id="round-${data[i].round}" 
          class="${i == 0 ? "active" : "not-active"}"
          onclick="(changeRace('round-${data[i].round}'), printRaceResult(getRaceResult('${data[i].round}')))">
            ${data[i].Circuit.Location.country}
        </span>
      `;
      raceContainer.innerHTML += newLine;
    }
  }
}

function changeRace(id) {
  const idSplit = id.split("-")[1];
  const raceContainer = document.querySelector(".race-list");
  const cover = document.querySelector(".cover");

  for (let i = 0; i < raceContainer.children.length; i++) {
    raceContainer.children[i].classList.remove("active");
    raceContainer.children[i].classList.add("not-active");
  }
  cover.style.left = `${(idSplit - 1) * 15}%`;
  raceContainer.children[idSplit].classList.add("active");
  raceContainer.children[idSplit].classList.remove("not-active");
}

async function getRaceResult(round) {
  const year = document.getElementById("year").value;
  url = `https://api.jolpi.ca/ergast/f1/${year}/${round}/results`;

  if (checkYear(year)) {
    const response = await fetch(url);
    if (!response.ok) {
      return "Errore nel caricamento dei dati";
    }

    const result = await response.json();
    if (result.MRData.RaceTable.Races.length == 0) {
      return "Nessun dato disponibile per questa gara";
    }

    return result.MRData.RaceTable.Races;
  } else {
    return "Nessun risultato rilevato in questo anno";
  }
}

async function printRaceResult(data) {
  const loadData = await data;
  const BOX = document.querySelector(".race-result");
  BOX.innerHTML = "";
  if (typeof loadData == "string") {
    BOX.innerHTML += `<p class="error-message">${loadData}</p>`;
  } else {
    console.log(loadData[0]);
    BOX.innerHTML += `
                    <div class="info-container">
                      <p class="race-name">${loadData[0].raceName}</p>
                      <div class="race-info">
                        <span>Località: <span>${loadData[0].Circuit.Location.locality}</span></span>
                        <span>Circuito: <span>${loadData[0].Circuit.circuitName}</span></span>
                        <span>Data: <span>${loadData[0].date}</span></span>
                        <span>Round: <span>${loadData[0].round}</span></span>
                      </div>
                    </div>
                    `;
  }
}

standingBtn.addEventListener("click", loadStandingPage);
resultBtn.addEventListener("click", loadResultPage);

// loadStandingPage();
loadResultPage();
