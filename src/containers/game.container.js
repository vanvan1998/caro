import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Game from '../components/game';

const mapStateToProps = state => {
  const GameState = state.GameReducer;
  return {
    history: GameState.history,
    stepNumber: GameState.stepNumber,
    xIsNext: GameState.xIsNext,
    col: GameState.col,
    row: GameState.row,
    Sortvalue: GameState.Sortvalue,
    temp: GameState.temp,
    winner: GameState.winner,
    username: state.LoginReducer.username,
    token: state.LoginReducer.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: (i, j) => {
      dispatch(actions.boardClick(i, j));
    },
    jumpTo: step => {
      dispatch(actions.goToMoveClick(step));
    },
    sortClick: () => {
      dispatch(actions.sortClick());
    },
    calculateWinner: squares => {
      dispatch(actions.checkWinner(squares));
    },
    Logout: () => {
      dispatch(actions.LogOut());
    }
  };
};
const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer;
