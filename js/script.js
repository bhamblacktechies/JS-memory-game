// Card data
const cardsArray = [{
        name: 'bags',
        img: 'images/bags.jpg',
    },
    {
        name: 'bonnet',
        img: 'images/bonnet.png',
    },
    {
        name: 'comet',
        img: 'images/comet.png',
    },
    {
        name: 'conspiracy',
        img: 'images/conspiracy.png',
    },
    {
        name: 'cookies',
        img: 'images/cookies.jpg',
    },
    {
        name: 'durag',
        img: 'images/durag.png',
    },
    {
        name: 'gingerale',
        img: 'images/gingerale.png',
    },
    {
        name: 'pinesol',
        img: 'images/pinesol.jpeg',
    },
    {
        name: 'plate',
        img: 'images/plate.jpg',
    },
    {
        name: 'shirt',
        img: 'images/shirt.jpg',
    },
    {
        name: 'vaseline',
        img: 'images/vaseline.jpg',
    },
    {
        name: 'vicks',
        img: 'images/vicks.png',
    },
]

// Grab the div with an id of root
const game = document.getElementById('game')

// Create a section with a class of grid
const grid = document.createElement('section')
grid.setAttribute('class', 'grid')

// Duplicate array to create a match for each card
let gameGrid = cardsArray.concat(cardsArray)

let firstGuess = ''
let secondGuess = ''
let count = 0
let previousTarget = null
let delay = 1200

// Append the grid section to the game div
game.appendChild(grid)

// Randomize game grid on each load
gameGrid.sort(() => 0.5 - Math.random())

// For each item in the cardsArray array...
gameGrid.forEach(item => {
    // Create card element with the name dataset
    const card = document.createElement('div')
    card.classList.add('card')
    card.dataset.name = item.name

    // Create front of card
    const front = document.createElement('div')
    front.classList.add('front')

    // Create back of card, which contains
    const back = document.createElement('div')
    back.classList.add('back')
    back.style.backgroundImage = `url(${item.img})`

    // Append card to grid, and front and back to each card
    grid.appendChild(card)
    card.appendChild(front)
    card.appendChild(back)
})

// Add event listener to grid
grid.addEventListener('click', function(event) {
    // The event target is our clicked item
    let clicked = event.target

    // Do not allow the grid section itself to be selected; only select divs inside the grid
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget ||
        clicked.parentNode.classList.contains('selected')) {
        return
    }

    // Add selected class
    // ...
    if (count < 2) {
        count++
        // Add selected class
        if (count === 1) {
            // Assign first guess
            firstGuess = clicked.parentNode.dataset.name
            console.log(firstGuess)
            clicked.parentNode.classList.add('selected')
        } else {
            // Assign second guess
            secondGuess = clicked.parentNode.dataset.name
            console.log(secondGuess)
            clicked.parentNode.classList.add('selected')
        }
        // If both guesses are not empty...
        if (firstGuess !== '' && secondGuess !== '') {
            // and the first guess matches the second match...
            if (firstGuess === secondGuess) {
                setTimeout(match, delay)
                setTimeout(resetGuesses, delay)
            } else {
                setTimeout(resetGuesses, delay)
            }
        }

        // Set previous target to clicked
        previousTarget = clicked;
    }
})

// Add match CSS
const match = () => {
    var selected = document.querySelectorAll('.selected')
    selected.forEach(card => {
        card.classList.add('match')
    })
}

const resetGuesses = () => {
    firstGuess = ''
    secondGuess = ''
    count = 0

    var selected = document.querySelectorAll('.selected')
    selected.forEach(card => {
        card.classList.remove('selected')
    })
}