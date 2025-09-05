## KIJK IN BRANCHES!! "7-7-2025"
### in de branches staan alle bestanden!!!
# game1.js "7-2025"
Dit is gewoon een dom project omdat ik me verveelde haha ik ga in deze "README.md" alles opschrijven en mn problemen delen over dit project
game2.js werkt nog niet maar game1.js nog wel ook let niet op de naam 'chattapp dat was het eerste originele idee dan... maar was te lastig

# game2.js "Verlaten project"
Game 2.js is vanaf "8-7-2025" een verlaten project...
Game zou met de juiste instellingen moeten werken maar dat moet je maar lekker zelf uitzoeken


# Honerable mention 
Er komen ook andere games bij uiteindelijk..

# advanced clicker game
Ik ga hier nu aan werken ik update dit later met meer info "12:10" 8-7-2025 

### Game is na kort te werken klaar met bijbehorende uitleg V "12:30" 8-7-2025

### Voor nu heeft de game nog veel errors ga er hopelijk ooit nog aan werken als ik tijd en zin heb in mn vakantie!! "12:33" 8-7-2025

# Advanced Clicker Game - Installatie en Gebruik

## 1. React-project aanmaken (indien nodig)

Open je terminal en voer de volgende commando's uit:

```bash
npx create-react-app mijn-clicker-game

cd mijn-clicker-game
```

## 2. Bestanden toevoegen

Ga naar de map `src/` van je project en voeg daar **deze twee bestanden** toe:

### a. `AdvancedClickerGame.jsx`

Maak een nieuw bestand aan met de naam `AdvancedClickerGame.jsx` in de map `src/` en plak hierin de volledige code van het clicker spel.

### b. `App.js`

Vervang de inhoud van `src/App.js` door het volgende:

```jsx
import React from "react";
import AdvancedClickerGame from "./AdvancedClickerGame";

function App() {
  return <AdvancedClickerGame />;
}

export default App;
```

## 3. Het spel starten

Voer in je terminal het volgende commando uit:

```bash
npm start
```

