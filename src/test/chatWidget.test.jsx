import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AuraProvider } from '../context/AuraContext.jsx'
import AuraCopilotWidget from '../components/AuraCopilotWidget.jsx'

describe('AuraCopilotWidget - Chat Interaction & Error Handling', () => {
  const originalFetch = global.fetch

  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    global.fetch = originalFetch
  })

  function renderCopilot(initialRoute = '/') {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <AuraProvider>
          <AuraCopilotWidget />
        </AuraProvider>
      </MemoryRouter>
    )
  }

  it('renders launcher button and opens the drawer when clicked', async () => {
    const user = userEvent.setup()
    renderCopilot()

    const toggleButton = screen.getByRole('button', {
      name: /toggle aura gemini ai copilot/i,
    })
    expect(toggleButton).toBeInTheDocument()

    await user.click(toggleButton)

    // Verify copilot opened and drawer contents appear
    expect(screen.getByRole('heading', { name: /arthur vance/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /ask aura copilot/i })).toBeInTheDocument()
  })

  it('sends a chat message, receives model response, and clears the input field', async () => {
    const user = userEvent.setup()

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        text: 'The evening acoustic pacing is calibrated for 17:30 sunset.',
        model: 'gemini-3.8-flash',
        persona: 'arthur_vance',
      }),
    })

    renderCopilot()

    // Open Copilot drawer
    const toggleButton = screen.getByRole('button', {
      name: /toggle aura gemini ai copilot/i,
    })
    await user.click(toggleButton)

    const inputField = screen.getByRole('textbox', { name: /ask aura copilot/i })
    const sendButton = screen.getByRole('button', { name: /send message/i })

    // Type and send message
    await user.type(inputField, 'What time does the music start?')
    expect(inputField).toHaveValue('What time does the music start?')

    await user.click(sendButton)

    // Input should be cleared immediately
    expect(inputField).toHaveValue('')

    // Verify user message appears in thread
    expect(screen.getByText('What time does the music start?')).toBeInTheDocument()

    // Wait for model reply to appear
    await waitFor(() => {
      expect(
        screen.getByText('The evening acoustic pacing is calibrated for 17:30 sunset.')
      ).toBeInTheDocument()
    })

    // Verify fetch was called with correct payload
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/gemini/chat',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
  })

  it('displays error state when the API response fails', async () => {
    const user = userEvent.setup()

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({
        error: 'Aura AI engine is currently calibrating. Please verify connection and try again.',
      }),
    })

    renderCopilot()

    const toggleButton = screen.getByRole('button', {
      name: /toggle aura gemini ai copilot/i,
    })
    await user.click(toggleButton)

    const inputField = screen.getByRole('textbox', { name: /ask aura copilot/i })
    const sendButton = screen.getByRole('button', { name: /send message/i })

    await user.type(inputField, 'Check vendor contracts')
    await user.click(sendButton)

    // Wait for error card and retry button to be displayed
    await waitFor(() => {
      expect(
        screen.getByText(/Aura AI was unable to generate a response/i)
      ).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: /retry prompt/i })).toBeInTheDocument()
  })

  it('does not render floating widget on /concierge-support page', () => {
    renderCopilot('/concierge-support')

    const toggleButton = screen.queryByRole('button', {
      name: /toggle aura gemini ai copilot/i,
    })
    expect(toggleButton).not.toBeInTheDocument()
  })
})
