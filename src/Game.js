import React from 'react';
import './App.css';

function Square(prs) {
  return (
    <button
      className="square"
      type="button"
      style={{ color: prs.color }}
      onClick={prs.onClick}
    >
      {prs.value}
    </button>
  );
}

function calculateWinner(squares, temp) {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      if (squares[i][j]) {
        if (
          squares[i][j] === squares[i][j + 1] &&
          squares[i][j] === squares[i][j + 2] &&
          squares[i][j] === squares[i][j + 3] &&
          squares[i][j] === squares[i][j + 4]
        ) {
          if (
            !(
              squares[i][j + 5] &&
              squares[i][j + 5] !== squares[i][j] &&
              squares[i][j - 1] &&
              squares[i][j - 1] !== squares[i][j]
            )
          ) {
            temp[0] = i;
            temp[1] = j;
            temp[2] = 0;
            return squares[i][j]; // đường ngang
          }
        } else if (i < 16) {
          if (
            squares[i][j] === squares[i + 1][j] &&
            squares[i][j] === squares[i + 2][j] &&
            squares[i][j] === squares[i + 3][j] &&
            squares[i][j] === squares[i + 4][j]
          ) {
            if (i > 14 || i < 1) {
              temp[0] = i;
              temp[1] = j;
              temp[2] = 1;
              return squares[i][j]; // đường dọc
            }
            if (
              !(
                squares[i + 5][j] &&
                squares[i + 5][j] !== squares[i][j] &&
                squares[i - 1][j] &&
                squares[i - 1][j] !== squares[i][j]
              )
            ) {
              temp[0] = i;
              temp[1] = j;
              temp[2] = 1;
              return squares[i][j]; // đường dọc
            }
          } else if (
            squares[i][j] === squares[i + 1][j + 1] &&
            squares[i][j] === squares[i + 2][j + 2] &&
            squares[i][j] === squares[i + 3][j + 3] &&
            squares[i][j] === squares[i + 4][j + 4]
          ) {
            if (i > 14 || i < 1) {
              temp[0] = i;
              temp[1] = j;
              temp[2] = 2;
              return squares[i][j]; // đường chéo \
            }
            if (
              !(
                squares[i + 5][j + 5] &&
                squares[i + 5][j + 5] !== squares[i][j] &&
                squares[i - 1][j - 1] &&
                squares[i - 1][j - 1] !== squares[i][j]
              )
            ) {
              temp[0] = i;
              temp[1] = j;
              temp[2] = 2;
              return squares[i][j]; // đường chéo \
            }
          } else if (
            squares[i][j] === squares[i + 1][j - 1] &&
            squares[i][j] === squares[i + 2][j - 2] &&
            squares[i][j] === squares[i + 3][j - 3] &&
            squares[i][j] === squares[i + 4][j - 4]
          ) {
            if (i < 5 || i > 18) {
              temp[0] = i;
              temp[1] = j;
              temp[2] = 3;
              return squares[i][j]; // đường chéo /
            }
            if (
              !(
                squares[i - 5][j + 5] &&
                squares[i - 5][j + 5] !== squares[i][j] &&
                squares[i + 1][j - 1] &&
                squares[i + 1][j - 1] !== squares[i][j]
              )
            ) {
              temp[0] = i;
              temp[1] = j;
              temp[2] = 3;
              return squares[i][j]; // đường chéo /
            }
          }
        }
      }
    }
  }
  return null;
}

class Board extends React.Component {
  renderSquare(i, j) {
    const prs = this.props;
    return (
      <Square
        value={prs.squares[i][j]}
        color={prs.color(i, j)}
        onClick={() => prs.onClick(i, j)}
      />
    );
  }

