const CROSS_CLASS = 'cross'
const CIRCLE_CLASS = 'circle'
let crossTurn

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const board = document.getElementById('board')
const winningMsgDiv = document.getElementById('winning-message')
const winningMsgText = document.querySelector('[data-winning-message-text]')
const restartBtn = document.getElementById('restart-btn')
// -this returns a NodeList containing all the data-cell's
const cellElements = document.querySelectorAll('[data-cell]')

restartBtn.addEventListener('click', startGame)

function startGame() {
    crossTurn = true
    cellElements.forEach(cell => {
        cell.classList.remove(CIRCLE_CLASS)
        cell.classList.remove(CROSS_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    winningMsgDiv.classList.remove('show')
    placeHoverMark()
}
startGame()

function handleClick(e) {
    currentClass = crossTurn ? CROSS_CLASS : CIRCLE_CLASS
    placeMark(e.target, currentClass)

    if (checkWinner(currentClass)) {
        endGame(true)
    } else if (checkDraw()) {
        endGame(false)
    } else {
        swapTurn()
        placeHoverMark()
    }
}

function placeHoverMark() {
    board.classList.remove(CROSS_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (crossTurn) {
        placeMark(board, CROSS_CLASS)
    } else {
        placeMark(board, CIRCLE_CLASS)
    }
}

function endGame(isGameFinish) {
    if (isGameFinish) {
        currentMark = crossTurn ? 'X' : 'O'
        winningMsgText.innerHTML = `${currentMark} wins`
    } else {
        winningMsgText.innerHTML = 'Match Draw'
    }
    winningMsgDiv.classList.add('show')
}

function swapTurn() {
    crossTurn = !crossTurn
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function checkDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(CROSS_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function checkWinner(classTurn) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(classTurn)
        })
    })
}