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

// class Level {
//   constructor(level, dotArray, pillsArray){
//     this.level = level
//     this.dotArray = dotArray
//     this.pillsArray = pillsArray
//   }
// }

const initialPacmanPos = 30
const pacman = { pos: initialPacmanPos, lives: 1, moveId: null, speed: 10 }

const width = 20
const cells = []
let lives
const ghostMoves = ['left','up','right','down']
// const level = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 39, 40, 42, 43, 44, 45, 46, 47, 49, 50, 52, 53, 54, 55, 56, 57, 59, 60, 62, 63, 64, 65, 66, 67, 69, 70, 72, 73, 74, 75, 76, 77, 79, 80, 82, 83, 84, 85, 86, 87, 89, 90, 92, 93, 94, 95, 96, 97, 99, 100, 119, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 139, 140, 147, 152, 159, 160, 161, 162, 163, 164, 165, 167, 169, 170, 172, 174, 175, 176, 177, 178, 179, 189, 190, 200, 201, 202, 203, 204, 205, 207, 212, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 227, 228, 229, 230, 231, 232, 234, 235, 236, 237, 238, 239, 240, 249, 250, 259, 260, 262, 263, 264, 265, 267, 272, 274, 275, 276, 277, 279, 280, 282, 283, 284, 285, 287, 288, 289, 290, 291, 292, 294, 295, 296, 297, 299, 300, 302, 303, 304, 305, 307, 308, 309, 310, 311, 312, 314, 315, 316, 317, 319, 320, 327, 328, 329, 330, 331, 332, 339, 340, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 359, 360, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399]
const level = [21, 41, 61, 81, 101, 121, 141, 161, 181, 201, 221, 241, 261, 281, 301, 321, 341, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 358, 338, 318, 298, 278, 258, 238, 218, 198, 178, 158, 138, 118, 98, 78, 58, 38, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 43, 63, 83, 103, 123, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 159, 142, 140, 56, 76, 96, 116, 136, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 66, 67, 68, 71, 72, 73, 106, 107, 108, 111, 112, 113, 344, 324, 304, 305, 306, 307, 327, 347, 355, 335, 315, 314, 313, 312, 332, 352, 262, 263, 264, 244, 224, 225, 226, 227, 247, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 253, 233, 213, 193, 173, 206, 186, 166, 217, 216, 215, 214, 170, 190, 210, 230, 250]
// const levelArray2 = [21, 41, 61, 81, 101, 121, 141, 142, 143, 144, 145, 146, 166, 186, 180, 181, 182, 183, 184, 185, 187, 188, 168, 148, 149, 150, 151, 171, 191, 211, 210, 209, 208, 192, 193, 194, 195, 196, 197, 198, 199, 173, 153, 154, 155, 156, 157, 158, 138, 118, 98, 78, 58, 38, 117, 116, 115, 114, 113, 112, 111, 110, 109, 108, 107, 106, 105, 104, 103, 102, 88, 68, 48, 28, 27, 26, 25, 24, 23, 22, 91, 71, 51, 31, 32, 33, 34, 35, 36, 37, 206, 226, 246, 266, 286, 306, 326, 325, 324, 323, 322, 321, 341, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 258, 278, 298, 318, 338, 358, 253, 254, 255, 256, 257, 213, 233, 273, 293, 313, 333, 334, 335, 336, 337, 241, 261, 281, 301, 242, 243, 244, 245, 247, 248, 268, 269, 270, 271, 251, 252]


const pillsArray = [41, 58, 321, 338]
const totalDots = level.length - 4
let remainingDots = totalDots

let lastKeyPressed = null, bufferMove = null, powerPillId = null

const respawnPos = 149
let ghostSpeed = 15
const showNumbers = false
let score = 0, scoreSpan
const difficulties = ['easy', 'medium', 'hard']
let difficulty = 'medium'

const ghostRed = new Ghost('red-guy', 67)
const ghostPink = new Ghost('pinky', 72)
const ghostYellow = new Ghost('yellow', 375)
let ghosts = [ghostRed, ghostPink, ghostYellow]

let stage = 'gameStart Menu'

let startMenuOption = 'playGame'

const gameMode = true

window.addEventListener('load', () => {
  
  if (gameMode){

    setupPacman()

    initialPlacement()
  
    startPacman()

  } else {
    
    document.querySelector('.start-menu').style.display = 'none'
   
    setupPacman()
   
    levelEditor()
    
  }


})


function setupPacman() {
  // Setup PacMan
  const gameGrid = document.querySelector('.game')

  for (let i = 0; i < width ** 2; i++) {
    const cell = document.createElement('div')
    const pacmanDiv = document.createElement('div')
    pacmanDiv.classList.add('pacman-div')
    if (showNumbers) pacmanDiv.textContent = i

    if (gameMode){
      if (level.includes(i)) cell.classList.add('dot')
      else if (pillsArray.includes(i)) cell.classList.add('pill')
      else cell.classList.add('wall')
    }
    else cell.classList.add('wall')


    cell.appendChild(pacmanDiv)
    cells.push(cell)
    gameGrid.appendChild(cell)
  }

  
  lives = document.querySelector('ul.lives')
  for (let i = 0; i < pacman.lives; i++){
    const lifeLi = document.createElement('li')
    lifeLi.classList.add('pacman-life')
    lives.appendChild(lifeLi)
  }

  scoreSpan = document.getElementById('score')

}

