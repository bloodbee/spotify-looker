/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: "Welcome to Veesual-Spotify",
    })

    expect(heading).toBeDefined()
  })

  it('renders input form', () => {
    render(<Home />)

    const input = screen.getByRole('textbox', {
      name: "What are you looking for ?",
    })

    expect(input).toBeDefined()
  })
})