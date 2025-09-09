//  ---------- Code for opening and closing of Score and Results menu ---------- //
const mainContent = document.getElementById("main-content");
const scoreboardModal = document.getElementById("scoreboard-modal");
const viewScoreBtn = document.getElementById("view-score-btn");
const closeScoreboardBtn = document.getElementById("close-scoreboard-btn");
const rulesModal = document.getElementById("rules-modal");
const viewRulesBtn = document.getElementById("view-rules-btn");
const closeRulesBtn = document.getElementById("close-rules-btn");

const openModal = (modal) => {
  modal.classList.remove("hidden");
  mainContent.classList.add("content-blur");
};
const closeModal = (modal) => {
  modal.classList.add("hidden");
  if (
    scoreboardModal.classList.contains("hidden") &&
    rulesModal.classList.contains("hidden")
  ) {
    mainContent.classList.remove("content-blur");
  }
};

viewScoreBtn.addEventListener("click", () => openModal(scoreboardModal));
closeScoreboardBtn.addEventListener("click", () => closeModal(scoreboardModal));
viewRulesBtn.addEventListener("click", () => openModal(rulesModal));
closeRulesBtn.addEventListener("click", () => closeModal(rulesModal));

[scoreboardModal, rulesModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    [rulesModal, scoreboardModal].every((modal) => {
      if (!modal.classList.contains("hidden")) {
        closeModal(modal);
        return false;
      }
      return true;
    });
  }
});

document.getElementById("guide-toggle").onclick = function () {
  document.getElementById("Guide").style.display = "block";
  document.getElementById("Rules").style.display = "none";
  this.classList.add("active");
  document.getElementById("rules-toggle").classList.remove("active");
};
document.getElementById("rules-toggle").onclick = function () {
  document.getElementById("Guide").style.display = "none";
  document.getElementById("Rules").style.display = "block";
  this.classList.add("active");
  document.getElementById("guide-toggle").classList.remove("active");
};

//  ------------- GAME LOGIC --------------

// Central object to hold the game's state
// Can add bots with various logics : Follower , Gambler , cautious , predictor 

let GameStatus = {
  players: [
    { name: "You", score: 0, CurrInput: 0, Alive: true },
    { name: "Player 1", score: 0, CurrInput: 0, Alive: true },
    { name: "Player 2", score: 0, CurrInput: 0, Alive: true },
    { name: "Chishiya", score: 0, CurrInput: 0, Alive: true },
    { name: "Kuzuryu", score: 0, CurrInput: 0, Alive: true },
  ],
  result: 0,
  ActiveRules: [
    "If distance to result of 2 players are same then the player who selects the lower input wins the round.",
  ],
  RulesPool: [
    "If 2 players select the same number, it becomes invalid, they both lose 1 point each.",
    "If a player selects exact number of the result, then everyone else lose 2 points each.",
    "If 1 player selects 0 then the other player can win the round by selecting 100.",
  ],
  Roundno: 1,
  GameOver: false,
};

/**
 * @param {Array} players - The array of player objects.
 * @param {number} roundNumber - The current round number.
 */
function updateScoreboardUI(players, roundNumber) {
    const scoreboardBody = document.getElementById("addplayers");
    const scoreboardTitle = scoreboardModal.querySelector('h2');

    scoreboardTitle.textContent = `Round ${roundNumber} Results`;
    scoreboardBody.innerHTML = `
        <div class="grid grid-cols-3 gap-4 text-sm font-bold text-gray-400 uppercase px-4">
            <span>Player</span>
            <span class="text-center">Round Change</span>
            <span class="text-right">Total Score</span>
        </div>
    `;

    players.forEach(player => {
        let changeText = "0 Points";
        let changeColor = "text-gray-400"; 

        if (player.roundChange > 0) {
            changeText = `+${player.roundChange} Point`;
            changeColor = "text-green-500";
        } else if (player.roundChange < 0) {
            changeText = `${player.roundChange} Point`;
            changeColor = "text-red-500";
        }

        // Add a class if the player is eliminated
        const eliminatedClass = !player.Alive ? "opacity-50" : "";

        const playerRow = `
            <div class="bg-black/30 p-4 rounded-lg grid grid-cols-3 gap-4 items-center ${eliminatedClass}">
                <span class="font-bold ${player.name === "You" ? "text-green-400" : ""}">${player.name}</span>
                <span class="text-center font-semibold ${changeColor}">${changeText}</span>
                <span class="text-right font-orbitron text-xl ${player.name === "You" ? "text-green-400" : ""}">${player.score}</span>
            </div>
        `;
        scoreboardBody.insertAdjacentHTML("beforeend", playerRow);
    });
}