function startPacman() {

  document.addEventListener('keyup', (e) => {
    console.log('startPacman')
    // debug purposes
    if (e.key === 'q') collision()

    if (stage.includes('gameStart')) {

      gameStart(e.keyCode)

    }

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
          if (pacman.pos === ghost.pos) collision(ghost)
          translateVal += 5
          const transformString = 'rotate(0deg)' + `${translate.string}(${translate.sign}${translateVal}%)`
          // console.log(transformString)
          cells[ghost.pos].firstChild.style.transform = transformString
        } else {
          cells[ghost.pos].firstChild.classList.remove(ghost.class)
          ghost.pos = move.pos

          cells[ghost.pos].firstChild.classList.add(ghost.class)
          cells[ghost.pos].firstChild.style.transform = 'rotate(0deg)' + `${translate.string}(0%)`


  
          if (pacman.pos === ghost.pos) collision(ghost)
          translateVal = 0
          moveComplete = true

        }


      }, ghost.speed)
      ghost.moving = false
    }
  })

}


function pacmanMove(nextPosFunc, rotation) {

  const nextPosIsWall = isNextPosWall(nextPosFunc(pacman.pos))
  // console.log(nextPosIsWall)
  if (!nextPosIsWall) clearInterval(pacman.moveId)
  else {
    bufferMove = { nextPosFunc: nextPosFunc, rotation: rotation }
    // lastKeyPressed = null
    return
  }

  if (bufferMove){
    if (!nextPosIsWall) bufferMove = null
  }

  let transform = 0
  cells[pacman.pos].firstChild.style.transform = rotation + 'translateX(0)'

  pacman.moveId = setInterval(() => {

    if (bufferMove){
      // console.log('buffer', bufferMove)
      if (!isNextPosWall(bufferMove.nextPosFunc(pacman.pos))) {
        nextPosFunc = bufferMove.nextPosFunc
        rotation = bufferMove.rotation
        bufferMove = null
      }
    }
    // console.log(nextPosFunc, rotation)

    const nextPosIsWall = cells[nextPosFunc(pacman.pos)].classList.contains('wall')

    if (!nextPosIsWall){
      if (transform < 75) {
        transform += 5

        ghosts.forEach(ghost => {
          if (ghost.pos === pacman.pos)  collision(ghost)
          else if (ghost.pos === nextPosFunc(pacman.pos))  collision(ghost)
        })

        cells[pacman.pos].firstChild.style.transform = rotation + `translateX(${transform}%)`
      } else {
        cells[pacman.pos].firstChild.classList.remove('pacman')
        pacman.pos = nextPosFunc(pacman.pos)

        if (cells[pacman.pos].classList.contains('dot')) {
          cells[pacman.pos].classList.remove('dot')
          remainingDots--
          updateScore(10)
          // console.log(remainingDots)
          if (remainingDots === 0) winGame()
        } else if (cells[pacman.pos].classList.contains('pill')) {
          console.log('hello hello')
          cells[pacman.pos].classList.remove('pill')
          powerPillMode()
        }
        cells[pacman.pos].firstChild.classList.add('pacman')
        cells[pacman.pos].firstChild.style.transform = rotation + 'translateX(0)'
        transform = 0
      }
    }
    

  }, pacman.speed)

}

function setDifficulty() {

  ghosts.forEach(ghost => cells[ghost.pos].firstChild.classList.remove(ghost.class))
  if (difficulty === 'easy') {
    ghosts = [ghostRed, ghostYellow]
    ghostSpeed = 15
    ghosts.forEach(ghost => ghost.speed = ghostSpeed)
  }
  else if (difficulty === 'medium'){
    ghosts = [ghostRed, ghostYellow, ghostPink]
    ghostSpeed = 15
    ghosts.forEach(ghost => ghost.speed = ghostSpeed)

  } else if (difficulty === 'hard'){
    ghosts = [ghostRed, ghostYellow, ghostPink]
    ghostSpeed = 10
    ghosts.forEach(ghost => ghost.speed = ghostSpeed)
  }
  initialPlacement()

}

function stopCharacters() {
  ghosts.forEach(ghost => clearInterval(ghost.moveId))
  clearInterval(pacman.moveId)
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
  pacman.lives--

  console.log(pacman.lives)

  lives.children[pacman.lives].classList.remove('pacman-life')
  // lives.chil.classList.remove('pacman-life')
  // clearInterval(collisionChecker)
  
  cells[pacman.pos].firstChild.classList.remove('pacman')
  cells[pacman.pos].firstChild.classList.add('death')

  if (pacman.lives === 0)  {
    gameOver(ghost)
    return
  }

  stopCharacters()



  setTimeout(() => {
    console.log('hi')

    cells[pacman.pos].firstChild.classList.remove('death')
    ghosts.forEach(ghost => {
      cells[ghost.pos].firstChild.classList.remove(ghost.class)
      ghost.moving = true
      ghost.pos = ghost.initialPos
    })
    pacman.pos = initialPacmanPos
    lastKeyPressed = null
    
    if (pacman.lives === 0) {
      gameOver()
    } else {
      initialPlacement()
      stage = 'gamePlay'
    }

  }, 900)
}

