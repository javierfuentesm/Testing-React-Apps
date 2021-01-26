// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {render /*as rtlRender,*/, screen} from '../../test/test-utils'
import {ThemeProvider} from '../../components/theme'
import EasyButton from '../../components/easy-button'

// function render(ui, {theme = 'light', ...options} = {}) {
//   function Wrapper({children}) {
//     return <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
//   }
//   return rtlRender(ui, {wrapper: Wrapper, ...options})
// }

test('renders with the light styles for the light theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
  render(<EasyButton>Easy</EasyButton>)

  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)

  render(<EasyButton>Easy dark</EasyButton>, {theme: 'dark'})

  const button2 = screen.getByRole('button', {name: /easy dark/i})
  expect(button2).toHaveStyle(`
    background-color: black;
    color: white;
  `)
  screen.debug()
  // 🐨 update the `render` call above to use the wrapper option using the
  // ThemeProvider
})

/* eslint no-unused-vars:0 */
