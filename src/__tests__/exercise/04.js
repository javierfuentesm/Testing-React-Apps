// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import Counter from '../../components/counter'
import faker from 'faker'

test('submitting the form calls onSubmit with username and password', () => {
  // let submittedData
  // const handleSubmit = data => (submittedData = data)

  const buildLoginForm = () => {
    return {
      usernameText: faker.internet.userName(),
      passwordText: faker.internet.password(),
    }
  }
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const username = screen.getByLabelText('Username')
  const password = screen.getByLabelText('Password')

  const {usernameText, passwordText} = buildLoginForm()
  const submit = screen.getByRole('button', {name: /submit/i})

  userEvent.type(username, usernameText)
  userEvent.type(password, passwordText)

  userEvent.click(submit)
  // expect({username: 'lalala', password: 'lelele'}).toEqual(submittedData)
  expect(handleSubmit).toBeCalledWith({
    username: usernameText,
    password: passwordText,
  })
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
