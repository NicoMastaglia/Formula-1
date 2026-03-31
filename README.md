# Formula-1 Dashboard

Applicazione web frontend (HTML, CSS, JavaScript vanilla) per consultare dati di Formula 1 per anno.

L'interfaccia offre due sezioni principali:

- `Classifiche`: classifica costruttori e classifica piloti.
- `Risultati`: elenco delle gare della stagione e dettaglio sintetico della gara selezionata.

## Funzionalita

- Selezione anno tramite input numerico (`1950` -> anno corrente).
- Aggiornamento dinamico dei contenuti al cambio anno.
- Navigazione tra vista classifiche e vista risultati.
- Recupero dati live da API pubbliche.
- Visualizzazione bandiere in base alla nazionalita di team/piloti.
- Layout responsive con sezioni dedicate (`main.css`, `standing.css`, `result.css`).

## Struttura progetto

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

## Stack tecnico

- HTML5
- CSS3
- JavaScript (ES6+)
- API esterne:
	- `https://api.jolpi.ca/ergast/f1/...` (dati Formula 1)
	- `https://restcountries.com/v3.1/name/...` (bandiere nazionali)

## Avvio locale

Non sono richieste dipendenze o build step.

1. Clona il repository.
2. Apri `index.html` nel browser.

Per evitare possibili limitazioni legate a `fetch` in alcuni ambienti, e consigliato usare un server locale semplice (es. estensione Live Server di VS Code o `python -m http.server`).

## Come funziona l'app

- All'avvio viene caricata di default la pagina `Risultati` (`loadResultPage()`).
- Il cambio anno richiama `refresh()`, che aggiorna la sezione attiva.
- Nella sezione `Classifiche`:
	- `getConstructorsStanding()` recupera la classifica costruttori.
	- `GetDriverStanding()` recupera la classifica piloti.
- Nella sezione `Risultati`:
	- `getRaceList()` recupera l'elenco gare dell'anno.
	- `getRaceResult(round)` recupera i dati della singola gara selezionata.

## Note utili

- L'interfaccia e i testi sono in italiano.
- Il controllo anno usa sia i limiti dell'input HTML che una validazione JavaScript (`checkYear`).
- In assenza dati viene mostrato un messaggio come `Nessun risultato rilevato in questo anno`.

## Limiti attuali

- La vista `Risultati` mostra informazioni della gara (nome, localita, circuito, data, round), ma non la classifica completa dei piloti per quella gara.
- Le chiamate a `getFlag` sono eseguite una per riga in modo sequenziale, quindi su alcune connessioni il caricamento puo risultare piu lento.

## Possibili miglioramenti

- Mostrare la classifica completa della gara nella sezione risultati.
- Aggiungere stato di caricamento/skeleton e gestione errori piu dettagliata.
- Introdurre caching per bandiere e risposte API.
- Migliorare accessibilita e supporto mobile avanzato.