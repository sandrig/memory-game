import React from 'react'
import * as Cell from '../components/Cell'

export default function Layout() {
  const cellOpen = { symbol: 'A', status: Cell.Status.Open }
  const cellClosed = { symbol: 'B', status: Cell.Status.Closed }
  const cellFailed = { symbol: 'C', status: Cell.Status.Failed }
  const cellDone = { symbol: 'D', status: Cell.Status.Done }

  return (
    <>
      <Cell.View cell={cellOpen} />
      <Cell.View cell={cellClosed} />
      <Cell.View cell={cellFailed} />
      <Cell.View cell={cellDone} />
    </>
  )
}
