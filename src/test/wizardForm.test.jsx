import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { AuraProvider } from '../context/AuraContext.jsx'
import NewEvent from '../pages/NewEvent.jsx'

describe('NewEvent - Wizard Form Controls & Submission', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  function renderWizard() {
    return render(
      <MemoryRouter initialEntries={['/new-event']}>
        <AuraProvider>
          <Routes>
            <Route path="/new-event" element={<NewEvent />} />
            <Route path="/plan-overview" element={<div>Plan Overview Destination</div>} />
          </Routes>
        </AuraProvider>
      </MemoryRouter>
    )
  }

  it('renders the wizard with accessible headings, form inputs and default values', () => {
    renderWizard()

    expect(screen.getByRole('heading', { level: 1, name: /new event planning wizard/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /event type \/ canvas/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /logistics & target envelope/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /vibe & aesthetic mood synthesis/i })).toBeInTheDocument()

    // Form inputs
    expect(screen.getByLabelText(/target event date/i)).toHaveValue('October 24, 2025')
    expect(screen.getByLabelText(/destination \/ city/i)).toHaveValue('St. Helena & Napa Valley, CA')
    expect(screen.getByLabelText(/curated guest attendance/i)).toHaveValue('135')
    expect(screen.getByLabelText(/allocated budget envelope/i)).toHaveValue('75000')

    // Submit button
    expect(screen.getByRole('button', { name: /generate my plan/i })).toBeInTheDocument()
  })

  it('allows changing typology archetype and vibe mood via click and keyboard', async () => {
    const user = userEvent.setup()
    renderWizard()

    // Find Milestone Birthdays option and select it
    const milestoneOption = screen.getByText(/Milestone Birthdays/i).closest('[role="button"]')
    expect(milestoneOption).toBeInTheDocument()
    await user.click(milestoneOption)
    expect(milestoneOption).toHaveAttribute('aria-pressed', 'true')

    // Test keyboard selection on Vibe option (High-Energy & Chic)
    const chicOption = screen.getByText(/High-Energy & Chic/i).closest('[role="button"]')
    expect(chicOption).toBeInTheDocument()

    chicOption.focus()
    fireEvent.keyDown(chicOption, { key: 'Enter', code: 'Enter' })
    expect(chicOption).toHaveAttribute('aria-pressed', 'true')
  })

  it('updates text inputs and sliders properly', async () => {
    const user = userEvent.setup()
    renderWizard()

    const cityInput = screen.getByLabelText(/destination \/ city/i)
    await user.clear(cityInput)
    await user.type(cityInput, 'Lake Como, Villa Balbiano, Italy')
    expect(cityInput).toHaveValue('Lake Como, Villa Balbiano, Italy')

    const dateInput = screen.getByLabelText(/target event date/i)
    await user.clear(dateInput)
    await user.type(dateInput, 'June 18, 2026')
    expect(dateInput).toHaveValue('June 18, 2026')

    const guestSlider = screen.getByLabelText(/curated guest attendance/i)
    fireEvent.change(guestSlider, { target: { value: '250' } })
    expect(guestSlider).toHaveValue('250')

    const budgetSlider = screen.getByLabelText(/allocated budget envelope/i)
    fireEvent.change(budgetSlider, { target: { value: '150000' } })
    expect(budgetSlider).toHaveValue('150000')
  })

  it('submits valid blueprint, invokes Gemini generate-plan API, and navigates', async () => {
    const user = userEvent.setup()

    const mockGeneratedPlan = {
      eventName: 'Lake Como Villa Symphony',
      eventType: 'Weddings & Galas',
      city: 'Lake Como, Italy',
      date: 'June 18, 2026',
      guestCount: 200,
      budget: 150000,
      vibe: 'Romantic & Ethereal',
      summary: 'An opulent Italian celebration beside Lake Como.',
      vitalityScore: 99,
      budgetBreakdown: [
        { category: 'Venue', amount: 50000, percentage: 33.3, desc: 'Villa Balbiano lease' },
        { category: 'Catering', amount: 45000, percentage: 30.0, desc: 'Italian Michelin catering' },
        { category: 'Production', amount: 55000, percentage: 36.7, desc: 'Orchestra & lighting' },
      ],
      timeline: [],
      vendorChecklist: [],
      personalizedIdeas: [],
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockGeneratedPlan,
    })

    renderWizard()

    const submitBtn = screen.getByRole('button', { name: /generate my plan/i })
    await user.click(submitBtn)

    // Wait for route navigation to /plan-overview destination
    await waitFor(() => {
      expect(screen.getByText('Plan Overview Destination')).toBeInTheDocument()
    })

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/gemini/generate-plan',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
  })

  it('shows error banner when plan generation fails', async () => {
    const user = userEvent.setup()

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({
        error: 'Gemini rate limit exceeded. Please try again shortly.',
      }),
    })

    renderWizard()

    const submitBtn = screen.getByRole('button', { name: /generate my plan/i })
    await user.click(submitBtn)

    await waitFor(() => {
      expect(
        screen.getByText(/Gemini rate limit exceeded/i)
      ).toBeInTheDocument()
    })
  })
})
