import {indexOf} from 'lodash';

const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const yAxis = ['8', '7', '6', '5', '4', '3', '2', '1'];

export const convertIndexToName = ({x, y}) => {
  return `${xAxis[x]}${yAxis[y]}`;
};

export const convertNameToIndex = (name) => {
  return {x: indexOf(xAxis, name[0]), y: indexOf(yAxis, name[1])};
};

export const convertFENtoFigures = (
  fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
) => {
  const figuresList = [];
  fen = fen.split('/');
  fen.forEach((element, i) => {
    [...element].forEach((letter, j) => {
      if (letter !== '8') {
        figuresList.push({
          figure: letter,
          x: j,
          y: i,
          id: `${letter}${j}${i}`,
          isWhite: letter === letter.toUpperCase(),
        });
      }
    });
  });

  return figuresList;
};

export const convertFENtoIdOnBoard = (
  fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
) => {
  const figuresObj = {};
  fen = fen.split('/');
  fen.forEach((element, i) => {
    [...element].forEach((letter, j) => {
      if (letter !== '8') {
        figuresObj[`${letter}${j}${i}`] = {
          figure: letter,
          x: j,
          y: i,
          isWhite: letter === letter.toUpperCase(),
          removed: false,
        };
      }
    });
  });

  return figuresObj;
};
