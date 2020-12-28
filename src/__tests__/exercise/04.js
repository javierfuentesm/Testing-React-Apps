// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import Counter from '../../components/counter'

test('submitting the form calls onSubmit with username and password', () => {
  // let submittedData
  // const handleSubmit = data => (submittedData = data)
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const username = screen.getByLabelText('Username')
  const password = screen.getByLabelText('Password')
  const submit = screen.getByRole('button', {name: /submit/i})

  userEvent.type(username, 'lalala')
  userEvent.type(password, 'lelele')

  userEvent.click(submit)
  // expect({username: 'lalala', password: 'lelele'}).toEqual(submittedData)
  expect(handleSubmit).toBeCalledWith({username: 'lalala', password: 'lelele'})
})

/*
eslint
  no-unused-vars: "off",
*/
