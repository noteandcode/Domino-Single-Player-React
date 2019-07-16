# Domino-Single-Player-React
A single player domino game built as a ReactJS &amp; ES6 Javascript app.
To set up the project:
1. Clone this repository.
2. In the created folder install the node modules using npm install.
3. Run the script npm run build-watch.
4. Open index.html from the public directory.

Project summary:
1. When you launch the project, a Start Game button will appear. Clicking the button will start the game.
2. You start the game with 6 random domino tiles (from 28 possible tiles).
3. In the first turn you need to click on a tile to place on the game board.
4. In each turn later, each tile you click will show you the viable options to place it on the game board with a yellow mark.
5. Clicking that yellow mark will place the clicked tile on the game board.
6. When you have no moves left, you can click the "Draw Tile" button to draw more tiles from the bank, until you have a valid move.
7. You win the game if you successfully get rid of all the tiles in your hand.
8. If there are no more tile left in the bank and you have no valid moves - you lose.
9. After a game has ended, there's an option to start a new game.

Special features:
1. Undo Move: After each move an "Undo Move" button will appear. Clicking that button will undo the last move you played, and you can keep undoing moves until you reach the starting state.
2. Statistics: The game collects statistics about the player and presents them throughout the game.
3. Prev\Next Moves: After the game has ended, you can scroll through your plays via the "Prev" and "Next" buttons. Each button changes the game board, bank and hand according to the scrolled play.
