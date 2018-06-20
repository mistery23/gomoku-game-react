import uuid from 'uuid/v4';


class AppController {

  static createArray() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const col = width / 20;
    const rows = height / 20;

    let squares = [];
    let countSquares = 0;

    for (let rowCount = 0; rowCount < rows; rowCount++) {
      squares.push([]);
      for (let colCount = 0; colCount < col; colCount++) {
        squares[rowCount].push({
          lat: rowCount,
          lon: colCount,
          id: uuid()
        })
        countSquares = countSquares + 1;
      }
    }

    return squares;
  }

  static checkSquare = (
    winnerNumber,
    squares,
    indexRow,
    indexSelected,
    winnerAction
  ) => {
    const countSquareEnd = winnerNumber;
    const countDeep = countSquareEnd - 1;
    const lineLength = countDeep * 2 + 1;
    let crossModel = {
      horizontal: 0,
      vertical: 0,
      diagonalLeft: 0,
      diagonalRight: 0,
    }
    let circleModel = {
      horizontal: 0,
      vertical: 0,
      diagonalLeft: 0,
      diagonalRight: 0,
    }
    let winnerDetect = false;
    const checkWinner = (square, direction) => {
      if (!square) {
        return false
      }

      switch (square.type) {
        case 'circle':
          circleModel[direction] += 1;
          break
        case 'cross':
          crossModel[direction] += 1;
          break
        default:
          break
      }

      // if (square.type) {
      //   console.log("square", square)
      //   console.log(`${square.type}Model`, direction, circleModel[direction])
      // }

      if (circleModel[direction] === countSquareEnd || crossModel[direction] === countSquareEnd) {
        winnerDetect = true;
        console.log(`${square.type} is winner in ${direction} direction`)
        winnerAction({square, direction});
      }

    }

    const startIndexRow = indexRow - countDeep;
    const startIndex = indexSelected - countDeep;
    const finishIndex = indexSelected + countDeep;
    for (let i = 0; i < lineLength; i++) {
      const row = squares[startIndexRow + i];
      const indexCol = startIndex + i;
      const indexColFinish = finishIndex - i;

      if (row) {
        for (let a = 0; a < lineLength; a++) {
          const verticalRow = squares[startIndexRow + a];
          const squareHorizontal = row[startIndex + a];

          if (!winnerDetect) {
            checkWinner(squareHorizontal, "horizontal");
            if (verticalRow) {
              checkWinner(verticalRow[indexCol], "vertical");
              checkWinner(verticalRow[indexCol + a], "diagonalLeft");
              checkWinner(verticalRow[indexColFinish - a], "diagonalRight");
            }
            // For horizontals and verticals
            if (a === lineLength - 1) {
              crossModel = {
                horizontal: 0,
                vertical: 0,
              }
              circleModel = {
                horizontal: 0,
                vertical: 0,
              }
            }
          }
        }
        // For diagonals
        if (i === lineLength - 1) {
          crossModel.diagonalLeft = 0;
          circleModel.diagonalLeft = 0;
          crossModel.diagonalRight = 0;
          circleModel.diagonalRight = 0;
        }
      }

    }

  }

  static addSquares = (
    squares,
    indexRow,
    index
  ) => {
    const rowLength = squares.length;
    let colLength = squares[0].length;
    
    // Horizontal
    if (index === colLength - 1) {
      squares.map(row => {
        const lat = row[0].lat;

        row.push({
          id: uuid(),
          lon: colLength + 1,
          lat,
        })
        return row
      })
    }

    // Vertical
    if (indexRow === rowLength - 1) {
      const lastLine = [];

      colLength = squares[0].length;

      for (let i = 0; i < colLength; i++) {
        lastLine.push({
          lat: indexRow + 1,
          lon: i,
          id: uuid()
        })
      }

      squares.push(lastLine)
    }

  }


};


export default AppController;