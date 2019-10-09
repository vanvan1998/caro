// import { combineReducers } from 'redux';
import * as types from '../constants/constants';

const history = [
  {
    squares: Array.from(Array(20), () => new Array(20))
  }
];

const initialState = {
  history,
  stepNumber: 0,
  xIsNext: true,
  col: [0],
  row: [0],
  Sortvalue: 'sorted descending',
  temp: [],
  winner: false,
  color: 'black'
};

function calculateWinner(squares, temp, state) {
  const st = { ...state };
  st.winner = false;
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
            for (let m = 2; m < 9; m += 2) {
              temp[m] = i;
              temp[m + 1] = j + m / 2;
            }
            st.winner = squares[i][j];
            return st; // đường ngang
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
              for (let m = 2; m < 9; m += 2) {
                temp[m] = i + m / 2;
                temp[m + 1] = j;
              }
              st.winner = squares[i][j];
              return st; // đường dọc
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
              for (let m = 2; m < 9; m += 2) {
                temp[m] = i + m / 2;
                temp[m + 1] = j;
              }
              st.winner = squares[i][j];
              return st; // đường dọc
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
              for (let m = 2; m < 9; m += 2) {
                temp[m] = i + m / 2;
                temp[m + 1] = j + m / 2;
              }
              st.winner = squares[i][j];
              return st; // đường chéo \
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
              for (let m = 2; m < 9; m += 2) {
                temp[m] = i + m / 2;
                temp[m + 1] = j + m / 2;
              }
              st.winner = squares[i][j];
              return st; // đường chéo \
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
              for (let m = 2; m < 9; m += 2) {
                temp[m] = i + m / 2;
                temp[m + 1] = j - m / 2;
              }
              st.winner = squares[i][j];
              return st; // đường chéo /
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
              for (let m = 2; m < 9; m += 2) {
                temp[m] = i + m / 2;
                temp[m + 1] = j - m / 2;
              }
              st.winner = squares[i][j];
              return st; // đường chéo /
            }
          }
        }
      }
    }
  }
  return st;
}

function handleClick(i, j, state) {
  const st = { ...state };
  const historytemp = st.history.slice(0, st.stepNumber + 1);
  const col = st.col.slice(0, st.stepNumber + 1);
  const row = st.row.slice(0, st.stepNumber + 1);
  const current = historytemp[historytemp.length - 1];
  const squares = JSON.parse(JSON.stringify(current.squares));
  const sttemp = calculateWinner(squares, st.temp, state);
  if (sttemp.winner || squares[i][j]) {
    return st;
  }

  squares[i][j] = st.xIsNext ? 'X' : 'O';

  st.history = historytemp.concat([
    {
      squares: squares
    }
  ]);
  st.stepNumber = historytemp.length;
  st.xIsNext = !st.xIsNext;
  st.col = col.concat(i + 1);
  st.row = row.concat(j + 1);
  return st;
}

function ColorChange(i, j, state) {
  console.log(state.color);
  const st = { ...state };
  st.color = 'black';
  if (st.winner) {
    for (let m = 0; m < 9; m += 2) {
      if (i === st.temp[m] && j === st.temp[m + 1]) {
        st.color = 'red';
        return st;
      }
    }
  }
  return st;
}

function jumpTo(step, state) {
  const st = { ...state };

  st.stepNumber = step;
  st.xIsNext = step % 2 === 0;
  return st;
}

function onclickSort(Sortvalue, state) {
  const st = { ...state };
  if (Sortvalue === 'sorted descending') {
    st.Sortvalue = 'Sort ascending';
  } else {
    st.Sortvalue = 'sorted descending';
  }
  return st;
}

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.boardClick: {
      return handleClick(action.data.i, action.data.j, state);
    }
    case types.goToMoveClick: {
      return jumpTo(action.data.step, state);
    }
    case types.colorChange: {
      return ColorChange(action.data.i, action.data.j, state);
    }
    case types.checkWinner: {
      return calculateWinner(action.data.squares, state.temp, state);
    }
    case types.sortClick: {
      return onclickSort(state.Sortvalue, state);
    }
    default:
      return state;
  }
};

export default myReducer;
