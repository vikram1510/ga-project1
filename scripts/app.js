/* eslint-disable brace-style */

class Ghost {
  constructor(name, initialPos){
    this.name = name
    this.pos = initialPos
    this.initialPos = initialPos
    this.lastPos = null
    this.moving = true
    this.moveId = null
    this.class = name
    this.speed = ghostSpeed
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

    if (!isNextPosWall(nextPos) && nextPos !== this.lastPos) {
      const directionObject = { pos: nextPos, direction: move }
      posArray.push(directionObject)
    }
    // console.log(move, nextPos, posArray)
    return posArray

  }

}
const width = 20
const cells = []
let lives
const ghostMoves = ['left','up','right','down']
const wallArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 39, 40, 42, 43, 44, 45, 46, 47, 49, 50, 52, 53, 54, 55, 56, 57, 59, 60, 62, 63, 64, 65, 66, 67, 69, 70, 72, 73, 74, 75, 76, 77, 79, 80, 82, 83, 84, 85, 86, 87, 89, 90, 92, 93, 94, 95, 96, 97, 99, 100, 119, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 139, 140, 147, 152, 159, 160, 161, 162, 163, 164, 165, 167, 169, 170, 172, 174, 175, 176, 177, 178, 179, 189, 190, 200, 201, 202, 203, 204, 205, 207, 212, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 227, 228, 229, 230, 231, 232, 234, 235, 236, 237, 238, 239, 240, 249, 250, 259, 260, 262, 263, 264, 265, 267, 272, 274, 275, 276, 277, 279, 280, 282, 283, 284, 285, 287, 288, 289, 290, 291, 292, 294, 295, 296, 297, 299, 300, 302, 303, 304, 305, 307, 308, 309, 310, 311, 312, 314, 315, 316, 317, 319, 320, 327, 328, 329, 330, 331, 332, 339, 340, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 359, 360, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399]
const pillsArray = [41, 58, 321, 338]
const totalDots = (width ** 2) - wallArray.length - pillsArray.length
let remainingDots = totalDots
const initialPacmanPos = 109
let pacmanPos = initialPacmanPos, pacmanMoveId = null, lastKeyPressed = null
let pacmanLives = 1
const pacmanSpeed = 10
let bufferMove = null
let powerPillId = null
const respawnPos = 149
const ghostSpeed = 10
const showNumbers = false
let score = 0, scoreSpan


const ghostRed = new Ghost('red-guy', 168)
const ghostPink = new Ghost('pinky', 150)
const ghostYellow = new Ghost('yellow', 191)

let ghosts = [ghostRed, ghostPink, ghostYellow]

let stage = 'gamePlay'

window.addEventListener('load', () => {

  setupPacman()

  initialPlacement()

  startPacman()

})


function setupPacman() {
  // Setup PacMan
  const gameGrid = document.querySelector('.game')

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    const pacmanDiv = document.createElement('div')
    pacmanDiv.classList.add('pacman-div')
    if (showNumbers) pacmanDiv.textContent = i

    if (wallArray.includes(i)) cell.classList.add('wall')
    else if (pillsArray.includes(i)) cell.classList.add('pill')
    else cell.classList.add('dot')


    cell.appendChild(pacmanDiv)
    cells.push(cell)
    gameGrid.appendChild(cell)
  }

  
  lives = document.querySelector('ul.lives')
  for (let i = 0; i < pacmanLives; i++){
    const lifeLi = document.createElement('li')
    lifeLi.classList.add('pacman-life')
    lives.appendChild(lifeLi)
  }

  scoreSpan = document.getElementById('score')

}

function startPacman() {

  document.addEventListener('keyup', (e) => {

    // debug purposes
    if (e.key === 'q') collision()

    if (stage === 'gamePlay' || stage === 'powerPill'){

      moveGhosts()

      if (lastKeyPressed !== e.keyCode) {
  
        lastKeyPressed = e.keyCode
  
        if (e.keyCode === 39 || e.keyCode === 68) pacmanMove(nextPosRight, 'rotate(0deg)')
  
        else if (e.keyCode === 37 || e.keyCode === 65) pacmanMove(nextPosLeft, 'rotate(180deg)')
  
        else if (e.keyCode === 38 || e.keyCode === 87) pacmanMove(nextPosUp, 'rotate(270deg)')
  
        else if (e.keyCode === 40 || e.keyCode === 83) pacmanMove(nextPosDown, 'rotate(90deg)')
  
      }

    }

  })

}


