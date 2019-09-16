import React from 'react';
import './App.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, j) {
    return (
      <Square
        value={this.props.squares[i][j]}
        onClick={() => this.props.onClick(i, j)}
      />
    );
  }

  render() {
    let table = []

    for (let i = 0; i < 20; i++) {
      let children = []
      for (let j = 0; j < 20; j++) {
        children.push(<div className="board-row">
          {/* {`Column  [${i + 1} ][${j + 1}]`} */}
          {this.renderSquare(i, j)}
        </div>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    }
    return table
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array.from(Array(20), () => new Array(20))
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  async handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = JSON.parse(JSON.stringify(current.squares))
    if (calculateWinner(squares) || squares[i][j]) {
      console.log(calculateWinner(squares));
      return;
    }
    squares[i][j] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i, j) => this.handleClick(i, j)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
function calculateWinner(squares) {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      if (squares[i][j]) {
        if ((squares[i][j] && squares[i][j] === squares[i][j + 1] && squares[i][j] === squares[i][j + 2] && squares[i][j] === squares[i][j + 3] && squares[i][j] === squares[i][j + 4])
          && !(squares[i][j + 5] && squares[i][j + 5] !== squares[i][j] && squares[i][j - 1] && squares[i][j - 1] !== squares[i][j]) ||
          (squares[i][j] && squares[i][j] === squares[i + 1][j] && squares[i][j] === squares[i + 2][j] && squares[i][j] === squares[i + 3][j] && squares[i][j] === squares[i + 4][j])
          && !(squares[i + 5][j] && squares[i + 5][j] !== squares[i][j] && squares[i - 1][j] && squares[i - 1][j] !== squares[i][j]) ||
          (squares[i][j] && squares[i][j] === squares[i + 1][j + 1] && squares[i][j] === squares[i + 2][j + 2] && squares[i][j] === squares[i + 3][j + 3] && squares[i][j] === squares[i + 4][j + 4])
          && !(squares[i + 5][j + 5] && squares[i + 5][j + 5] !== squares[i][j] && squares[i - 1][j - 1] && squares[i - 1][j - 1] !== squares[i][j]) ||
          (squares[i][j] && squares[i][j] === squares[i - 1][j + 1] && squares[i][j] === squares[i - 2][j + 2] && squares[i][j] === squares[i - 3][j + 3] && squares[i][j] === squares[i - 4][j + 4])
          && !(squares[i - 5][j + 5] && squares[i - 5][j + 5] !== squares[i][j] && squares[i + 1][j - 1] && squares[i + 1][j - 1] !== squares[i][j])
        ) {
          return squares[i][j];
        }
      }
    }
  }
  return null;
}


export default Game;
