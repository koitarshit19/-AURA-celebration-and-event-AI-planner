import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'

describe('App Routing & Route Transitions', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  function renderAppAt(route) {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    )
  }

  it('renders Dashboard at root route "/" with landmark and skip link', async () => {
    renderAppAt('/')

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /skip to main content/i })).toBeInTheDocument()
      expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content')
      expect(screen.getByRole('heading', { level: 1, name: /plan the party/i })).toBeInTheDocument()
    })
  })

  it('navigates to and renders "/new-event" wizard page', async () => {
    renderAppAt('/new-event')

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /new event planning wizard/i })).toBeInTheDocument()
    })
  })

  it('navigates to and renders "/plan-overview" page', async () => {
    renderAppAt('/plan-overview')

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByText(/Autonomous Masterplan/i)).toBeInTheDocument()
    })
  })

  it('navigates to and renders "/budget" ledger page', async () => {
    renderAppAt('/budget')

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /financial ledger/i })).toBeInTheDocument()
    })
  })

  it('navigates to and renders "/vendors" directory page', async () => {
    renderAppAt('/vendors')

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /curated vendor directory/i })).toBeInTheDocument()
    })
  })

  it('navigates to and renders "/schedule" timeline page', async () => {
    renderAppAt('/schedule')

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /event master schedule/i })).toBeInTheDocument()
    })
  })

  it('navigates to and renders "/ambience-studio" page', async () => {
    renderAppAt('/ambience-studio')

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /ambience & acoustic studio/i })).toBeInTheDocument()
    })
  })

  it('navigates to and renders "/concierge-support" desk page', async () => {
    renderAppAt('/concierge-support')

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /aura private client concierge/i })).toBeInTheDocument()
    })
  })
})
