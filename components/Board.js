import React from 'react'
import * as Cell from './Cell'

// LOGIC
// const cell1 = ...
// const board = [cell1, cell2, cell3, cell4, cell4, cell6]

// VIEW
export function BoardView({ board, onClickAt }) {
  return (
    <div className="board">
      {board.map((cell, i) => (
        <Cell.View key={i} cell={cell} onClick={_ => onClickAt(i)} />
      ))}
    </div>
  )
}

export function ScreenView({ className, children }) {
  return <div className={`screen ${className}`}>{children}</div>
}
