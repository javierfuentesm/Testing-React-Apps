// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
// import {render, screen, fireEvent, act} from '@testing-library/react'
import {renderHook, act} from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

const FacekComponent = ({initialCount = 0}) => {
  const {count, increment, decrement} = useCounter({initialCount})
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
  const initialCount = 10
  // render(<FacekComponent initialCount={initialCount} />)
  // let result
  // function TestFunction({initialCount}) {
  //   result = useCounter({initialCount})
  //
  //   return null
  // }
  //
  // render(<TestFunction initialCount={initialCount} />)
  const {result} = renderHook(useCounter, {initialProps: {initialCount}})

  expect(result.current.count).toBe(initialCount)
  act(() => result.current.increment())
  expect(result.current.count).toBe(initialCount + 1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(initialCount + 1 - 1)

  // expect(result.count).toBe(initialCount)
  // act(() => result.increment())
  // expect(result.count).toBe(initialCount + 1)
  // act(() => result.decrement())
  // expect(result.count).toBe(initialCount + 1 - 1)

  // expect(screen.getByRole('heading')).toHaveTextContent(
  //   `The count is ${initialCount}`,
  // )
  //
  // const increment = screen.getByRole('button', {name: /increment/i})
  // fireEvent.click(increment)
  // expect(screen.getByRole('heading')).toHaveTextContent(
  //   `The count is ${initialCount + 1}`,
  // )
  // const decrement = screen.getByRole('button', {name: /decrement/i})
  // fireEvent.click(decrement)
  // expect(screen.getByRole('heading')).toHaveTextContent(
  //   `The count is ${initialCount + 1 - 1}`,
  // )
})

test('the step can be changed', () => {
  const step = 3

  const {result, rerender} = renderHook(useCounter, {
    initialProps: {step: step},
  })

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(step)
  rerender({step: 2})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})

/* eslint no-unused-vars:0 */
