/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Album from '../../pages/album/[id].js'

import mockRouter from "next-router-mock";
import "next-router-mock/dynamic-routes";

mockRouter.registerPaths([
  "/album/[dynamic]",
]);

jest.mock('next/router', () => require('next-router-mock'));

describe('Album', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/album/2noRn2Aes5aoNVsU6iWThc");
  });

  it('renders a heading', () => {
    render(<Album />)

    setTimeout(() => {
      const heading = screen.getByRole('heading', {
        name: "Welcome to Veesual-Spotify",
      })

      expect(heading).toBeDefined()
    }, 2000)
  })

  it('renders album a href', () => {
    render(<Album />)

    setTimeout(() => {
      const link = screen.getByRole('link')

      expect(link).toBeDefined()
    }, 2000)
  })

  it('renders album data', () => {
    render(<Album />)

    setTimeout(() => {
      const terms = screen.getByRole('term')

      expect(terms).toBeDefined()
    }, 2000)
  })
})