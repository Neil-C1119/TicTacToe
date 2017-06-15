!function() {
    const board = document.getElementsByClassName("board")[0];
    const $startScreen = $(".screen-start");
    const $tieGame = $(".screen-win-tie");
    const $xWins = $(".screen-win-two");
    const $oWins = $(".screen-win-one");
    const startGameButton = document.getElementsByClassName("button");
    const player1 = document.getElementById("player1");
    const player2 = document.getElementById("player2");
    const oNameHTML = document.getElementsByClassName("oName")[0];
    const xNameHTML = document.getElementsByClassName("xName")[0];
    const winnerMessage = document.getElementsByClassName("message");
    const boardBoxes = document.getElementsByClassName("box");
    const aiButton = $('.aiButton');
    let takenBoxes = [];
    let aiGame = false;

    //Hide all of the different boards 
    $(board).hide();
    $tieGame.hide();
    $xWins.hide();
    $oWins.hide();
    aiButton.hide();


    function playerNames() {
        if (aiGame === true) {
            let oName = prompt("Keeper of the O's, enter thine name (AI):", "AI");
            if (oName) {
                oNameHTML.innerHTML = oName;
                winnerMessage[1].innerHTML = oName + " wins! Play again?";
            }
            else {
                oNameHTML.innerHTML = "O";
                winnerMessage[1].innerHTML =  "O wins! Play again?";
            }
            let xName = prompt("Ruler of X's, enter thine name:", "X");
            if (xName) {
                xNameHTML.innerHTML = xName;
                winnerMessage[2].innerHTML = xName + " wins! Play again?";
            }
            else {
                xNameHTML.innerHTML = "X";
                winnerMessage[2].innerHTML =  "X wins! Play again?";
            }
        }
        else {
            let oName = prompt("Keeper of the O's, enter thine name:", "O");
            if (oName) {
                oNameHTML.innerHTML = oName;
                winnerMessage[1].innerHTML = oName + " wins! Play again?";
            }
            else {
                oNameHTML.innerHTML = "O";
                winnerMessage[1].innerHTML =  "O wins! Play again?";
            }
            let xName = prompt("Ruler of X's, enter thine name:", "X");
            if (xName) {
                xNameHTML.innerHTML = xName;
                winnerMessage[2].innerHTML = xName + " wins! Play again?";
            }
            else {
                xNameHTML.innerHTML = "X";
                winnerMessage[2].innerHTML =  "X wins! Play again?";
            }
        }
    }

    function randomBox() {
        const chosenBox = Math.floor(Math.random() * 9);
        return chosenBox;
    }

    function playAi() {
        player1.className = "players active";
        player2.className = "players";
        aiButton.show();
        let chosenBox = randomBox();
        if (boardBoxes[chosenBox].className === "box") {
            boardBoxes[chosenBox].className = "box box-filled-1";
            boardBoxes[chosenBox].style.backgroundImage = "url('img/o.svg')";
            takenBoxes.push(boardBoxes[chosenBox]);
        }
        else if (boardBoxes[chosenBox].className === "box box-filled-1" || boardBoxes[chosenBox].className === "box box-filled-2") {
            let newChosenBox = randomBox();
            if (boardBoxes[newChosenBox].className === "box") {
                boardBoxes[newChosenBox].className = "box box-filled-1";
                boardBoxes[newChosenBox].style.backgroundImage = "url('img/o.svg')";
                takenBoxes.push(boardBoxes[newChosenBox]);
            }
            else {
                playAi();
            }
        }
    }

    function aiButtonListener() {
        startGameButton[1].addEventListener("click", () => {
            aiButton.show();
            aiGame = true;
            console.log(aiGame);
            $startScreen.hide();
            $(board).show();
            playerNames();
            player2.className = "players active";
        });
    }
    aiButtonListener();

    function startGame(num) {
        startGameButton[num].addEventListener("click", () => {
            $startScreen.hide();
            $(board).show();
            playerNames();
            player1.className = "players active";
        });
    }
    startGame(0);

    function newGame(num) {
        startGameButton[num].addEventListener("click", () => {
            $oWins.hide();
            $xWins.hide();
            $tieGame.hide();
            clearBoxes();
            $(board).show();
            if (aiGame === true) {
                player2.className = "players active";
                player1.className = "players";
                aiButton.show();
            }
            else {
                player2.className = "players";
                player1.className = "players active";
            }
        });
    }

    function clearBoxes() {
        boardBoxes[0].className = "box";
        boardBoxes[1].className = "box";
        boardBoxes[2].className = "box";
        boardBoxes[3].className = "box";
        boardBoxes[4].className = "box";
        boardBoxes[5].className = "box";
        boardBoxes[6].className = "box";
        boardBoxes[7].className = "box";
        boardBoxes[8].className = "box";
        boardBoxes[0].style.backgroundImage = "url('')";
        boardBoxes[1].style.backgroundImage = "url('')";
        boardBoxes[2].style.backgroundImage = "url('')";
        boardBoxes[3].style.backgroundImage = "url('')";
        boardBoxes[4].style.backgroundImage = "url('')";
        boardBoxes[5].style.backgroundImage = "url('')";
        boardBoxes[6].style.backgroundImage = "url('')";
        boardBoxes[7].style.backgroundImage = "url('')";
        boardBoxes[8].style.backgroundImage = "url('')";
        takenBoxes = [];
    }

    function boxListener(number) {
        boardBoxes[number].addEventListener("click", () => {
            if (aiGame === true) {
                if (player1.className === "players active") {
                    playAi();
                    player1.className = "players";
                    player2.className = "players active";
                }
                else if (player2.className === "players active") {
                    if (boardBoxes[number].className === "box") {
                        boardBoxes[number].className = "box box-filled-2";
                        takenBoxes.push(boardBoxes[number]);
                        player1.className = "players active";
                        player2.className = "players";
                    }
                    else {
                        player1.className = "players";
                        player2.className = "players active";
                    }
                }
            }
            else {
                if (player1.className === "players active") {
                    if (boardBoxes[number].className === "box") {
                        boardBoxes[number].className = "box box-filled-1";
                        takenBoxes.push(boardBoxes[number]);
                        player1.className = "players";
                        player2.className = "players active";
                    }
                    else {
                        player1.className = "players active";
                        player2.className = "players";
                    }
                }
                else if (player2.className === "players active") {
                    if (boardBoxes[number].className === "box") {
                        boardBoxes[number].className = "box box-filled-2";
                        takenBoxes.push(boardBoxes[number]);
                        player1.className = "players active";
                        player2.className = "players";
                    }
                    else {
                        player1.className = "players";
                        player2.className = "players active";
                    }
                }
            }
            winCheckAll();
        });
    }

    function boxHover(number) {
        boardBoxes[number].addEventListener("mouseover", () => {
            if (player1.className === "players active" && aiGame === false) {
                if (boardBoxes[number].className === "box") {
                    boardBoxes[number].style.backgroundImage = "url('img/o.svg')";
                }
                else if (boardBoxes[number].className === "box box-filled-1") {
                    boardBoxes[number].style.backgroundImage = "url('img/o.svg')";
                }
                else if (boardBoxes[number].className === "box box-filled-2") {
                    boardBoxes[number].style.backgroundImage = "url('img/x.svg')";
                }
                else {
                    boardBoxes[number].style.backgroundImage = "url('')";
                }
            }
            else if (player2.className === "players active") {
                if (boardBoxes[number].className === "box") {
                    boardBoxes[number].style.backgroundImage = "url('img/x.svg')";
                }
                else if (boardBoxes[number].className === "box box-filled-1") {
                    boardBoxes[number].style.backgroundImage = "url('img/o.svg')";
                }
                else if (boardBoxes[number].className === "box box-filled-2") {
                    boardBoxes[number].style.backgroundImage = "url('img/x.svg')";
                }
                else {
                    boardBoxes[number].style.backgroundImage = "url('')";
                }
            }
        });
        boardBoxes[number].addEventListener("mouseout", () => {
            if (player2.className === "players active") {
                if (boardBoxes[number].className === "box box-filled-1") {
                    boardBoxes[number].style.backgroundImage = "url('img/o.svg')";
                }
                else if (boardBoxes[number].className === "box box-filled-2") {
                    boardBoxes[number].style.backgroundImage = "url('img/x.svg')";
                }
                else {
                    boardBoxes[number].style.backgroundImage = "url('')";
                }
            }
            else if (player1.className === "players active" && aiGame === false) {
                if (boardBoxes[number].className === "box box-filled-2") {
                    boardBoxes[number].style.backgroundImage = "url('img/x.svg')";
                }
                else if (boardBoxes[number].className === "box box-filled-1") {
                    boardBoxes[number].style.backgroundImage = "url('img/o.svg')";
                }
                else {
                    boardBoxes[number].style.backgroundImage = "url('')";
                }
            }
        });
    }

    function checkIfWon(x, y, z) {
        if (boardBoxes[x].className === "box box-filled-1" && boardBoxes[y].className === "box box-filled-1" && boardBoxes[z].className === "box box-filled-1") {
            $oWins.show();
            newGame(4);
        }
        else if (boardBoxes[x].className === "box box-filled-2" && boardBoxes[y].className === "box box-filled-2" && boardBoxes[z].className === "box box-filled-2") {
            $xWins.show();
            newGame(5);
        }
        else if (takenBoxes.length === 9) {
            $tieGame.show();
            newGame(3);
        }
    }

    function winCheckAll() {
        checkIfWon(0, 3, 6);
        checkIfWon(1, 4, 7);
        checkIfWon(2, 5, 8);
        checkIfWon(0, 1, 2);
        checkIfWon(3, 4, 5);
        checkIfWon(6, 7, 8);
        checkIfWon(0, 4, 8);
        checkIfWon(2, 4, 6);
    }

    function playGame() {
        boxListener(0);
        boxHover(0);
        boxListener(1);
        boxHover(1);
        boxListener(2);
        boxHover(2);
        boxListener(3);
        boxHover(3);
        boxListener(4);
        boxHover(4);
        boxListener(5);
        boxHover(5);
        boxListener(6);
        boxHover(6);
        boxListener(7);
        boxHover(7);
        boxListener(8);
        boxHover(8);
        boxListener(9);
    }
    playGame();
}();