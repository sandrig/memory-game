import * as R from 'rambda'
import React from 'react'
import * as L from '../lib'
import * as Cell from './Cell'

// LOGIC
// const cell1 = ...
// const board = [cell1, cell2, cell3, cell4, cell4, cell6]

export const getStatusAt = R.curry((i, board) => {
  return R.view(R.lensPath(`${i}.status`), board)
})

export const setStatusAt = R.curry((i, status, board) => {
  return R.set(R.lensPath(`${i}.status`), status, board)
})

export const setStatusesBy = R.curry((predFn, status, board) => {
  return R.map(cell => (predFn(cell) ? { ...cell, status } : cell), board)
})

export const getStatusesBy = R.curry((predFn, board) => {
  return R.chain(cell => (predFn(cell) ? [cell.status] : []), board)
})

export const getSymbolsBy = R.curry((predFn, board) => {
  return R.chain(cell => (predFn(cell) ? [cell.symbol] : []), board)
})

export const canOpenAt = R.curry((i, board) => {
  return (
    i < board.length &&
    Cell.isClosed(board[i]) &&
    getStatusesBy(Cell.isBlocking, board).length < 2
  )
})

export const areOpensEqual = board => {
  const openSymbols = getSymbolsBy(Cell.isOpen, board)
  return openSymbols.length >= 2 && L.allEquals(openSymbols)
}

export const areOpensDifferent = board => {
  const openSymbols = getSymbolsBy(Cell.isOpen, board)
  return openSymbols.length >= 2 && !L.allEquals(openSymbols)
}

const charCodeA = 'A'.charCodeAt(0)

export const makeRandom = (m, n) => {
  if ((m * n) / 2 > 26) throw new Error('too big')
  if ((m * n) % 2) throw new Error('must be even')
  return R.pipe(
    () => R.range(0, (m * n) / 2), // [0, 1, 2, ...]
    R.map(i => String.fromCharCode(i + charCodeA)), // ['A', 'B', 'C', ...]
    R.chain(x => [x, x]), // ['A', 'A', 'B', 'B', ...]
    L.shuffle, // ['A', 'C', 'B', 'D', ...]
    R.map(symbol => ({ symbol, status: Cell.Status.Closed })),
  )()
}

// VIEW
export function BoardView({ board, onClickAt }) {
  return (
    <>
      <div className="board">
        {board.map((cell, i) => (
          <Cell.View key={i} cell={cell} onClick={_ => onClickAt(i)} />
        ))}
      </div>
      <style jsx>{`
        .board {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          width: 640px;
          height: 480px;
          gap: 2px;
        }
      `}</style>
    </>
  )
}

export function ScreenView({ background, children }) {
  return (
    <>
      <div className="screen">{children}</div>
      <style jsx>{`
        .screen {
          display: flex;
          width: 640px;
          height: 480px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: ${background};
        }
        :global(.screen h1) {
          font-size: 3rem;
        }
      `}</style>
    </>
  )
}
