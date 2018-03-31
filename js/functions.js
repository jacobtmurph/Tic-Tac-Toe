//Creat a functions module for the game named gameFuncs
const gameFuncs = (function(exports) {
    //set the exports object
    exports = {};

    //Function to set the board
    exports.resetBoard = function(board) {
        //Change the Pages HTML to the board, using board.txt as reference.
        board.innerHTML = `
                <div class="board" id="board">
                <header>
                  <h1>Tic Tac Toe</h1>
                  <ul>
                    <li class="players" id="player1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg>
                    </li>
                    <li class="players" id="player2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg>
                    </li>
                  </ul>
                </header>
                <ul class="boxes">
                  <li class="box"></li>
                  <li class="box"></li>
                  <li class="box"></li>
                  <li class="box"></li>
                  <li class="box"></li>
                  <li class="box"></li>
                  <li class="box"></li>
                  <li class="box"></li> 
                  <li class="box"></li>
                </ul>
              </div>
              <script src="js/game.js"></script>
              <script src="js/functions.js"></script>`;

        //Get all the boxes on the board
        boxes = Array.from(document.getElementsByClassName("box"));

        //For each box
        boxes.forEach(box => {
            //Add an event listener for when the pointer enters a box.
            box.addEventListener("pointerenter", (e) => {
                //If it's O's turn
                if (player.toLowerCase() === "o") {
                    //Hovering shows o.svg on unfilled boxes.
                    e.target.style.backgroundImage = "url(img/o.svg)";
                } else {
                    //Else, it will show x.svg on unfilled boxes
                    e.target.style.backgroundImage = "url(img/x.svg)";
                };
            });

            //Add an event listener for when a pointer leaves a box. 
            box.addEventListener("pointerleave", (e) => {
                    //remove the hover image
                    e.target.style.backgroundImage = "";
            });
        });
    };

    //Function to get and divide the board.
    exports.divideBoard = function() {
        const board = Array.from(document.querySelector(".boxes").children);
        
        //Set the rows into Arrays
        const row1 = board.slice(0, 3);
        const row2 = board.slice(3, 6);
        const row3 = board.slice(6);

        //Set the lines into Arrays
        const line1 = [board[0], board[3], board[6]];
        const line2 = [board[1], board[4], board[7]];
        const line3 = [board[2], board[5], board[8]];

        //Set the diagonals into Arrays
        const diagonalLeft = [board[0], board[4], board[8]];
        const diagonalRight = [board[2], board[4], board[6]];

        //Return rows
        return {row1, row2, row3, line1, line2, line3, diagonalLeft, diagonalRight};
    };

    //Function that creates a listener to start a new game.
    exports.newGameListener = function() {
        //When start button is hit, load the board (using board.txt as reference).
        document.querySelector(".button").addEventListener("click", () => {
            //reset the board
            gameFuncs.resetBoard(document.querySelector("body"));

            //O gets the first turn.
            gameFuncs.playO();
        });
    };

    //Function to check if every element in a row has a common class
    exports.checkRow = function(row, className) {
        //If each element in a row has a common class.
        if (row[0].classList.contains(className) &&
            row[1].classList.contains(className) &&
            row[2].classList.contains(className)) {
                return true;
            } else {
                return false;
            }; 
    };

    //Function to check if a given player wins
    exports.checkIfWin = function() {
        //Divide the board
        board = exports.divideBoard();

        //If the player is O
        if (player.toLowerCase() === "o") {

            //Check if any of the rows have the "box-filled-1" class on each element using checkRow
            if (exports.checkRow(board.row1, "box-filled-1") ||
                exports.checkRow(board.row2, "box-filled-1") ||
                exports.checkRow(board.row3, "box-filled-1") ||
                exports.checkRow(board.line1, "box-filled-1") ||
                exports.checkRow(board.line2, "box-filled-1") ||
                exports.checkRow(board.line3, "box-filled-1") ||
                exports.checkRow(board.diagonalLeft, "box-filled-1") ||
                exports.checkRow(board.diagonalRight, "box-filled-1"))
            {
                return true;
            } else {
                return false;
            };
          //Else, the player is not o,
        } else if (player.toLowerCase() === "x") {
            ////Check if any of the rows have the "box-filled-2" class on each element using checkRow 
            if (exports.checkRow(board.row1, "box-filled-2") ||
                exports.checkRow(board.row2, "box-filled-2") ||
                exports.checkRow(board.row3, "box-filled-2") ||
                exports.checkRow(board.line1, "box-filled-2") ||
                exports.checkRow(board.line2, "box-filled-2") ||
                exports.checkRow(board.line3, "box-filled-2") ||
                exports.checkRow(board.diagonalLeft, "box-filled-2") ||
                exports.checkRow(board.diagonalRight, "box-filled-2"))
            {
                return true;
            } else {
                return false;
            };
        };
    };

    //Function to Check if there is a Tie
    exports.checkIfTie = function() {
        //If there's not a win
        if (!exports.checkIfWin()) {
            //Collect the boxes on the board.
            boxes = Array.from(document.getElementsByClassName("box"));

            //Return true if every box is filled, false if not.
            return boxes.every(box => box.classList.length > 1);
        };
    };

    //Function to run O's turn
    exports.playO = function() {
        //set player variable to "o"
        player = "o";

        //If the last turn was played by X
        if (document.getElementById("player2").classList.contains("active")) {
            //Remove color from X indicator.
            document.getElementById("player2").removeAttribute("class", "active");
            document.getElementById("player2").setAttribute("class", "players");
        };
        //set O indicator to active.
        document.getElementById("player1").setAttribute("class", "players active");

        
        //Add a one-time click event listener to the board
        document.querySelector(".boxes").addEventListener("click", (e) => {
            //If a box is clicked
            if (e.target.className == "box") {
                //Mark it with o.svg
                e.target.setAttribute("class", "box box-filled-1");

                //If O wins
                if(exports.checkIfWin()) {
                    exports.displayOWin();
                } else if (exports.checkIfTie()) {
                    exports.displayTie();
                } else {
                //Else, take next turns
                exports.playX();
                };
            }  else if (e.target.className == "box box-filled-2") {
                alert("You cannot marked an already marked box");

                //Else, reset the turn
                exports.playO();
            };
        }, {once: true});
    };

    //Player to run X's turn
    exports.playX = function() {
        //Set player variable to x
        player = "x";

        //If the last turn was played by O
        if (document.getElementById("player1").classList.contains("active")) {
            //Remove color from O indicator.
            document.getElementById("player1").removeAttribute("class", "active");
            document.getElementById("player1").setAttribute("class", "players");
        }

        //set X indicator to active.
        document.getElementById("player2").setAttribute("class", "players active");
        
        //Add a one-time click event listener to the board
        document.querySelector(".boxes").addEventListener("click", (e) => {
            //If a box is clicked
            if (e.target.className == "box") {

                //Mark it with x.svg
                e.target.setAttribute("class", "box box-filled-2");

                //If X wins.
                if(exports.checkIfWin()) {
                    exports.displayXWin();
                } else if (exports.checkIfTie()) {
                    exports.displayTie();
                } else {
                    //Else, take the next turn
                    exports.playO();
                };
            } else if (e.target.className == "box box-filled-1") {
                alert("You cannot marked an already marked box");

                //Else, reset the turn
                exports.playX();
            };
        }, {once: true});
    };

    //Function to display a new page when O wins.
    exports.displayOWin = function() {
        //Display the O win page.
        document.querySelector("body").innerHTML = `
        <div class="screen screen-win screen-win-one" id="finish">
        <header>
            <h1>Tic Tac Toe</h1>
            <p class="message">O Wins!</p>
            <a href="#" class="button">New game</a>
        </header>
        </div>
        <script src="js/functions.js"></script>
        <script src="js/game.js"></script>`

        //Add listener to the New Game button.
        exports.newGameListener();
    };

    //Function to display a new page when X wins.
    exports.displayXWin = function() {
        //Display the X win page.
        document.querySelector("body").innerHTML = `
        <div class="screen screen-win screen-win-two" id="finish">
        <header>
            <h1>Tic Tac Toe</h1>
            <p class="message">X Wins!</p>
            <a href="#" class="button">New game</a>
        </header>
        </div>
        <script src="js/functions.js"></script>
        <script src="js/game.js"></script>`;

        //Add listener to the New Game button.
        exports.newGameListener();
    };

    //Function to display a new page when there is a tie.
    exports.displayTie = function() {
        //Display the tie page.
        document.querySelector("body").innerHTML = `
        <div class="screen screen-win screen-win-tie" id="finish">
        <header>
            <h1>Tic Tac Toe</h1>
            <p class="message">It's a tie!</p>
            <a href="#" class="button">New game</a>
        </header>
        </div>
        <script src="js/functions.js"></script>
        <script src="js/game.js"></script>`

        //Add listener to the New Game button.
        exports.newGameListener();
    };

    //Return the gameFuncs
    return exports;
}(this || {}));