window.addEventListener('load', () => {

  const gameGrid = document.querySelector('.game')

  const width = 20

  const cells = []

  let pacmanPos = 0

  for (let i = 0; i < width ** 2; i++){
    const cell = document.createElement('div')
    const pacmanDiv = document.createElement('div')
    pacmanDiv.style.height = '100%'
    pacmanDiv.style.width = '100%'
    cell.appendChild(pacmanDiv)
    cells.push(cell)
    gameGrid.appendChild(cell)
  }
  
  cells[pacmanPos].firstChild.classList.add('pacman')

  function move(changePosFunction, rotation) {

    let transform = 0
    const rotate = rotation
    cells[pacmanPos].firstChild.style.transform = rotate + 'translate(0)'

    return setInterval(() => {
      if (transform < 75) {
        transform += 5
        cells[pacmanPos].firstChild.style.transform = rotate + `translateX(${transform}%)`
      } else {
        cells[pacmanPos].firstChild.classList.remove('pacman')
        changePosFunction()
        cells[pacmanPos].firstChild.classList.add('pacman')
        cells[pacmanPos].firstChild.style.transform = rotate + 'translateX(0)'
        transform = 0
      }
    }, 10)

  }


  
  let moveId = null
  let lastKey = null

  // let currentKey = null

  document.addEventListener('keyup', (e) => {

    if (lastKey !== e.keyCode){
      lastKey = e.keyCode

      if (e.keyCode === 39) {
        clearInterval(moveId)
        moveId = move(movePacmanRight, 'rotate(0deg)')
        
      } else if (e.keyCode === 37) {
        clearInterval(moveId)
        moveId = move(movePacmanLeft, 'rotate(180deg)')

      } else if (e.keyCode === 38) {
        clearInterval(moveId)
        moveId = move(movePacmanUp, 'rotate(270deg)')

      } else if (e.keyCode === 40) {
        clearInterval(moveId)
        moveId = move(movePacmanDown, 'rotate(90deg)')
      }
       
    }
    


  })

  function movePacmanRight(){
    pacmanPos += 1
  }

  function movePacmanLeft(){
    pacmanPos -= 1
  }

  function movePacmanUp(){
    pacmanPos -= width
  }

  function movePacmanDown(){
    pacmanPos += width
  }
















})