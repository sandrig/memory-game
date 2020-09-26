import React from 'react'

// LOGIC
// cell = {
//   symbol : 'A',
//   status : Status.Open,
// }

export const Status = {
  Open: 'Open',
  Closed: 'Closed',
  Done: 'Done',
  Failed: 'Failed',
}

export const isOpen = cell => cell.status === Status.Open

export const isClosed = cell => cell.status === Status.Closed

export const isDone = cell => cell.status === Status.Done

export const isFailed = cell => cell.status === Status.Failed

// VIEW
export function View({ cell, onClick }) {
  const { status, symbol } = cell
  return (
    <div className={`cell ${classByStatus(status)}`} onClick={onClick}>
      {status === Status.Closed ? '' : symbol}
    </div>
  )
}

export function classByStatus(status) {
  return status.toLowerCase()
}
