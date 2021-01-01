// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {handlers} from '../../test/server-handlers'

import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// 🐨 get the server setup with an async function to handle the login POST request:
// 💰 here's something to get you started
// const server = setupServer(
//   rest.post(
//     'https://auth-provider.example.com/api/login',
//     async (req, res, ctx) => {
//       const {username, password} = req.body
//       if (!password) {
//         return res(ctx.status(400), ctx.json({message: 'password required'}))
//       }
//       if (!username) {
//         return res(ctx.status(400), ctx.json({message: 'username required'}))
//       }
//       return res(
//         ctx.json({
//           username,
//         }),
//       )
//     },
//   ),
// )
const server = setupServer(...handlers)
// you'll want to respond with an JSON object that has the username.
// 📜 https://mswjs.io/

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  // 🐨 uncomment this and you'll start making the request!
  userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() =>
    screen.getByLabelText(/loading/i),
  ).catch(err => console.log(err))
  expect(screen.getByText(username)).toBeInTheDocument()

  expect(screen.getByText(username).textContent).toEqual(username)

  // as soon as the user hits submit, we render a spinner to the screen. That
  // spinner has an aria-label of "loading" for accessibility purposes, so
  // 🐨 wait for the loading spinner to be removed using waitForElementToBeRemoved
  // 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved

  // once the login is successful, then the loading spinner disappears and
  // we render the username.
  // 🐨 assert that the username is on the screen
})

test(`logging in returns an error if the password or user not provided `, async () => {
  render(<Login />)
  const {username} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() =>
    screen.getByLabelText(/loading/i),
  ).catch(err => console.log(err))

  expect(screen.getByRole('alert')).toBeInTheDocument()

  expect(screen.getByRole('alert').textContent).toEqual('password required')
})
