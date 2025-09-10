# King of Diamonds Game

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/Overview.en.html)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A web-based implementation of the intense psychological "King of Diamonds" game from the series *Alice in Borderland*. This is a single-player game where you test your logic and predictive skills against four AI opponents, including the notorious characters Chishiya and Kuzuryu.

***

## Table of Contents

- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Gameplay Mechanics](#gameplay-mechanics)
  - [Objective](#objective)
  - [Round Flow](#round-flow)
  - [Scoring and Elimination](#scoring-and-elimination)
- [Key Features](#key-features)
- [Technologies & Architecture](#technologies--architecture)
  - [Frontend Technologies](#frontend-technologies)
  - [Project Architecture](#project-architecture)
- [Local Setup](#local-setup)
- [File Structure](#file-structure)
- [Future Improvements](#future-improvements)

## Live Demo

> **Note:** A live demo is not available. To play, please follow the [Local Setup](#local-setup) instructions below.

## Screenshots

**Home Page**
![Home Page]()

**Game Interface**
![Game Interface](https://via.placeholder.com/600x400.png?text=Game+Interface+Screenshot)

## Gameplay Mechanics

### Objective

The goal is to be the last player remaining. You must avoid being eliminated by keeping your score from dropping to -10.

### Round Flow

The game is played in rounds, with each round following a simple but strategic sequence:
1.  **Input Selection**: You and the four AI opponents secretly choose a number between 0 and 100.
2.  **Calculation**: The game calculates the average of all five numbers submitted by the active players.
3.  **Winning Number**: The "Winning Number" for the round is determined by multiplying the average by 0.8.
    - `Winning Number = (Sum of all inputs / Number of active players) * 0.8`
4.  **Winner Determination**: The player whose chosen number is closest to the "Winning Number" wins the round.

### Scoring and Elimination

- **Losers**: Every player who did **not** win the round loses 1 point.
- **Winners**: The winner(s) of the round do not lose any points.
- **Tie-Breaker**: If two or more players are the same distance from the winning number, the player who chose the **lower input number** wins the round.
- **Elimination**: Any player whose score reaches **-10** is eliminated from the game and can no longer participate in subsequent rounds.

## Key Features

- **Thematic UI**: A dark, immersive interface with a "glass effect" inspired by the aesthetic of the series.
- **Five-Player Simulation**: Compete against four AI opponents, including pre-named characters Chishiya and Kuzuryu.
- **Dynamic Scoreboard**: A real-time scoreboard modal displays the total score and the point change for each player after every round.
- **Interactive Rules & Guide**: An in-game modal provides a quick reference for the game's rules and objectives.
- **Input Validation**: The number input field prevents users from entering values outside the 0-100 range, providing visual feedback for invalid entries.
- **Responsive Elements**: The UI uses Tailwind CSS to ensure a functional experience on various screen sizes.

## Technologies & Architecture

### Frontend Technologies

- **HTML5**: Provides the core structure and content for the home and game pages.
- **CSS3**: Handles custom styling, animations, and the overall visual theme, including the use of Flexbox for layout.
- **Vanilla JavaScript**: Contains all the client-side logic for game state management, round calculations, winner determination, and DOM manipulation.
- **Tailwind CSS**: A utility-first CSS framework used for rapidly building the responsive layout of the game interface and modals.
- **Google Fonts**: `Orbitron` and `Roboto` fonts are used to enhance the digital, futuristic feel of the UI.

### Project Architecture

The project is a static web application with a clear separation of concerns:

- **`Home_page.html`**: The landing page that introduces the game and links to the main game screen.
- **`Game_page.html`**: The primary view where the game is played. It contains the structure for the player avatars, input section, and the hidden modals for scores and rules.
- **`design.css` & `gameDesign.css`**: These stylesheets define the visual identity. `design.css` styles the home page and core elements, while `gameDesign.css` adds specific styles for the game board and its components.
- **`function.js`**: The brain of the application. It manages the game's state through a central `GameStatus` object, which tracks player scores, inputs, and round numbers. It contains the main `ProceedGame()` function that orchestrates the entire round lifecycle from input collection to UI updates.

## Local Setup

To run this project on your local machine, follow these simple steps:

1.  Clone the repository to your local machine:
    ```bash
    git clone [https://github.com/ChandanCodes18/Alice_in_Borderland_Game.git](https://github.com/ChandanCodes18/Alice_in_Borderland_Game.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd Alice_in_Borderland_Game
    ```
3.  Ensure you have a folder named `images` containing the necessary assets (`diamond.png`, `favicon.png`, `bg.png`, `profile.png`, etc.) as referenced in the HTML and CSS files.
4.  Open the `Home_page.html` file in your preferred web browser. The game will start from there.

## File Structure
├── Home_page.html
├── Game_page.html
├── design.css
├── gameDesign.css
├── function.js
└── images/
├── bg.png
├── diamond card.png
├── diamond.png
├── favicon.png
└── profile.png
## Future Improvements

Based on the existing codebase and comments, here are some potential areas for future development:

- **Smarter AI Opponents**: The developer noted the possibility of adding more complex AI logic. Instead of choosing numbers randomly, different AI profiles could be created:
  - **Gambler**: Prefers higher-risk, extreme numbers.
  - **Follower**: Tends to choose numbers close to the previous round's average.
  - **Cautious**: Prefers lower, safer numbers.
- **Additional Game Rules**: Implement the optional rules from the `RulesPool` array in `function.js` to add more complexity and variation to rounds.
- **Multiplayer Mode**: Refactor the game logic to support real-time gameplay with other human players over a network.
