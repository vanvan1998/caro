import * as types from '../constants/constants';

export const checkWinner = squares => {
  return {
    type: types.checkWinner,
    data: { squares }
  };
};

export const boardClick = (i, j) => {
  return {
    type: types.boardClick,
    data: { i, j }
  };
};

export const corlorChange = (i, j) => {
  return {
    type: types.colorChange,
    data: { i, j }
  };
};

export const goToMoveClick = step => {
  return {
    type: types.goToMoveClick,
    data: { step }
  };
};

export const sortClick = () => {
  return {
    type: types.sortClick
  };
};
