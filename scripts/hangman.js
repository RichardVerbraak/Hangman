class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split("")
        this.remainingGuesses = remainingGuesses
        this.guessed = []
        this.status = "playing"
    }

    get puzzle() {
        let puzzle = ""

        this.word.forEach((letter) => {
            if (this.guessed.includes(letter) || letter === " ") {
                puzzle += letter
            } else {
                puzzle += "*"
            }
        })
    
        return puzzle
    }

    makeGuess(guess) {
        guess = guess.toLowerCase()
        let uniqueGuess = !this.guessed.includes(guess)
        let badGuess = !this.word.includes(guess)

        if (this.status !== "playing") {
            return 
        } else {
            if (typeof guess === "string") {

                if (uniqueGuess) {
                    this.guessed.push(guess)
                }
            
                if (badGuess && uniqueGuess) {
                    this.remainingGuesses--
                }

            } else {
                throw Error("Please provide a letter only")
            }        
        }
    }

    statusUpdate () {
        // Checks every letter in the word with the letters that are guessed via keypress (WHICH ARE ONLY CHARS NOT SHIFT OR SPACE) hence the ||
        const finished = this.word.every((letter) => {
            return this.guessed.includes(letter) || letter === " "
        })
    
        if (this.remainingGuesses === 0) {
            this.status = "failed"
        } else if (finished) {
            this.status = "finished"
        } else {
            this.status = "playing"
        } 
    }

    get statusMessage() {
        if (this.status === "playing") {
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === "failed") {
            return `Nice try! The word was: "${this.word.join("")}"`
        } else if (this.status === "finished") {
            return `Great work! You guessed it!`
        }
    }
        
}