window.addEventListener('load', () => {

  const gameGrid = document.querySelector('.game')

  const width = 20

  const wallArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 29, 30, 39, 40, 42, 43, 44, 45, 46, 47, 49, 50, 52, 53, 54, 55, 56, 57, 59, 60, 62, 63, 64, 65, 66, 67, 69, 70, 72, 73, 74, 75, 76, 77, 79, 80, 82, 83, 84, 85, 86, 87, 89, 90, 92, 93, 94, 95, 96, 97, 99, 100, 119, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 139, 140, 147, 152, 159, 160, 161, 162, 163, 164, 165, 167, 169, 170, 172, 174, 175, 176, 177, 178, 179, 189, 190, 200, 201, 202, 203, 204, 205, 207, 212, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 227, 228, 229, 230, 231, 232, 234, 235, 236, 237, 238, 239, 240, 249, 250, 259, 260, 262, 263, 264, 265, 267, 272, 274, 275, 276, 277, 279, 280, 282, 283, 284, 285, 287, 288, 289, 290, 291, 292, 294, 295, 296, 297, 299, 300, 302, 303, 304, 305, 307, 308, 309, 310, 311, 312, 314, 315, 316, 317, 319, 320, 327, 328, 329, 330, 331, 332, 339, 340, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 359, 360, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399]

  const cells = []

  let pacmanPos = 21

  let moveId = null, lastKey = null

  for (let i = 0; i < width ** 2; i++){
    const cell = document.createElement('div')
    const pacmanDiv = document.createElement('div')
    pacmanDiv.classList.add('pacman-div')
    
    if (wallArray.includes(i)) cell.classList.add('wall')
    
    cell.appendChild(pacmanDiv)
    cells.push(cell)
    gameGrid.appendChild(cell)
  }

  // initial pos
  cells[pacmanPos].firstChild.classList.add('pacman')

  document.addEventListener('keyup', (e) => {

    if (lastKey !== e.keyCode) {

      lastKey = e.keyCode
      clearInterval(moveId)

      if (e.keyCode === 39) moveId = move(nextPosRight, 'rotate(0deg)')

      else if (e.keyCode === 37) moveId = move(nextPosLeft, 'rotate(180deg)')

      else if (e.keyCode === 38) moveId = move(nextPosUp, 'rotate(270deg)')

      else if (e.keyCode === 40) moveId = move(nextPosDown, 'rotate(90deg)')

    }

  })

  function move(nextPosFunc, rotation) {

    let transform = 0
    const rotate = rotation
    cells[pacmanPos].firstChild.style.transform = rotate + 'translate(0)'

    return setInterval(() => {
      const nextPosIsWall = cells[nextPosFunc()].classList.contains('wall')

      if (!nextPosIsWall){
        if (transform < 75) {
          transform += 5
          cells[pacmanPos].firstChild.style.transform = rotate + `translateX(${transform}%)`
        } else {
          cells[pacmanPos].firstChild.classList.remove('pacman')
          pacmanPos = nextPosFunc()
          cells[pacmanPos].firstChild.classList.add('pacman')
          cells[pacmanPos].firstChild.style.transform = rotate + 'translateX(0)'
          transform = 0
        }
      }

    }, 10)

  }

  function nextPosRight(){
    return pacmanPos + 1
  }

  function nextPosLeft(){
    return pacmanPos - 1
  }

  function nextPosUp(){
    return pacmanPos - width
  }

  function nextPosDown(){
    return pacmanPos + width
  }

  function isNextPosWall(nextPos){
    return cells[nextPos].classList.contains('wall')
  }
















})