Je browser opent nu automatisch op [http://localhost:3000](http://localhost:3000) en je ziet het clicker spel.

## 4. Spelen!

- Klik op de knop om punten te verdienen.
- Koop upgrades en auto-clickers met je punten.
- Prestige voor een permanente bonus.
- Bekijk je prestaties, instellingen en de lokale ranglijst.

---

**Let op:**  
Je hoeft niets toe te voegen aan de browserconsole of extra pakketten te installeren.  
Alle instellingen en voortgang worden lokaal opgeslagen.

Veel plezier!

### Start van schooljaar 11:50  5-9-2025
het was een lange 6 weken maar ik ben weer actief op github!! 
ik heb gelijk iets nieuws bijgevoegd een nieuwe clicker game 
om te spelen maak een nieuw tekstblok met de naam 
```bash
index.html
```
en plak daarin de tekst uit index.html (te vinden in bestanden)
of kopieer en plak hieronder V
```bash
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clicker Game</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #333;
        }

        .game-container {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 400px;
            width: 100%;
        }

        button {
            font-size: 20px;
            padding: 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        button:hover {
            background-color: #45a049;
        }

        .upgrades {
            margin-top: 20px;
        }

        .stats {
            margin-top: 20px;
            font-size: 18px;
        }

        h2 {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>Clicker Game</h1>
        <div class="click-area">
            <button id="clickButton">Klik hier!</button>
            <p>Clicks: <span id="clickCount">0</span></p>
        </div>
        
        <div class="upgrades">
            <h2>Upgrades</h2>
            <div id="upgradeContainer"></div>
        </div>

        <div class="stats">
            <p>Clicks per seconde: <span id="clicksPerSecond">0</span></p>
            <p>Saldo: <span id="currency">0</span> 💰</p>
        </div>
    </div>

    <script>
        // Variabelen voor de game
        let clickCount = 0;
        let currency = 0;
        let clicksPerSecond = 0;
        let upgradeCost = 10;
        let upgradeMultiplier = 1;

        // DOM-elementen
        const clickButton = document.getElementById('clickButton');
        const clickCountDisplay = document.getElementById('clickCount');
        const currencyDisplay = document.getElementById('currency');
        const upgradesContainer = document.getElementById('upgradeContainer');
        const clicksPerSecondDisplay = document.getElementById('clicksPerSecond');

        // Functie om te klikken
        clickButton.addEventListener('click', () => {
            clickCount += upgradeMultiplier;
            currency += upgradeMultiplier;
            updateDisplays();
        });

        // Functie om de weergave bij te werken
        function updateDisplays() {
            clickCountDisplay.textContent = clickCount;
            currencyDisplay.textContent = currency;
            clicksPerSecondDisplay.textContent = clicksPerSecond;
        }

        // Upgrade kopen
        function buyUpgrade() {
            if (currency >= upgradeCost) {
                currency -= upgradeCost;
                upgradeMultiplier += 1;
                upgradeCost *= 2; // De prijs verdubbelt bij elke upgrade
                clicksPerSecond += 1;
                updateDisplays();
                renderUpgrades();
            } else {
                alert('Je hebt niet genoeg geld!');
            }
        }

        // Functie om upgrades weer te geven
        function renderUpgrades() {
            upgradesContainer.innerHTML = `
                <p>Upgrade Kost: ${upgradeCost} 💰</p>
                <button id="buyUpgradeButton">Upgrade: +1 per klik</button>
            `;
            document.getElementById('buyUpgradeButton').addEventListener('click', buyUpgrade);
        }

        // Interval om automatisch klikken toe te voegen
        setInterval(() => {
            clickCount += clicksPerSecond;
            currency += clicksPerSecond;
            updateDisplays();
        }, 1000);

        // Start de game
        renderUpgrades();
    </script>
</body>
</html>
```
Veel speelplezier!!

## index2.html
Gelijk een nieuwe gemaakt met chatgpt uit verveling..
Om te spelen maak een tekstblok aan met de naam 
```bash
index2.html
```
Daarna voeg je de tekst in van het bestand index2.html of kopieer je het hieronder V
```bash
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Geavanceerd Clicker Game</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #333;
        }

        .game-container {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }

        button {
            font-size: 20px;
            padding: 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        button:hover {
            background-color: #45a049;
        }

        .upgrades, .click-area, .stats {
            margin-top: 20px;
        }

        .upgrades button, .click-area button {
            margin-top: 10px;
        }

        .stats {
            margin-top: 20px;
            font-size: 18px;
        }

        h2 {
            margin-top: 20px;
        }

        .upgrade-item {
            margin-top: 10px;
        }

        .upgrade-item span {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="game-container">
        <h1>Geavanceerd Clicker Game</h1>
        <div class="click-area">
            <button id="clickButton">Klik hier!</button>
            <p>Clicks: <span id="clickCount">0</span></p>
        </div>

        <div class="upgrades">
            <h2>Upgrades</h2>
            <div id="upgradeContainer"></div>
        </div>

        <div class="stats">
            <p>Clicks per seconde: <span id="clicksPerSecond">0</span></p>
            <p>Saldo: <span id="currency">0</span> 💰</p>
        </div>
    </div>

    <script>
        // Laad voortgang uit localStorage, of gebruik standaardwaarden
        let clickCount = parseInt(localStorage.getItem("clickCount")) || 0;
        let currency = parseInt(localStorage.getItem("currency")) || 0;
        let clicksPerSecond = parseInt(localStorage.getItem("clicksPerSecond")) || 0;
        let upgradeCost = parseInt(localStorage.getItem("upgradeCost")) || 10;
        let upgradeMultiplier = parseInt(localStorage.getItem("upgradeMultiplier")) || 1;
        let autoClickerCost = parseInt(localStorage.getItem("autoClickerCost")) || 50;
        let autoClickers = parseInt(localStorage.getItem("autoClickers")) || 0;

        // DOM-elementen
        const clickButton = document.getElementById('clickButton');
        const clickCountDisplay = document.getElementById('clickCount');
        const currencyDisplay = document.getElementById('currency');
        const upgradesContainer = document.getElementById('upgradeContainer');
        const clicksPerSecondDisplay = document.getElementById('clicksPerSecond');

        // Functie om te klikken
        clickButton.addEventListener('click', () => {
            clickCount += upgradeMultiplier;
            currency += upgradeMultiplier;
            updateDisplays();
            saveProgress();
        });

        // Functie om de weergave bij te werken
        function updateDisplays() {
            clickCountDisplay.textContent = clickCount;
            currencyDisplay.textContent = currency;
            clicksPerSecondDisplay.textContent = clicksPerSecond;
        }

        // Functie om de voortgang op te slaan in localStorage
        function saveProgress() {
            localStorage.setItem("clickCount", clickCount);
            localStorage.setItem("currency", currency);
            localStorage.setItem("clicksPerSecond", clicksPerSecond);
            localStorage.setItem("upgradeCost", upgradeCost);
            localStorage.setItem("upgradeMultiplier", upgradeMultiplier);
            localStorage.setItem("autoClickerCost", autoClickerCost);
            localStorage.setItem("autoClickers", autoClickers);
        }

        // Upgrade kopen
        function buyUpgrade() {
            if (currency >= upgradeCost) {
                currency -= upgradeCost;
                upgradeMultiplier += 1;
                upgradeCost = Math.floor(upgradeCost * 1.5); // Kostprijs van upgrade stijgt
                clicksPerSecond += 1;
                updateDisplays();
                renderUpgrades();
                saveProgress();
            } else {
                alert('Je hebt niet genoeg geld!');
            }
        }

        // Auto-clicker kopen
        function buyAutoClicker() {
            if (currency >= autoClickerCost) {
                currency -= autoClickerCost;
                autoClickers += 1;
                autoClickerCost = Math.floor(autoClickerCost * 1.8); // Kostprijs van auto-clicker stijgt
                updateDisplays();
                renderUpgrades();
                saveProgress();
            } else {
                alert('Je hebt niet genoeg geld voor een auto-clicker!');
            }
        }

        // Functie om upgrades weer te geven
        function renderUpgrades() {
            upgradesContainer.innerHTML = `
                <div class="upgrade-item">
                    <p>Upgrade Kost: ${upgradeCost} 💰</p>
                    <button id="buyUpgradeButton">Upgrade: +1 per klik</button>
                </div>
                <div class="upgrade-item">
                    <p>Auto-Clicker Kost: ${autoClickerCost} 💰</p>
                    <button id="buyAutoClickerButton">Auto-Clicker: +1 klik per seconde</button>
                </div>
            `;
            document.getElementById('buyUpgradeButton').addEventListener('click', buyUpgrade);
            document.getElementById('buyAutoClickerButton').addEventListener('click', buyAutoClicker);
        }

        // Interval om automatisch klikken toe te voegen door auto-clickers
        setInterval(() => {
            clickCount += clicksPerSecond + autoClickers;
            currency += clicksPerSecond + autoClickers;
            updateDisplays();
            saveProgress();
        }, 1000);

        // Start de game
        renderUpgrades();
        updateDisplays();

    </script>
</body>
</html>
```
Veel speel en testplezier!!
