// *** DOM Elements ***
const displayPuzzle = document.querySelector("#puzzle")
const statusDisplay = document.querySelector("#status-display")
let game1

// displayPuzzle.textContent = game1.puzzle
// statusDisplay.textContent = game1.statusMessage

// statusUpdate could also be called in makeGuess but this is more explicit (imo)
// Convert character codes (so only characters not shift key) to a string (the letter)
window.addEventListener("keypress", (e) => {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    game1.statusUpdate()    
    render()   
})

const spanGenerator = (puzzle) => {    
    const letters = puzzle.split("")
    letters.forEach((letter) => {
       let span = document.createElement("span")
       span.textContent = letter   
       displayPuzzle.appendChild(span)
    })
}

const render = () => {
    displayPuzzle.innerHTML = ""
    statusDisplay.textContent = game1.statusMessage
    spanGenerator(game1.puzzle)
}

const startGame = async () => {
    const puzzle = await getPuzzle("2")
    game1 = new Hangman(puzzle, 5)
    render()
}

document.querySelector("#reset").addEventListener("click", () => {
    startGame()
})

startGame()

// I previously had this (minus the getPuzzle("2") part) under the request.js getPuzzle function
// Now this location will decide what we will do with the returned data
// getPuzzle("2").then((data) => {
//     console.log(data)
// }).catch((error) => {
//     console.log(`Error: ${error}`)
// })

// // Old callback thing
// // getPuzzle((error, puzzle) => {
// //     if (error) {
// //         console.log(`Error: ${error}`)
// //     } else {
// //         console.log(puzzle)
// //     }    
// // })


// Dont need to check readyState because the promise is only going to resolve or reject when it's ready
// Dont need to check if it completed, just how it completed (what status)
// fetch("http://puzzle.mead.io/puzzle", {}).then((response) => {
//     if (response.status === 200) {
//         return response.json()
//     } else {
//         throw new Error("Unable to fetch the puzzle")
//     }
// }).then((data) => {
//     console.log(data.puzzle)
// }).catch((error) => {
//     console.log(error)
// })


// getCurrentCountry().then((country) => {
//     console.log(country.name)
// }).catch((error) => {
//     console.log(error)
// })

