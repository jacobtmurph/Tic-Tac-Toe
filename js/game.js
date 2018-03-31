//Create self-executing function expression to dynamically load pages and functionality for the Tic-Tac-Toe game.
const game = !function(){
    //Set the player variable
    let player = "";

    //Load the start page (using start.txt as reference).
    document.querySelector("body").innerHTML = `
    <div class="screen screen-start" id="start">
    <header>
        <h1>Tic Tac Toe</h1>
        <a href="#" class="button">Start game</a>
    </header>
    </div>
    <script src="js/functions.js"></script>
    <script src="js/game.js"></script>`;

    //Put the New Game Listener on the start button.
    gameFuncs.newGameListener();
}();