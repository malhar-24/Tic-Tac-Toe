let teamAScore = 0;
let teamBScore = 0;

const teamAScoreElement = document.getElementById('teamAScore');
const teamBScoreElement = document.getElementById('teamBScore');

function updateScore(team, points) {
    if (team === 'A') {
        teamAScore += points;
        teamAScoreElement.textContent = teamAScore;
    } else if (team === 'B') {
        teamBScore += points;
        teamBScoreElement.textContent = teamBScore;
    }
}


let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

function placeMarker(cell) {
    const cellIndex = Array.from(cell.parentElement.children).indexOf(cell);
    
    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            if(currentPlayer=='X'){
                updateScore('A', 1);
                showMessage('PLAYER 1 wins!', 'A');
            }
            else{
                updateScore('B', 1);
                showMessage('PLAYER 2 wins!', 'B');
            }
        resetBoard();
        } else if (board.every((cell) => cell !== '')) {
            alert("It's a draw!");
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            return true;
        }
    }

    return false;
}


function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}


function showMessage(message, team) {
    const messageBox = document.getElementById('messageBox');
    const messageText = document.getElementById('messageText');
    messageText.textContent = message;
    messageBox.style.display = 'block';

    if (team === 'A') {
        messageBox.style.backgroundColor = 'lightgreen';
    } else if (team === 'B') {
        messageBox.style.backgroundColor = 'lightblue';
    } else {
        messageBox.style.backgroundColor = 'white';
    }
}

function hideMessageBox() {
    const messageBox = document.getElementById('messageBox');
    messageBox.style.display = 'none';
}

