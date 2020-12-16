import {indexOf} from 'lodash';

const xAxis = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const yAxis = ['8', '7', '6', '5', '4', '3', '2', '1'];

export const convertIndexToName = ({x, y}) => {
  return `${xAxis[x]}${yAxis[y]}`;
};

export const convertNameToIndex = (name) => {
  return {x: indexOf(xAxis, name[0]), y: indexOf(yAxis, name[1])};
};
