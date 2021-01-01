import King from './../assets/figures/outlined/001-king.png';
import Queen from './../assets/figures/outlined/002-queen.png';
import Rook from './../assets/figures/outlined/003-rook.png';
import Bishop from './../assets/figures/outlined/004-bishop.png';
import Knight from './../assets/figures/outlined/005-knight.png';
import Pawn from './../assets/figures/outlined/006-pawn.png';

import KingB from './../assets/figures/outlined/001-king-b.png';
import QueenB from './../assets/figures/outlined/002-queen-b.png';
import RookB from './../assets/figures/outlined/003-rook-b.png';
import BishopB from './../assets/figures/outlined/004-bishop-b.png';
import KnightB from './../assets/figures/outlined/005-knight-b.png';
import PawnB from './../assets/figures/outlined/006-pawn-b.png';

const figures = {
  // white
  P: Pawn,
  B: Bishop,
  R: Rook,
  N: Knight,
  Q: Queen,
  K: King,
  // black
  p: PawnB,
  b: BishopB,
  r: RookB,
  n: KnightB,
  q: QueenB,
  k: KingB,
};

export const convertFigureToImagePath = (name) => {
  return figures[name];
};