  render() {
    const table = [];

    for (let i = 0; i < 20; i++) {
      const children = [];
      for (let j = 0; j < 20; j++) {
        children.push(
          <div key={j} className="board-row">
            {this.renderSquare(i, j)}
          </div>
        );
      }
      table.push(
        <div key={i} className="divRow">
          {children}
        </div>
      );
    }
    return table;
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
      xIsNext: true,
      col: [0],
      row: [0],
      Sortvalue: 'sorted descending'
    };
  }

  async handleClick(i, j) {
    const st = this.state;
    const history = st.history.slice(0, st.stepNumber + 1);
    const col = st.col.slice(0, st.stepNumber + 1);
    const row = st.row.slice(0, st.stepNumber + 1);
    const current = history[history.length - 1];
    const temp = [];
    const squares = JSON.parse(JSON.stringify(current.squares));
    if (calculateWinner(squares, temp) || squares[i][j]) {
      return;
    }
    squares[i][j] = st.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !st.xIsNext,
      col: col.concat(i + 1),
      row: row.concat(j + 1)
    });
  }

  ColorChange(i, j, winner, temp) {
    if (winner) {
      if (temp[2] === 0 && i === temp[0]) {
        if (
          j === temp[1] ||
          j === temp[1] + 1 ||
          j === temp[1] + 2 ||
          j === temp[1] + 3 ||
          j === temp[1] + 4
        ) {
          return 'red';
        }
      } else if (temp[2] === 1 && j === temp[1]) {
        if (
          i === temp[0] ||
          i === temp[0] + 1 ||
          i === temp[0] + 2 ||
          i === temp[0] + 3 ||
          i === temp[0] + 4
        ) {
          return 'red';
        }
      } else if (temp[2] === 2) {
        if (
          (i === temp[0] && j === temp[1]) ||
          (i === temp[0] + 1 && j === temp[1] + 1) ||
          (i === temp[0] + 2 && j === temp[1] + 2) ||
          (i === temp[0] + 3 && j === temp[1] + 3) ||
          (i === temp[0] + 4 && j === temp[1] + 4)
        ) {
          return 'red';
        }
      } else if (temp[2] === 3) {
        if (
          (i === temp[0] && j === temp[1]) ||
          (i === temp[0] + 1 && j === temp[1] - 1) ||
          (i === temp[0] + 2 && j === temp[1] - 2) ||
          (i === temp[0] + 3 && j === temp[1] - 3) ||
          (i === temp[0] + 4 && j === temp[1] - 4)
        ) {
          return 'red';
        }
      }
    }
    return 'black';
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  onclickSort(Sortvalue) {
    if (Sortvalue === 'sorted descending') {
      this.setState({ Sortvalue: 'Sort ascending' });
    } else {
      this.setState({ Sortvalue: 'sorted descending' });
    }
  }

  render() {
    const st = this.state;
    const history = st.history.slice(0, st.stepNumber + 1);
    const current = history[st.stepNumber];
    const temp = []; // temp[0] lưu giá trị i, temp[1] lưu giá trị j, temp[2] lưu giá trị loại đường thắng: 0:|; 1:--; 2:\; 3:/
    const winner = calculateWinner(current.squares, temp);
    const { Sortvalue } = this.state;
    // move: danh sách mảng 123456..
    const moves = history.map((step, move) => {
      const desc = move // desc lưu "go to move ..."
        ? `Go to move [${st.col[move]}][${st.row[move].toString()}]`
        : 'Go to game start';
      return (
        <li key={move}>
          <button
            type="button"
            style={
              st.stepNumber === move
                ? { fontWeight: 'bold' }
                : { fontWeight: 'normal' }
            }
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });
    if (Sortvalue === 'Sort ascending') {
      moves.reverse();
    }
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${st.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            color={(i, j) => this.ColorChange(i, j, winner, temp)}
            onClick={(i, j) => this.handleClick(i, j)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <br />
          <button
            type="button"
            className="buttonSort"
            onClick={this.onclickSort.bind(this, Sortvalue)}
          >
            {Sortvalue}
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