function ProceedGame() {
    const submitButton = document.querySelector(".submit-number-btn");
    const playerInputEl = document.getElementById("player-input");
    
    submitButton.addEventListener("click", function () {
        if(GameStatus.GameOver) return; // Stop the game if it's over

        // Validate and collect inputs
        const userInput = playerInputEl.value;
        if (userInput === "" || parseInt(userInput) < 0 || parseInt(userInput) > 100) {
            playerInputEl.classList.add('border-red-500', 'placeholder-red-400');
            playerInputEl.value = "";
            playerInputEl.placeholder = "Invalid!";
            setTimeout(() => {
                playerInputEl.classList.remove('border-red-500', 'placeholder-red-400');
                playerInputEl.placeholder = "1 - 100";
            }, 2000);
            return;
        }
        
        const activePlayers = GameStatus.players.filter(p => p.Alive);

        activePlayers.forEach(player => {
            if (player.name === "You") {
                player.CurrInput = parseInt(userInput, 10);
            } else {
                player.CurrInput = Math.floor(Math.random() * 101);
            }
        });

        // Calculate the winning number (only for active players)
        const sum = activePlayers.reduce((acc, player) => acc + player.CurrInput, 0);
        const avg = sum / activePlayers.length;
        const result = avg * 0.8;
        
        document.getElementById("round-result").innerText = "Result: " + result.toFixed(0);

        // Decide winner (from active players)
        let minDistance = Infinity;
        activePlayers.forEach(player => {
            player.distance = Math.abs(player.CurrInput - result);
            if (player.distance < minDistance) {
                minDistance = player.distance;
            }
        });

        const potentialWinners = activePlayers.filter(p => p.distance === minDistance);
        let finalWinners = [];

        if (potentialWinners.length > 1) {
            let lowestInput = 101;
            potentialWinners.forEach(p => {
                if (p.CurrInput < lowestInput) { lowestInput = p.CurrInput; }
            });
            finalWinners = potentialWinners.filter(p => p.CurrInput === lowestInput);
        } else {
            finalWinners = potentialWinners;
        }
        
        const winnerNames = finalWinners.map(w => w.name);

        // update scoreboard round change
        GameStatus.players.forEach(player => {
            if (!player.Alive) {
                player.roundChange = 0; 
                return;
            }
            if (winnerNames.includes(player.name)) {
                player.roundChange = 0; 
            } else {
                player.roundChange = -1; 
                player.score -= 1;
            }
        });

        // Eliminations
        let eliminationOccurred = false;
        GameStatus.players.forEach(player => {
            if (player.Alive && player.score <= -10) {
                player.Alive = false;
                eliminationOccurred = true;
            }
        });

        //Function to update scoreboard 
        updateScoreboardUI(GameStatus.players, GameStatus.Roundno);
        openModal(scoreboardModal);
        
        // Check if only 1 player is left 
        const remainingPlayers = GameStatus.players.filter(p => p.Alive);
        if (remainingPlayers.length <= 1) {
            GameStatus.GameOver = true;
            const winnerName = remainingPlayers.length === 1 ? remainingPlayers[0].name : "Nobody";
            document.getElementById("round-result").innerText = `Game Over! Winner: ${winnerName}`;
            closeScoreboardBtn.innerText = "Game Over";
            closeScoreboardBtn.disabled = true;
        } else {
             // Prepare for the next round
            GameStatus.Roundno++;
            document.getElementById("current-round").textContent = GameStatus.Roundno;
            playerInputEl.value = "";
        }
    });
}
    
// Start the game logic
ProceedGame();

