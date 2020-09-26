import React, { useState } from 'react'
import * as Cell from '../components/Cell'
import * as Board from '../components/Board'

export default function Layout() {
  return (
    <>
      <GameView />
    </>
  )
}

// LOGIC
const Status = {
  Stopped: 'Stopped',
  Running: 'Running',
  Won: 'Won',
  Lost: 'Lost',
}

const startGame = () => ({
  status: Status.Running,
})

function GameView() {
  const cellA1 = { symbol: 'A', status: Cell.Status.Closed }
  const cellA2 = { symbol: 'A', status: Cell.Status.Closed }
  const cellB1 = { symbol: 'B', status: Cell.Status.Closed }
  const cellB2 = { symbol: 'B', status: Cell.Status.Closed }
  const cellC1 = { symbol: 'C', status: Cell.Status.Closed }
  const cellC2 = { symbol: 'C', status: Cell.Status.Closed }
  const board = [cellA1, cellA2, cellB1, cellB2, cellC1, cellC2]

  const [state, setState] = useState({
    status: Status.Stopped,
  })

  const { status } = state

  function handleStartingClick(i) {
    if (status !== Status.Running) {
      setState(startGame)
    }
  }

  return (
    <div onClick={handleStartingClick}>
      <ScreenBoxView status={status} board={board} />
    </div>
  )
}

function ScreenBoxView({ status, board }) {
  switch (status) {
    case Status.Running:
      return <Board.BoardView board={board} onClickAt={() => null} />

    case Status.Stopped:
      return (
        <Board.ScreenView className="gray">
          <div>
            <h1>Memory Game</h1>
            <p className="small" style={{ textAlign: 'center' }}>
              Click anywhere to start!
            </p>
          </div>
        </Board.ScreenView>
      )

    case Status.Won:
      return (
        <Board.ScreenView className="green">
          <div>
            <h1>Victory!</h1>
            <p className="small" style={{ textAlign: 'center' }}>
              Click anywhere to try again!
            </p>
          </div>
        </Board.ScreenView>
      )

    case Status.Lost:
      return (
        <Board.ScreenView className="red">
          <div>
            <h1>Defeat!</h1>
            <p className="small" style={{ textAlign: 'center' }}>
              Click anywhere to try again!
            </p>
          </div>
        </Board.ScreenView>
      )
  }
}
