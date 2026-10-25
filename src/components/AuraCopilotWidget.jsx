import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useAura, CHAT_MODELS, CHAT_PERSONAS } from '../context/AuraContext.jsx'
import Icon from './Icon.jsx'

/**
 * Floating Gemini AI Copilot widget displayed across all views except /concierge-support.
 */
export default function AuraCopilotWidget() {
  const location = useLocation()

  // Requirement: Floating chatbot on every page EXCEPT Support (/concierge-support)
  if (location.pathname === '/concierge-support') {
    return null
  }

  return <CopilotContent location={location} />
}

/**
 * Inner interactive drawer and launcher for the Aura AI Copilot.
 *
 * @param {Object} props - Component props
 * @param {Object} props.location - React Router location object
 */
function CopilotContent({ location }) {
  const {
    user,
    activePlan,
    selectedEvent,
    chatMessages,
    sendChatMessage,
    clearChatHistory,
    transcribeAudioBlob,
    chatLoading,
    transcribing,
    selectedModel,
    setSelectedModel,
    selectedPersona,
    setSelectedPersona,
    copilotOpen,
    setCopilotOpen,
  } = useAura()

  const [input, setInput] = useState('')
  const [wasTranscribed, setWasTranscribed] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [micError, setMicError] = useState(null)
  const [chatError, setChatError] = useState(null)
  const [lastPrompt, setLastPrompt] = useState('')

  const mediaRecorderRef = useRef(null)
  const mediaStreamRef = useRef(null)
  const audioChunksRef = useRef([])
  const timerRef = useRef(null)
  const scrollContainerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (
      copilotOpen &&
      scrollContainerRef.current &&
      typeof scrollContainerRef.current.scrollTo === 'function'
    ) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [chatMessages, chatLoading, copilotOpen])

  // Close drawer on Escape key press for keyboard accessibility
  useEffect(() => {
    if (!copilotOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCopilotOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [copilotOpen, setCopilotOpen])

  // Ensure timers, recorder, and microphone hardware tracks are cleaned up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== 'inactive'
      ) {
        mediaRecorderRef.current.stop()
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop()
    }
  }, [])

  const startRecording = async () => {
    setMicError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream
      const recorder = new MediaRecorder(stream)
      audioChunksRef.current = []

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop())
        mediaStreamRef.current = null
        if (timerRef.current) clearInterval(timerRef.current)
        setIsRecording(false)
        setRecordingSeconds(0)

        if (audioChunksRef.current.length === 0) return
        const audioBlob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        })
        try {
          const transcript = await transcribeAudioBlob(
            audioBlob,
            recorder.mimeType || 'audio/webm'
          )
          if (transcript) {
            setInput((prev) => (prev ? `${prev} ${transcript}` : transcript))
            setWasTranscribed(true)
          }
        } catch (err) {
          setMicError(
            err instanceof Error ? err.message : 'Failed to transcribe audio'
          )
        }
      }

      mediaRecorderRef.current = recorder
      recorder.start()
      setIsRecording(true)
      setRecordingSeconds(0)
      timerRef.current = setInterval(() => {
        setRecordingSeconds((s) => s + 1)
      }, 1000)
    } catch {
      setMicError('Microphone permission denied or unavailable.')
    }
  }

  const handleSendPrompt = async (promptText, fromAudio = false) => {
    const textToSend = (promptText || input).trim()
    if (!textToSend || chatLoading) return
    setLastPrompt(textToSend)
    setChatError(null)
    setInput('')
    setWasTranscribed(false)

    try {
      const result = await sendChatMessage(textToSend, {
        model: selectedModel,
        persona: selectedPersona,
        transcribedFromAudio: fromAudio,
        currentPage: location.pathname,
      })
      if (!result) {
        setChatError(
          'Aura AI was unable to generate a response. Please check your connection and retry.'
        )
      }
    } catch (err) {
      setChatError(
        err instanceof Error ? err.message : 'Connection failed. Please retry.'
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSendPrompt(input, wasTranscribed)
  }

  const activePersona =
    CHAT_PERSONAS.find((p) => p.id === selectedPersona) || CHAT_PERSONAS[0]

  // Memoized Page-Aware Context Quick Questions
  const suggestions = useMemo(() => {
    const path = location.pathname
    if (path === '/budget') {
      return [
        'How much is allocated for catering and venue?',
        'Where can we save 10% on vendor rates?',
        'Explain the contingency buffer amount',
      ]
    }
    if (path === '/vendors') {
      return [
        'What are the key vendor contract SLAs?',
        'Give advice on DJ and sound contracts',
        'How should I approach floral negotiations?',
      ]
    }
    if (path === '/schedule') {
      return [
        'What is our day-of run-of-show timing?',
        'When should guest arrivals and toasts happen?',
        'Explain the golden hour sunset transition',
      ]
    }
    if (path === '/ambience-studio' || path === '/plan-overview') {
      return [
        'Give me DJ and music playlist ideas',
        'What lighting Kelvin matches our vibe?',
        'Suggest unique sensory theme ideas',
      ]
    }
    return [
      'Pricing & budget breakdown',
      'DJ & music curation ideas',
      'Lighting & sensory ambience',
      'Dates, milestones & run-of-show',
    ]
  }, [location.pathname])

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCopilotOpen((prev) => !prev)}
          aria-expanded={copilotOpen}
          aria-controls="aura-copilot-drawer"
          aria-label="Toggle Aura Gemini AI Copilot"
          className="group flex items-center gap-2.5 pl-3.5 pr-4 py-3 rounded-2xl bg-gradient-to-r from-surface-container-highest via-surface-container-high to-surface-container border border-primary/35 shadow-[0_14px_38px_rgba(0,0,0,0.7),0_0_24px_rgba(192,193,255,0.22)] hover:border-secondary-fixed/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <div
            className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary-container to-primary flex items-center justify-center text-on-primary shadow-[0_0_16px_rgba(192,193,255,0.4)]"
            aria-hidden="true"
          >
            <Icon name={copilotOpen ? 'close' : 'auto_awesome'} className="text-[20px]" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-secondary-fixed ring-2 ring-surface-container-lowest" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-headline-sm text-[14px] text-on-surface leading-tight flex items-center gap-1.5">
              Aura AI Copilot
              <span className="px-1.5 py-0.5 rounded bg-secondary-container/40 text-secondary-fixed font-label-caps text-[9px] uppercase tracking-wider">
                Gemini
              </span>
            </span>
            <span className="font-body-sm text-[11px] text-on-surface-variant truncate max-w-[140px]">
              {activePlan?.eventName || selectedEvent.name}
            </span>
          </div>
        </button>
      </div>

      {/* Copilot Drawer Window */}
      {copilotOpen && (
        <div
          id="aura-copilot-drawer"
          role="dialog"
          aria-modal="false"
          aria-label="Aura AI Copilot Assistant"
          className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] max-h-[82vh] rounded-2xl bg-surface-container-low/95 backdrop-blur-2xl border border-primary/30 shadow-[0_28px_70px_rgba(0,0,0,0.85),0_0_32px_rgba(192,193,255,0.16)] flex flex-col overflow-hidden animate-scale-in"
        >
          {/* Header */}
          <div className="p-4 bg-surface-container-high/80 border-b border-outline-variant/20 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0"
                aria-hidden="true"
              >
                <Icon name={activePersona.icon} className="text-[20px]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-headline-sm text-[15px] text-on-surface truncate">
                    {activePersona.name}
                  </h3>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse shrink-0"
                    aria-hidden="true"
                  />
                </div>
                <p className="font-body-sm text-[11px] text-secondary-fixed truncate">
                  {activePlan?.eventName || selectedEvent.name} ({location.pathname})
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={clearChatHistory}
                title="Reset conversation thread"
                aria-label="Reset conversation thread"
                className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer"
              >
                <Icon name="restart_alt" className="text-[18px]" />
              </button>
              <button
                type="button"
                onClick={() => setCopilotOpen(false)}
                title="Minimize Copilot"
                aria-label="Minimize Copilot"
                className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>
          </div>

          {/* Model & Persona Switchers */}
          <div className="px-3.5 py-2.5 bg-surface-container/90 border-b border-outline-variant/15 space-y-2">
            {/* Model Selector */}
            <div
              role="group"
              aria-label="Select AI Model"
              className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-surface-container-lowest/80 border border-outline-variant/15"
            >
              {CHAT_MODELS.map((m) => {
                const active = selectedModel === m.id
                return (
                  <button
                    key={m.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedModel(m.id)}
                    className={`px-2 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
                      active
                        ? 'bg-primary text-on-primary shadow-[0_0_12px_rgba(192,193,255,0.3)] font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50'
                    }`}
                  >
                    <div className="font-label-caps text-[10px] uppercase tracking-wider leading-tight">
                      {m.label}
                    </div>
                    <div
                      className={`text-[9px] truncate ${
                        active ? 'text-on-primary/80' : 'text-outline'
                      }`}
                    >
                      {m.badge}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Persona Selector */}
            <div
              role="group"
              aria-label="Select AI Persona"
              className="flex items-center gap-1.5 overflow-x-auto"
            >
              {CHAT_PERSONAS.map((p) => {
                const active = selectedPersona === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedPersona(p.id)}
                    className={`px-2.5 py-1 rounded-lg font-label-md text-[11px] flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                      active
                        ? 'bg-secondary-container/50 text-secondary-fixed border border-secondary-fixed/30'
                        : 'bg-surface-container-high/60 text-on-surface-variant hover:text-on-surface border border-transparent'
                    }`}
                  >
                    <Icon name={p.icon} className="text-[14px]" />
                    <span>{p.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quick Page Suggestions Pills */}
          <div
            role="group"
            aria-label="Suggested contextual prompts"
            className="px-3.5 py-2 bg-surface-container/60 border-b border-outline-variant/15 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap"
          >
            <span className="font-label-caps text-[9px] text-secondary-fixed uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Icon name="bolt" className="text-[12px]" />
              Contextual:
            </span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSendPrompt(s)}
                className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface text-[11px] transition-colors shrink-0 border border-outline-variant/20 cursor-pointer"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Messages Thread */}
          <div
            ref={scrollContainerRef}
            role="log"
            aria-live="polite"
            aria-atomic="false"
            aria-label="Conversation history"
            className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[260px] max-h-[360px]"
          >
            {chatMessages.map((msg) => {
              const isUser = msg.role === 'user'
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isUser ? 'items-end' : 'items-start'
                  } gap-1`}
                >
                  <div className="flex items-center gap-1.5 px-1">
                    <span className="font-label-caps text-[10px] text-secondary-fixed">
                      {isUser
                        ? user?.displayName || 'Host'
                        : CHAT_PERSONAS.find((p) => p.id === msg.persona)?.name ||
                          'Arthur Vance'}
                    </span>
                    <span className="font-label-caps text-[9px] text-outline">
                      {msg.timeStr}
                    </span>
                    {!isUser && msg.model && (
                      <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-primary font-label-caps text-[9px]">
                        {msg.model}
                      </span>
                    )}
                    {isUser && msg.transcribedFromAudio && (
                      <span className="px-1.5 py-0.2 rounded bg-secondary-container/40 text-secondary-fixed font-label-caps text-[9px] flex items-center gap-0.5">
                        <Icon name="mic" className="text-[10px]" /> Voice
                      </span>
                    )}
                  </div>
                  <div
                    className={`max-w-[88%] p-3 rounded-xl font-body-sm text-body-sm leading-relaxed whitespace-pre-wrap shadow-md ${
                      isUser
                        ? 'rounded-tr-xs bg-gradient-to-br from-primary-container/40 to-surface-container-highest text-on-surface border border-primary/20'
                        : 'rounded-tl-xs bg-surface-container-high/90 text-on-surface border border-outline-variant/15'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              )
            })}

            {/* Loading Indicator */}
            {chatLoading && (
              <div
                role="status"
                aria-live="polite"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-high/70 border border-primary/20 text-on-surface font-body-sm text-body-sm animate-fade-in"
              >
                <div
                  className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0"
                  aria-hidden="true"
                />
                <span className="text-secondary-fixed text-[12px]">
                  Arthur is consulting {selectedModel} for {activePlan?.eventName || 'your event'}...
                </span>
              </div>
            )}

            {/* Error Message Card with Retry */}
            {chatError && !chatLoading && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-error-container/30 border border-error/30 text-on-error-container text-body-sm flex flex-col gap-2 animate-fade-in"
              >
                <div className="flex items-center gap-2">
                  <Icon name="error" className="text-error text-[18px]" />
                  <span className="font-medium text-[12px]">{chatError}</span>
                </div>
                {lastPrompt && (
                  <button
                    type="button"
                    onClick={() => handleSendPrompt(lastPrompt)}
                    className="self-start px-2.5 py-1 rounded bg-error-container text-on-error-container text-[11px] font-semibold hover:brightness-110 cursor-pointer"
                  >
                    Retry Prompt
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Voice Recording Banner / Error */}
          {(isRecording || transcribing || micError) && (
            <div
              role="status"
              aria-live="polite"
              className="px-4 py-2 bg-surface-container-highest border-t border-outline-variant/20 flex items-center justify-between text-body-sm"
            >
              {isRecording && (
                <div className="flex items-center gap-2 text-secondary-fixed">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-error animate-ping"
                    aria-hidden="true"
                  />
                  <span className="font-label-md text-[12px]">
                    Recording voice directive ({recordingSeconds}s)...
                  </span>
                </div>
              )}
              {transcribing && (
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="graphic_eq" className="text-[16px] animate-spin" />
                  <span className="font-label-md text-[12px]">
                    Transcribing with gemini-3.5-transcribe...
                  </span>
                </div>
              )}
              {micError && !isRecording && !transcribing && (
                <div
                  role="alert"
                  className="flex items-center justify-between w-full text-error text-[11px]"
                >
                  <span>{micError}</span>
                  <button
                    type="button"
                    onClick={() => setMicError(null)}
                    className="underline ml-2 cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-surface-container-high/90 border-t border-outline-variant/20 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              disabled={transcribing}
              aria-pressed={isRecording}
              aria-label={isRecording ? 'Stop voice recording' : 'Record voice directive'}
              title={
                isRecording
                  ? 'Stop recording and transcribe with gemini-3.5-transcribe'
                  : 'Record voice note (transcribed with gemini-3.5-transcribe)'
              }
              className={`p-2.5 rounded-xl border transition-all shrink-0 cursor-pointer ${
                isRecording
                  ? 'bg-error-container text-on-error-container border-error animate-pulse'
                  : 'bg-surface-container text-secondary-fixed hover:bg-surface-container-highest border-outline-variant/25'
              }`}
            >
              <Icon name={isRecording ? 'stop_circle' : 'mic'} className="text-[19px]" />
            </button>
            <label htmlFor="copilot-input-field" className="sr-only">
              Ask Aura Copilot a question
            </label>
            <input
              ref={inputRef}
              id="copilot-input-field"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isRecording
                  ? 'Listening to microphone...'
                  : 'Ask about pricing, dates, DJ, lighting...'
              }
              className="flex-1 h-10 px-3 rounded-xl bg-surface-container text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={!input.trim() || chatLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-primary-container to-primary text-on-primary disabled:opacity-40 transition-all shrink-0 cursor-pointer"
              aria-label="Send message"
            >
              <Icon name="send" className="text-[18px]" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}