function moveGhosts(){

  ghosts.forEach(ghost => {
    if (ghost.moving) {
      ghost.translateVal = 0
      let possibleGhostMoves, moveIndex, move, translate, moveComplete = true, translateVal = 0
      ghost.moveId = setInterval(() => {

        if (moveComplete){
          possibleGhostMoves = ghostMoves
            .reduce(ghost.filterGhostMoves.bind(ghost), [])
          
          possibleGhostMoves = pickBestMove(possibleGhostMoves, ghost.pos)
        
          ghost.lastPos = ghost.pos
          
          moveIndex = Math.floor(Math.random() * possibleGhostMoves.length)
          
          move = possibleGhostMoves[moveIndex]

          translate = getTranslation(move.direction)

          moveComplete = false
        }

        // const translate = getTranslation('left')

        if (translateVal < 75){
          if (pacmanPos === ghost.pos) collision(ghost)
          translateVal += 5
          const transformString = 'rotate(0deg)' + `${translate.string}(${translate.sign}${translateVal}%)`
          // console.log(transformString)
          cells[ghost.pos].firstChild.style.transform = transformString
        } else {
          cells[ghost.pos].firstChild.classList.remove(ghost.class)
          ghost.pos = move.pos

          cells[ghost.pos].firstChild.classList.add(ghost.class)
          cells[ghost.pos].firstChild.style.transform = 'rotate(0deg)' + `${translate.string}(0%)`


  
          if (pacmanPos === ghost.pos) collision(ghost)
          translateVal = 0
          moveComplete = true

        }


      }, ghost.speed)
      ghost.moving = false
    }
  })

}


function pacmanMove(nextPosFunc, rotation) {

  const nextPosIsWall = isNextPosWall(nextPosFunc(pacmanPos))
  // console.log(nextPosIsWall)
  if (!nextPosIsWall) clearInterval(pacmanMoveId)
  else {
    bufferMove = { nextPosFunc: nextPosFunc, rotation: rotation }
    // lastKeyPressed = null
    return
  }

  if (bufferMove){
    if (!nextPosIsWall) bufferMove = null
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

        ghosts.forEach(ghost => {
          if (ghost.pos === pacmanPos)  collision(ghost)
          else if (ghost.pos === nextPosFunc(pacmanPos))  collision(ghost)
        })

        cells[pacmanPos].firstChild.style.transform = rotation + `translateX(${transform}%)`
      } else {
        cells[pacmanPos].firstChild.classList.remove('pacman')
        pacmanPos = nextPosFunc(pacmanPos)

        if (cells[pacmanPos].classList.contains('dot')) {
          cells[pacmanPos].classList.remove('dot')
          remainingDots--
          updateScore(10)
          // console.log(remainingDots)
          if (remainingDots === 0) winGame()
        } else if (cells[pacmanPos].classList.contains('pill')) {
          console.log('hello hello')
          cells[pacmanPos].classList.remove('pill')
          powerPillMode()
        }
        cells[pacmanPos].firstChild.classList.add('pacman')
        cells[pacmanPos].firstChild.style.transform = rotation + 'translateX(0)'
        transform = 0
      }
    }
    

  }, pacmanSpeed)

}


function stopCharacters() {
  ghosts.forEach(ghost => clearInterval(ghost.moveId))
  clearInterval(pacmanMoveId)
}

function powerPillMode(){
  stage = 'powerPill'
  ghosts.forEach(ghost => {
    cells[ghost.pos].firstChild.classList.remove(ghost.name)
    cells[ghost.pos].firstChild.classList.add('weak-ghost')
    ghost.class = 'weak-ghost'
    ghost.lastPos = null
    clearInterval(ghost.moveId)
    ghost.speed = 50
    ghost.moving = true
    moveGhosts()
    
  })

  if (powerPillId) clearTimeout(powerPillId)

  powerPillId = setTimeout(() => {
    ghosts.forEach((ghost) => {
      cells[ghost.pos].firstChild.classList.remove(ghost.class)
      clearInterval(ghost.moveId)
      ghost.speed = ghostSpeed
      ghost.moving = true
      ghost.class = ghost.name
      ghost.lastPos = null
      // ghost.pos = respawnPos
      moveGhosts()
      cells[ghost.pos].firstChild.classList.add(ghost.class)
    })
    stage = 'gamePlay'
  },6000)
}

