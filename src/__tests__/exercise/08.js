// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
const FacekComponent = () => {
  const {count, increment, decrement} = useCounter()
  return (
    <>
      <button onClick={increment}>Increment</button>
      <br />
      <button onClick={decrement}>Decrement</button>
      <br />
      <h1>The count is {count}</h1>
    </>
  )
}

test('exposes the count and increment/decrement functions', () => {
  // 🐨 render the
  const initialCount = 0
  render(<FacekComponent />)

  expect(screen.getByRole('heading')).toHaveTextContent(
    `The count is ${initialCount}`,
  )

  const increment = screen.getByRole('button', {name: /increment/i})
  fireEvent.click(increment)
  expect(screen.getByRole('heading')).toHaveTextContent(
    `The count is ${initialCount + 1}`,
  )
  const decrement = screen.getByRole('button', {name: /decrement/i})
  fireEvent.click(decrement)
  expect(screen.getByRole('heading')).toHaveTextContent(
    `The count is ${initialCount + 1 - 1}`,
  )
  screen.debug()

  // 🐨 get the elements you need using screen
  // 🐨 assert on the initial state of the hook
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
})

/* eslint no-unused-vars:0 */
