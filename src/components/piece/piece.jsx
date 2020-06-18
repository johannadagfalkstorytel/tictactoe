import React from 'react';

function Piece(props) {
  return (
    <button type='button' className='piece' onClick={props.onClick}>
      {props.value}
      {props.label}
      {props.choosenPiece}
    </button>
  );
}

export default Piece;
