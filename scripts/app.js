
class Ghost {
  constructor(name, initialPos){
    this.name = name
    this.pos = initialPos
    this.initialpos = initialPos
    this.lastPos = null
    this.moving = true
    this.moveId = null
  }

  filterGhostMoves(posArray, move){

    let nextPos = null
    

    switch (move) {

      case 'left': 
        nextPos = nextPosLeft(this.pos)
        break

      case 'up':
        nextPos = nextPosUp(this.pos)
        break

      case 'right':
        nextPos = nextPosRight(this.pos)
        break

      case 'down':
        nextPos = nextPosDown(this.pos)
        break

      default:
        return null

    }

    if (!isNextPosWall(nextPos) && nextPos !== this.lastPos) posArray.push(nextPos)
    // console.log(move, nextPos, posArray)
    return posArray

  }

}
const width = 20
const cells = []
let lives
const ghostMoves = ['left','up','right','down']
const wallArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 39, 40, 42, 43, 44, 45, 46, 47, 49, 50, 52, 53, 54, 55, 56, 57, 59, 60, 62, 63, 64, 65, 66, 67, 69, 70, 72, 73, 74, 75, 76, 77, 79, 80, 82, 83, 84, 85, 86, 87, 89, 90, 92, 93, 94, 95, 96, 97, 99, 100, 119, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 139, 140, 147, 152, 159, 160, 161, 162, 163, 164, 165, 167, 169, 170, 172, 174, 175, 176, 177, 178, 179, 189, 190, 200, 201, 202, 203, 204, 205, 207, 212, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 227, 228, 229, 230, 231, 232, 234, 235, 236, 237, 238, 239, 240, 249, 250, 259, 260, 262, 263, 264, 265, 267, 272, 274, 275, 276, 277, 279, 280, 282, 283, 284, 285, 287, 288, 289, 290, 291, 292, 294, 295, 296, 297, 299, 300, 302, 303, 304, 305, 307, 308, 309, 310, 311, 312, 314, 315, 316, 317, 319, 320, 327, 328, 329, 330, 331, 332, 339, 340, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 359, 360, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399]
const initialPacmanPos = 193
let pacmanPos = initialPacmanPos, pacmanMoveId = null, lastKeyPressed = null
let pacmanLives = 3
let collisionChecker = null
let bufferMove = null


const ghostRed = new Ghost('red-guy', 28)
const ghostPink = new Ghost('pinky', 378)
const ghostYellow = new Ghost('yellow', 361)

const ghosts = [ghostRed, ghostPink, ghostYellow]

let stage = 'gamePlay'

window.addEventListener('load', () => {

  setupPacman()

  initialPlacement()

  startPacman()

  // checkCollisions()

})


function setupPacman() {
  // Setup PacMan
  const gameGrid = document.querySelector('.game')

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    const pacmanDiv = document.createElement('div')
    pacmanDiv.classList.add('pacman-div')

    if (wallArray.includes(i)) cell.classList.add('wall')
    else cell.classList.add('dot')


    cell.appendChild(pacmanDiv)
    cells.push(cell)
    gameGrid.appendChild(cell)
  }

  lives = document.querySelector('ul.lives')
  for (let i = 0; i < pacmanLives; i++){
    const lifeLi = document.createElement('li')
    lifeLi.textContent = 'life' + (i + 1)
    lives.appendChild(lifeLi)
  }

}

function startPacman() {

  document.addEventListener('keyup', (e) => {

    if (e.key === 'q') collision()

    if (stage === 'gamePlay'){

      moveGhosts()

      if (lastKeyPressed !== e.keyCode) {
  
        lastKeyPressed = e.keyCode
  
        if (e.keyCode === 39) pacmanMove(nextPosRight, 'rotate(0deg)')
  
        else if (e.keyCode === 37) pacmanMove(nextPosLeft, 'rotate(180deg)')
  
        else if (e.keyCode === 38) pacmanMove(nextPosUp, 'rotate(270deg)')
  
        else if (e.keyCode === 40) pacmanMove(nextPosDown, 'rotate(90deg)')
  
      }

    }


  })

}