function gameOver(killerGhost){
  stage = 'gameOver'
  clearInterval(pacman.moveId)
  clearInterval(killerGhost.moveId)
  
  setTimeout(() => {
    killerGhost.moving = true
    moveGhosts()
    
    cells[pacman.pos].firstChild.classList.remove('death')
    const gameOverElements = document.querySelectorAll('.game-over')
    gameOverElements.forEach(element => element.style.display = 'block')

    setTimeout(() => {
      gameOverElements[0].style.transform = 'translateY(300px)'
      gameOverElements[1].style.opacity = '0.5'
    },100)

  }, 900)

}

function gameStart(keyCode){
  const selectors = document.querySelectorAll('.start-menu li > span')
  const startMenu = document.querySelector('.start-menu')
  const box = document.querySelector('.start-menu .box')
  const selectOptions = document.querySelector('.select-option')
  const difficultyMenu = document.querySelector('.difficulty')

  // selectors.forEach(s => console.log(s))
  if (stage.includes('Menu')) {
    if (keyCode === 38) {
      selectors[0].classList.add('selector')
      selectors[1].classList.remove('selector')
      startMenuOption = 'playGame'
    }

    else if (keyCode === 40) {
      selectors[1].classList.add('selector')
      selectors[0].classList.remove('selector')
      startMenuOption = 'chooseDifficulty'
    }
  }

  else if (stage.includes('Difficulty')) {
    if (keyCode === 37) {

      const difficultyOptions = document.querySelectorAll('.difficulty li')
      let difficultyIndex = difficulties.indexOf(difficulty)
      difficultyOptions[difficultyIndex].classList.remove('selected')

      if (difficultyIndex - 1 < 0) difficultyIndex = difficulties.length - 1
      else difficultyIndex -= 1

      difficulty = difficulties[difficultyIndex]
      difficultyOptions[difficultyIndex].classList.add('selected')

    }

    else if (keyCode === 39) {

      const difficultyOptions = document.querySelectorAll('.difficulty li')
      let difficultyIndex = difficulties.indexOf(difficulty)
      difficultyOptions[difficultyIndex].classList.remove('selected')

      if (difficultyIndex + 1 > difficulties.length - 1) difficultyIndex = 0
      else difficultyIndex += 1

      difficulty = difficulties[difficultyIndex]
      difficultyOptions[difficultyIndex].classList.add('selected')

    }
  }

  if (keyCode === 13){
    
    if (startMenuOption === 'playGame') {
      setTimeout(() => 
        selectors[0].style.transform = 'translateY(-2000px)',200) 
      setTimeout(() => {
        // Array.from(box.children).forEach(element => element.style.display = 'none')
        selectOptions.style.display = 'none'
        box.style.backgroundColor = 'rgb(0, 0, 0, 0)'
        stage = 'gamePlay'
      }, 1000)

      setDifficulty()

    }
    else if (startMenuOption === 'chooseDifficulty' && stage.includes('Menu')){
      console.log('hi')
      stage = 'gameStart Difficulty'
      selectOptions.style.display = 'none'
      difficultyMenu.style.display = 'flex'
    }
    else if (startMenuOption === 'chooseDifficulty' && stage.includes('Difficulty')){
      selectOptions.style.display = 'flex'
      difficultyMenu.style.display = 'none'
      stage = 'gameStart Menu'
    }
     
  }

}

function winGame(){
  stage = 'nextLevel'

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

  const xPacman = pacman.pos % width
  const yPacman = Math.floor(pacman.pos / width)

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


  if (bestMoves.length > 0){
    if (bestMoves.length < possibleMoves.length) return bestMoves
  }

  return possibleMoves

}

function levelEditor() {
  let select = false
  let array = new Set()
  const cells = document.querySelectorAll('.game .pacman-div')

  cells.forEach(cell => {
    cell.addEventListener('mouseover', (e) => {
      if (select) {
        e.currentTarget.style.backgroundColor = 'black'
        array.add(Array.from(cells).indexOf(e.currentTarget))
      }
    })

    cell.addEventListener('click', (e) => {
      e.currentTarget.style.backgroundColor = 'black'
      array.add(Array.from(cells).indexOf(e.currentTarget))
      if (select) select = false
      else select = true
    })

    cell.addEventListener('dblclick', (e) => {
      // console.log(e.currentTarget)
      e.currentTarget.style.backgroundColor = 'rgb(75, 75, 75)'
      array.delete(Array.from(cells).indexOf(e.currentTarget))
    })

  })

  document.addEventListener('keyup', e => {
    console.log('levelEditor')
    if (e.key === 'q') console.log(String(Array.from(array)))
  })

}