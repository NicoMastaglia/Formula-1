# Formula-1 Dashboard

A frontend web application (HTML, CSS, vanilla JavaScript) to browse Formula 1 data by year.

The interface provides two main sections:

- `Classifiche`: constructor standings and driver standings.
- `Risultati`: list of season races and a short summary of the selected race.

## Features

- Year selection through numeric input (`1950` -> current year).
- Dynamic content updates when the year changes.
- Navigation between standings view and results view.
- Live data fetching from public APIs.
- Flag display based on team/driver nationality.
- Responsive layout with dedicated stylesheets (`main.css`, `standing.css`, `result.css`).

## Project structure

```text
.
├── index.html
├── scripts/
│   └── script.js
├── style/
│   ├── main.css
│   ├── result.css
│   └── standing.css
└── README.md
```

## Tech stack

- HTML5
- CSS3
- JavaScript (ES6+)
- External APIs:
  - `https://api.jolpi.ca/ergast/f1/...` (Formula 1 data)
  - `https://restcountries.com/v3.1/name/...` (national flags)

## Run locally

No dependencies or build steps are required.

1. Clone the repository.
2. Open `index.html` in your browser.

To avoid possible `fetch` limitations in some environments, using a simple local server is recommended (for example VS Code Live Server extension or `python -m http.server`).

## How the app works

- On startup, the `Risultati` page is loaded by default (`loadResultPage()`).
- Changing the year triggers `refresh()`, which updates the active section.
- In the `Classifiche` section:
  - `getConstructorsStanding()` fetches constructor standings.
  - `GetDriverStanding()` fetches driver standings.
- In the `Risultati` section:
  - `getRaceList()` fetches the race list for the selected year.
  - `getRaceResult(round)` fetches data for the selected race.

## Useful notes

- The interface and texts are in Italian.
- Year validation relies on both HTML input limits and JavaScript validation (`checkYear`).
- When no data is available, a message like `Nessun risultato rilevato in questo anno` is shown.

## Current limitations

- The `Risultati` view shows race info (name, location, circuit, date, round), but not the full driver standings for that race.
- Calls to `getFlag` are executed sequentially (one per row), so loading may be slower on some connections.

## Possible improvements

- Show full race standings in the results section.
- Add loading state/skeleton and more detailed error handling.
- Introduce caching for flags and API responses.
- Improve accessibility and advanced mobile support.
