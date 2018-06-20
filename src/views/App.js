import React, { Component } from 'react';
import AppController from "../controllers/AppController";
import ModalAlert from "../components/modals/ModalAlert";
import ModalStart from "../components/modals/ModalStart";
import Square from '../components/Square';

class App extends Component {

  state = {
    squares: [],
    winner: undefined,
    winnerNumber: 3,
    squareType: "cross",
    gamers: {
      cross: {
        name: ""
      },
      circle: {
        name: ""
      }
    },
    modalText: "",
    modalStartShow: true,
    modalWinnerShow: false,
    onCloseModal: () => {
      this.setState({
        modalWinnerShow: false,
        modalStartShow: false,
      });
    },
  }

  componentDidMount() {
    this.setState({
      squares: AppController.createArray()
    })
  }

  render() {
    const { state } = this;
    return (
      <div className="page">

        {state.squares.map((row, indexRow) => (
          <div key={indexRow} className="page--row">
            {row.map((square, index) => (
              <Square
                key={square.id}
                type={square.type}
                checked={square.checked}
                winnerLine={square.winnerLine}
                onClick={() => { this.selectSquare(indexRow, index) }}
              />
            ))
            }
          </div>
        ))}
        <ModalAlert
          text={state.modalText}
          isOpen={state.modalWinnerShow}
          onRequestClose={state.onCloseModal}
          success={this.modalWinnerAction}
        />
        <ModalStart
          gamers={state.gamers}
          isOpen={state.modalStartShow}
          onRequestClose={state.onCloseModal}
          success={this.modalStartAction}
        />
      </div>
    );
  }

  modalStartAction = (data) => {
    const { state } = this;

    this.setState({
      gamers: { ...data }
    })

    state.onCloseModal()
  };

  modalWinnerAction = () => {
    this.clearGame();
  };

  onCheckedWinner = (data) => {
    const { state } = this;

    this.setState({
      modalText: `${state.gamers[data.square.type].name} is winner`,
      modalWinnerShow: true
    })
  }

  clearGame = () => {
    const { state } = this;
    state.squares.map(row => row.filter(square => {
      delete square.type
      delete square.checkeds
      return square
    }));

    state.onCloseModal()
  }

  selectSquare = (indexRow, index) => {
    const { state } = this;
    const squares = state.squares;
    let square = squares[indexRow][index];

    if (!square.type) {
      square.type = state.squareType;
    } else {
      alert("Sorry, select empty square");
      return
    }

    square.type = state.squareType === "cross" ? "circle" : "cross"

    AppController.checkSquare(
      state.winnerNumber,
      squares,
      indexRow,
      index,
      this.onCheckedWinner
    );
    // Настроїти швидкість першого кліку
    AppController.addSquares(squares, indexRow, index);

    this.setState({
      squareType: square.type,
      squares
    })
  }


}
export default App;