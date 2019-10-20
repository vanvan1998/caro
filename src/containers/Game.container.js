import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import Game from '../components/Game';
//import App from '../components/Router';

const mapStateToProps = state => {
  return {
    history: state.history,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext,
    col: state.col,
    row: state.row,
    Sortvalue: state.Sortvalue,
    temp: state.temp,
    winner: state.winner
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
    }
  };
};
const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer;