function moveGhosts(){

  ghosts.forEach(ghost => {
    if (ghost.moving) {
      console.log('moving')
      ghost.moveId = setInterval(() => {

        const possibleGhostMoves = ghostMoves
          .reduce(ghost.filterGhostMoves.bind(ghost), [])
        
        ghost.lastPos = ghost.pos
        
        const moveIndex = Math.floor(Math.random() * possibleGhostMoves.length)

        cells[ghost.pos].firstChild.classList.remove(ghost.name)

        ghost.pos = possibleGhostMoves[moveIndex]

        cells[ghost.pos].firstChild.style.transform = 'rotate(0deg)'

        cells[ghost.pos].firstChild.classList.add(ghost.name)


        if (pacmanPos === ghost.pos) collision()
      }, 250)
      ghost.moving = false
    }
  })

}

function stopCharacters() {
  ghosts.forEach(ghost => clearInterval(ghost.moveId))
  clearInterval(pacmanMoveId)
}

function pacmanMove(nextPosFunc, rotation) {

  const nextPosIsWall = isNextPosWall(nextPosFunc(pacmanPos))
  // console.log(nextPosIsWall)
  if (!nextPosIsWall) clearInterval(pacmanMoveId)
  else {
    bufferMove = { nextPosFunc: nextPosFunc, rotation: rotation }
    lastKeyPressed = null
    return
  }


  let transform = 0
  cells[pacmanPos].firstChild.style.transform = rotation + 'translateX(0)'

  pacmanMoveId = setInterval(() => {
    if (bufferMove){
      // console.log('buffer', bufferMove)
      if (!isNextPosWall(bufferMove.nextPosFunc(pacmanPos))) {
        nextPosFunc = bufferMove.nextPosFunc
        rotation = bufferMove.rotation
        bufferMove = null
      }
    }
    // console.log(nextPosFunc, rotation)

    const nextPosIsWall = cells[nextPosFunc(pacmanPos)].classList.contains('wall')

    if (!nextPosIsWall){
      if (transform < 75) {
        transform += 5
        if (ghosts.some(ghost => ghost.pos === nextPosFunc(pacmanPos) ||
                        ghost.pos === nextPosFunc(pacmanPos))) {
          collision()
        }
        cells[pacmanPos].firstChild.style.transform = rotation + `translateX(${transform}%)`
      } else {
        cells[pacmanPos].firstChild.classList.remove('pacman')
        pacmanPos = nextPosFunc(pacmanPos)
        if (cells[pacmanPos].classList.contains('dot')) cells[pacmanPos].classList.remove('dot')
        cells[pacmanPos].firstChild.classList.add('pacman')
        cells[pacmanPos].firstChild.style.transform = rotation + 'translateX(0)'
        transform = 0
      }
    }

  }, 10)

}

// function checkCollisions() {
//   collisionChecker = setInterval(() => {
//     if (ghosts.some(ghost => ghost.pos === pacmanPos)) collision()
//   },50)
// }

function collision() {
  stage = 'collision'
  pacmanLives--
  lives.removeChild(lives.lastElementChild)
  // clearInterval(collisionChecker)
  stopCharacters()
  cells[pacmanPos].firstChild.classList.remove('pacman')
  cells[pacmanPos].firstChild.classList.add('death')

  setTimeout(() => {
    cells[pacmanPos].firstChild.classList.remove('death')
    ghosts.forEach(ghost => {
      cells[ghost.pos].firstChild.classList.remove(ghost.name)
      ghost.moving = true
      ghost.pos = ghost.initialpos
    })
    pacmanPos = initialPacmanPos
    lastKeyPressed = null
    initialPlacement()
    // checkCollisions()
    if (pacmanLives === 0) {
      stage = 'gameOver'
      console.log('game over')
    } else {
      stage = 'gamePlay'
    }

  }, 900)
}

function initialPlacement(){
  cells[initialPacmanPos].firstChild.classList.add('pacman')
  ghosts.forEach(ghost => {
    cells[ghost.initialpos].firstChild.classList.add(ghost.name)
  })
}

function nextPosRight(characterPos){
  const nextPos = characterPos + 1
  const xCoord = characterPos % width
  if (xCoord === width - 1) return nextPos - width
  else return nextPos
}

function nextPosLeft(characterPos){
  const nextPos = characterPos - 1
  const xCoord = characterPos % width
  if (xCoord === 0) return nextPos + width - 1
  else return nextPos
}

function nextPosUp(characterPos){
  return characterPos - width
}

function nextPosDown(characterPos){
  return characterPos + width
}

function isNextPosWall(nextPos){
  return cells[nextPos].classList.contains('wall')
}