function powerPillCollision(deadGhost){
  updateScore(100)
  // console.log('hello', deadGhost)
  clearInterval(deadGhost.moveId)
  cells[deadGhost.pos].firstChild.classList.remove(deadGhost.class)
  // cells[deadGhost.pos].nodeValue = 'pew'
  cells[deadGhost.pos].classList.add('ghost-kill')
  setTimeout(() => cells[deadGhost.pos].classList.remove('ghost-kill'), 500)
  // stopCharacters()
  ghosts = ghosts.filter(ghost => ghost !== deadGhost)

  setTimeout(() => {
    deadGhost.moving = true
    deadGhost.class = deadGhost.name
    deadGhost.speed = ghostSpeed
    deadGhost.pos = respawnPos
    ghosts.push(deadGhost)
    // console.log(ghosts)

  }, 3000)

}

function collision(ghost) {

  if (stage === 'collision' || stage === 'gameOver') return

  if (stage === 'powerPill') {
    if (ghost.class === 'weak-ghost'){
      powerPillCollision(ghost)
    }
    return
  }

  stage = 'collision'
  pacmanLives--

  console.log(pacmanLives)

  lives.children[pacmanLives].classList.remove('pacman-life')
  // lives.chil.classList.remove('pacman-life')
  // clearInterval(collisionChecker)
  
  cells[pacmanPos].firstChild.classList.remove('pacman')
  cells[pacmanPos].firstChild.classList.add('death')

  if (pacmanLives === 0)  {
    gameOver(ghost)
    return
  }

  stopCharacters()



  setTimeout(() => {
    console.log('hi')

    cells[pacmanPos].firstChild.classList.remove('death')
    ghosts.forEach(ghost => {
      cells[ghost.pos].firstChild.classList.remove(ghost.class)
      ghost.moving = true
      ghost.pos = ghost.initialPos
    })
    pacmanPos = initialPacmanPos
    lastKeyPressed = null
    
    if (pacmanLives === 0) {
      gameOver()
    } else {
      initialPlacement()
      stage = 'gamePlay'
    }

  }, 900)
}

function gameOver(killerGhost){
  stage = 'gameOver'
  clearInterval(pacmanMoveId)
  clearInterval(killerGhost.moveId)
  
  setTimeout(() => {
    killerGhost.moving = true
    moveGhosts()
    
    cells[pacmanPos].firstChild.classList.remove('death')
    const gameOverElements = document.querySelectorAll('.game-over')
    gameOverElements.forEach(element => element.style.display = 'block')

    setTimeout(() => {
      gameOverElements[0].style.transform = 'translateY(300px)'
      gameOverElements[1].style.opacity = '0.5'
    },100)

  }, 900)

}

function winGame(){
  stage = 'winGame'
  stopCharacters()
  console.log('you win')
}

function updateScore(points){
  score += points
  scoreSpan.textContent = score
}

function initialPlacement(){
  cells[initialPacmanPos].firstChild.classList.add('pacman')
  ghosts.forEach(ghost => {
    cells[ghost.initialPos].firstChild.classList.add(ghost.class)
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
  if (xCoord === 0) return nextPos + width
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


function getTranslation(direction){

  switch (direction) {
    case 'left':
      return { string: 'translateX', sign: '-' }
 
    case 'right':
      return { string: 'translateX', sign: '+' }

    case 'up':
      return { string: 'translateY', sign: '-' }

    case 'down':
      return { string: 'translateY', sign: '+' }
  }

}

function pickBestMove(possibleMoves, currentPos){

  if (stage === 'gameOver') return possibleMoves

  const xPacman = pacmanPos % width
  const yPacman = Math.floor(pacmanPos / width)

  const xBeforeMove = currentPos % width
  const yBeforeMove = Math.floor(currentPos / width)

  const xDistanceBefore = Math.abs(xPacman - xBeforeMove)
  const yDistanceBefore = Math.abs(yPacman - yBeforeMove)

  const bestMoves = possibleMoves.filter(move => {

    const xAfterMove = move.pos % width
    const yAfterMove = Math.floor(move.pos / width)

    const xDistanceAfter = Math.abs(xPacman - xAfterMove)
    const yDistanceAfter = Math.abs(yPacman - yAfterMove)

    if (move.direction === 'left' || move.direction === 'right') {

      if (stage !== 'powerPill'){
        if (xDistanceAfter < xDistanceBefore) return move
      } 
      else {
        if (xDistanceAfter > xDistanceBefore) return move
      }
      
    } else if (move.direction === 'up' || move.direction === 'down') {

      if (stage !== 'powerPill'){
        if (yDistanceAfter < yDistanceBefore) return move
      } 
      else {
        if (yDistanceAfter > yDistanceBefore) return move
      }
    }

  })

  // console.log(currentPos)
  // console.log(bestMoves)
  // console.log(possibleMoves)

  if (bestMoves.length > 0){
    if (bestMoves.length < possibleMoves.length) return bestMoves
  }

  return possibleMoves

}

