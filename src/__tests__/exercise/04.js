// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import Counter from '../../components/counter'

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  let submittedData
  const handleSubmit = data => (submittedData = data)
  //
  render(<Login onSubmit={handleSubmit} />)

  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  //
  // 🐨 get the username and password fields via `getByLabelText`
  const username = screen.getByLabelText('Username')
  const password = screen.getByLabelText('Password')
  const submit = screen.getByRole('button', {name: /submit/i})

  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  userEvent.type(username, 'lalala')
  userEvent.type(password, 'lelele')
  //
  // 🐨 click on the button with the text "Submit"
  //
  userEvent.click(submit)
  expect({username: 'lalala', password: 'lelele'}).toEqual(submittedData)
  // assert that submittedData is correct

  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
})

/*
eslint
  no-unused-vars: "off",
*/
