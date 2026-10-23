import { useState, useRef, useEffect } from 'react'
import { useAura, CHAT_MODELS, CHAT_PERSONAS } from '../context/AuraContext.jsx'
import Icon from '../components/Icon.jsx'

import { QUICK_DIRECTIVES } from '../data/conciergeData.js'

export default function Concierge() {
  const {
    user,
    signInWithGoogle,
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
  } = useAura()

  const [inputValue, setInputValue] = useState('')
  const [wasTranscribed, setWasTranscribed] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [micStatus, setMicStatus] = useState(null)
  const [callModalOpen, setCallModalOpen] = useState(false)
  const [copiedBrief, setCopiedBrief] = useState(false)
  const [exportedTranscript, setExportedTranscript] = useState(false)

  const chatContainerRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const timerRef = useRef(null)

  useEffect(() => {
    if (chatContainerRef.current && typeof chatContainerRef.current.scrollTo === 'function') {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [chatMessages, chatLoading])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== 'inactive'
      ) {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  const startVoiceRecording = async () => {
    setMicStatus(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      audioChunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data)
        }
      }

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop())
        if (timerRef.current) clearInterval(timerRef.current)
        setIsRecording(false)
        setRecordingSeconds(0)

        if (audioChunksRef.current.length === 0) return
        const audioBlob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        })
        try {
          setMicStatus('Transcribing audio with gemini-3.5-transcribe...')
          const transcript = await transcribeAudioBlob(
            audioBlob,
            recorder.mimeType || 'audio/webm'
          )
          if (transcript) {
            setInputValue((prev) => (prev ? `${prev} ${transcript}` : transcript))
            setWasTranscribed(true)
            setMicStatus('Voice directive transcribed via gemini-3.5-transcribe')
          } else {
            setMicStatus('No speech detected in audio clip.')
          }
        } catch (err) {
          setMicStatus(
            err instanceof Error ? err.message : 'Audio transcription failed.'
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
      setMicStatus('Microphone access denied or unavailable in this browser.')
    }
  }

  const stopVoiceRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== 'inactive'
    ) {
      mediaRecorderRef.current.stop()
    }
  }

  const handleSendDirective = async (e) => {
    e.preventDefault()
    if (!inputValue.trim() || chatLoading) return
    const text = inputValue
    const fromAudio = wasTranscribed
    setInputValue('')
    setWasTranscribed(false)
    setMicStatus(null)
    await sendChatMessage(text, {
      model: selectedModel,
      persona: selectedPersona,
      transcribedFromAudio: fromAudio,
    })
  }

  const handleCopySummary = () => {
    const latestModelMsgs = chatMessages
      .filter((m) => m.role === 'model')
      .slice(-2)
      .map((m) => m.text)
      .join(' | ')
    navigator.clipboard.writeText(
      `Aura Concierge Brief (${selectedEvent.name}): ${latestModelMsgs}`
    )
    setCopiedBrief(true)
    setTimeout(() => setCopiedBrief(false), 2000)
  }

  const handleExportTranscript = () => {
    const transcriptText = chatMessages
      .map((m) => `[${m.timeStr}] ${m.role === 'user' ? 'Host' : m.persona}: ${m.text}`)
      .join('\n\n')
    navigator.clipboard.writeText(transcriptText)
    setExportedTranscript(true)
    setTimeout(() => setExportedTranscript(false), 2000)
  }

  const activePersonaObj =
    CHAT_PERSONAS.find((p) => p.id === selectedPersona) || CHAT_PERSONAS[0]

  return (
    <>
      <div className="flex flex-col w-full animate-fade-up">
        <div className="relative w-full max-w-7xl mx-auto px-margin-sm lg:px-margin py-space-lg space-y-space-lg">
          {/* Top Banner */}
          <div className="relative rounded-xl p-space-lg bg-surface-container-low/70 backdrop-blur-2xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)] overflow-hidden animate-fade-up stagger-1 border border-outline-variant/15">
            <div className="absolute -right-24 -top-24 w-96 h-96 bg-secondary-container/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-[90px] pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
              <div className="space-y-space-xs">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container/30 text-secondary-fixed font-label-caps text-label-caps uppercase tracking-widest shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,1)]" />
                    Ultra-Priority Tier
                  </span>
                  <span className="font-body-sm text-body-sm text-outline-variant">•</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {selectedEvent.name}
                  </span>
                  <span className="font-body-sm text-body-sm text-outline-variant">•</span>
                  <span className="font-label-caps text-label-caps text-primary">
                    {user ? 'Firestore Live Sync Active' : 'Local Preview Mode'}
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight">
                  Aura Private Client Concierge &amp; Gemini Studio
                </h1>
                <p className="font-body-md text-body-md text-secondary-fixed-dim flex items-center gap-2">
                  <Icon name="verified_user" className="text-secondary text-[18px]" />
                  Multi-Turn Gemini Intelligence + Live Voice Transcription (gemini-3.5-transcribe)
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-space-md p-space-sm rounded-xl bg-surface-container-high/60 backdrop-blur-md self-start md:self-auto shadow-sm border border-outline-variant/15">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-surface-container-highest">
                    <Icon name="neurology" className="text-primary text-[22px]" />
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  </div>
                  <div>
                    <div className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                      Active Gemini Engine
                    </div>
                    <div className="font-headline-sm text-[15px] text-secondary-fixed">
                      {selectedModel}
                    </div>
                  </div>
                </div>
                <div className="h-8 w-px bg-surface-variant/70" />
                <div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                    Voice Transcriber
                  </div>
                  <div className="font-headline-sm text-[15px] text-primary">
                    gemini-3.5-transcribe
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start animate-fade-up stagger-2">
            {/* Left 8 Columns: Producer Card + Multi-Turn Gemini Chat */}
            <div className="lg:col-span-8 flex flex-col gap-space-lg">
              {/* Executive Producer Card */}
              <div className="relative rounded-xl p-space-lg bg-surface-container-low/80 backdrop-blur-xl shadow-xl overflow-hidden transition-all hover:shadow-[0_20px_40px_-15px_rgba(211,197,168,0.12)] border border-outline-variant/15">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-md">
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg bg-surface-container">
                        <img
                          className="w-full h-full object-cover"
                          alt="Arthur Vance"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS_djOlUNUYO_eAiEHZNDM2shCTv0_Pvq_9plHrtttsiqNmvPGbrDimjQLdbry8gNE-vwLKfjl2escN86paynNMAXCy_d0szz50Dz0tVW6FhGtnXKJ5l0h0_lmOpwagZHaPkCftzZQ6CUXbrg3V9UMKu-6VSm05kBtkNn8ffr7g5WdlZn4HMDd-NempFc9S0Qztm0OnUUBGuxxgUO26mWnK1XJeyD6Dn1HA2NxgvChHuV3QzW9qNR7fA"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-surface-container-highest shadow-md">
                        <Icon name="verified" fill className="text-secondary-fixed text-[14px]" />
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-headline-md text-headline-md text-on-surface">
                          {activePersonaObj.name}
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary-fixed font-label-caps text-label-caps uppercase tracking-wide">
                          {activePersonaObj.role}
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Senior Event Director &amp; Autonomous Celebration Strategist
                      </p>
                      <p className="font-body-sm text-body-sm text-outline">
                        Napa Valley Private Estates &amp; High-Stakes Galas · Multi-Turn Context Active
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/80 text-secondary font-label-md text-label-md shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-secondary-fixed shadow-[0_0_8px_rgba(240,225,195,0.9)] animate-ping" />
                      <span>Online Now · Realtime AI</span>
                    </div>
                    <button
                      onClick={() => setCallModalOpen(true)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-surface-container-highest text-secondary-fixed hover:bg-secondary-container/30 transition-all font-label-md text-label-md shadow-sm cursor-pointer"
                      type="button"
                    >
                      <Icon name="phone_in_talk" className="text-[18px]" />
                      Patch Call to Arthur
                    </button>
                  </div>
                </div>

                {/* Role & Model Intelligence Controls */}
                <div className="mt-space-md pt-space-md border-t border-outline-variant/15 flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                      1. Select Gemini Intelligence Tier
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full sm:w-auto">
                      {CHAT_MODELS.map((m) => {
                        const isSelected = selectedModel === m.id
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setSelectedModel(m.id)}
                            className={`px-3 py-2 rounded-xl text-left border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-surface-container-highest border-primary text-on-surface shadow-[0_0_18px_rgba(192,193,255,0.2)]'
                                : 'bg-surface-container/60 border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-label-md text-[12px] font-semibold text-on-surface">
                                {m.label}
                              </span>
                              <span
                                className={`px-1.5 py-0.5 rounded font-label-caps text-[9px] ${
                                  isSelected
                                    ? 'bg-primary text-on-primary'
                                    : 'bg-surface-container-highest text-secondary-fixed'
                                }`}
                              >
                                {m.badge}
                              </span>
                            </div>
                            <p className="font-body-sm text-[10px] text-outline mt-0.5">
                              {m.desc}
                            </p>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                      2. Select Specialist Role
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {CHAT_PERSONAS.map((p) => {
                        const isSelected = selectedPersona === p.id
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setSelectedPersona(p.id)}
                            className={`px-3 py-1.5 rounded-lg font-label-md text-label-md flex items-center gap-1.5 border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-secondary-container/40 text-secondary-fixed border-secondary-fixed/40 shadow-sm'
                                : 'bg-surface-container/60 text-on-surface-variant hover:text-on-surface border-outline-variant/15'
                            }`}
                          >
                            <Icon name={p.icon} className="text-[16px]" />
                            <span>{p.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-Turn Chat Terminal */}
              <div className="relative rounded-xl bg-surface-container-low/70 backdrop-blur-2xl shadow-xl flex flex-col h-[680px] overflow-hidden border border-outline-variant/15">
                <div className="p-space-md bg-surface-container-high/60 backdrop-blur-md flex items-center justify-between shadow-sm border-b border-outline-variant/15">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary-fixed shadow-[0_0_10px_rgba(240,225,195,0.8)]" />
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-on-surface">
                        Dedicated Producer Direct Line ({activePersonaObj.name})
                      </span>
                      <span className="font-label-caps text-label-caps text-outline">
                        Powered by {selectedModel} · {chatMessages.length} Messages in Thread
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleExportTranscript}
                      className="px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-label-md text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                      title="Copy Certified Transcript"
                    >
                      <Icon
                        name={exportedTranscript ? 'check' : 'download_done'}
                        className="text-[16px] text-secondary-fixed"
                      />
                      <span className="hidden sm:inline">
                        {exportedTranscript ? 'Copied' : 'Transcript'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={clearChatHistory}
                      className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                      title="Reset Conversation Thread"
                      aria-label="Reset Conversation Thread"
                    >
                      <Icon name="restart_alt" className="text-[18px]" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Message Thread */}
                <div
                  ref={chatContainerRef}
                  aria-live="polite"
                  aria-atomic="false"
                  className="flex-1 overflow-y-auto p-space-lg space-y-space-md"
                >
                  <div className="flex justify-center my-1">
                    <span className="px-3 py-1 rounded-full bg-surface-container text-outline font-label-caps text-label-caps uppercase tracking-wider shadow-inner">
                      Today · {selectedEvent.name} · Multi-Turn Session
                    </span>
                  </div>

                  {chatMessages.map((msg) => {
                    const isUser = msg.role === 'user'
                    const personaMeta =
                      CHAT_PERSONAS.find((p) => p.id === msg.persona) ||
                      CHAT_PERSONAS[0]

                    if (isUser) {
                      return (
                        <div
                          key={msg.id}
                          className="flex items-start justify-end gap-space-sm max-w-[85%] ml-auto group animate-fade-in"
                        >
                          <div className="space-y-1 flex flex-col items-end">
                            <div className="flex items-center gap-2">
                              {msg.transcribedFromAudio && (
                                <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary-fixed font-label-caps text-[9px] flex items-center gap-1">
                                  <Icon name="mic" className="text-[11px]" />
                                  gemini-3.5-transcribe
                                </span>
                              )}
                              <span className="font-label-caps text-label-caps text-outline">
                                {msg.timeStr}
                              </span>
                              <span className="font-label-md text-label-md text-primary font-semibold">
                                {user?.displayName || 'Julian (Host)'}
                              </span>
                            </div>
                            <div className="p-4 rounded-xl rounded-tr-sm bg-gradient-to-br from-primary-container/30 to-surface-container-highest text-on-surface font-body-md text-body-md shadow-[0_8px_20px_rgba(0,0,0,0.4)] leading-relaxed whitespace-pre-wrap">
                              {msg.text}
                            </div>
                            <span className="font-label-caps text-label-caps text-primary/70 px-1 flex items-center gap-1">
                              {user ? 'Synced to Firestore' : 'Delivered via Secure Terminal'}
                              <Icon name="done_all" className="text-[13px] text-primary" />
                            </span>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center shrink-0 mt-1 shadow-md overflow-hidden">
                            {user?.photoURL ? (
                              <img
                                src={user.photoURL}
                                alt=""
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Icon name="person" className="text-primary text-[18px]" />
                            )}
                          </div>
                        </div>
                      )
                    }

                    return (
                      <div
                        key={msg.id}
                        className="flex items-start gap-space-sm max-w-[88%] group animate-fade-in"
                      >
                        <div className="w-8 h-8 rounded-lg bg-surface-container-high shrink-0 mt-1 shadow-md flex items-center justify-center border border-secondary-fixed/20">
                          <Icon
                            name={personaMeta.icon}
                            className="text-secondary-fixed text-[18px]"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-label-md text-label-md text-secondary-fixed font-semibold">
                              {personaMeta.name}
                            </span>
                            <span className="font-label-caps text-label-caps text-outline">
                              {msg.timeStr}
                            </span>
                            {msg.model && (
                              <span className="px-2 py-0.5 rounded bg-surface-container-highest text-primary font-label-caps text-[10px]">
                                {msg.model}
                              </span>
                            )}
                          </div>
                          <div className="p-4 rounded-xl rounded-tl-sm bg-surface-container-high/85 text-on-surface font-body-md text-body-md shadow-[0_8px_20px_rgba(0,0,0,0.35)] leading-relaxed whitespace-pre-wrap border border-outline-variant/15">
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {chatLoading && (
                    <div className="flex items-start gap-space-sm max-w-[85%] animate-fade-in">
                      <div className="w-8 h-8 rounded-lg bg-surface-container-high shrink-0 mt-1 shadow-md flex items-center justify-center">
                        <Icon
                          name="auto_awesome"
                          className="text-primary text-[18px] animate-spin"
                        />
                      </div>
                      <div className="p-4 rounded-xl rounded-tl-sm bg-surface-container-high/60 text-on-surface-variant font-body-sm text-body-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping" />
                        <span>
                          {activePersonaObj.name} is synthesizing response via{' '}
                          <strong className="text-primary">{selectedModel}</strong>...
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Directives Bar */}
                <div className="px-space-md py-space-sm bg-surface-container-high/40 flex items-center gap-2 overflow-x-auto whitespace-nowrap shadow-inner border-t border-outline-variant/15">
                  <span className="font-label-caps text-label-caps text-secondary-fixed-dim uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                    <Icon name="bolt" className="text-[14px]" />
                    Quick Directive:
                  </span>
                  {QUICK_DIRECTIVES.map((promptText, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setInputValue(promptText)
                        setWasTranscribed(false)
                      }}
                      className="px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface text-body-sm font-body-sm transition-all shadow-sm cursor-pointer"
                    >
                      {promptText}
                    </button>
                  ))}
                </div>

                {/* Voice Recording & Transcription Status Bar */}
                {(isRecording || transcribing || micStatus) && (
                  <div className="px-space-md py-2 bg-surface-container-highest/90 border-t border-outline-variant/25 flex items-center justify-between gap-2 text-body-sm">
                    <div className="flex items-center gap-2">
                      {isRecording ? (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping" />
                          <span className="text-secondary-fixed font-medium">
                            Recording microphone audio ({recordingSeconds}s) — Click stop button to transcribe with gemini-3.5-transcribe
                          </span>
                        </>
                      ) : transcribing ? (
                        <>
                          <Icon
                            name="graphic_eq"
                            className="text-primary text-[18px] animate-spin"
                          />
                          <span className="text-primary font-medium">
                            Transcribing recorded voice note with gemini-3.5-transcribe...
                          </span>
                        </>
                      ) : (
                        <>
                          <Icon
                            name="check_circle"
                            className="text-secondary-fixed text-[16px]"
                          />
                          <span className="text-on-surface-variant">{micStatus}</span>
                        </>
                      )}
                    </div>
                    {!isRecording && !transcribing && (
                      <button
                        type="button"
                        onClick={() => setMicStatus(null)}
                        className="text-outline hover:text-on-surface text-[11px] underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                )}

                {/* Input & Audio Recorder Controls */}
                <div className="p-space-md bg-surface-container-high/70 backdrop-blur-xl border-t border-outline-variant/15">
                  <form onSubmit={handleSendDirective} className="space-y-space-sm">
                    <div className="relative flex items-center gap-2">
                      <button
                        type="button"
                        onClick={
                          isRecording ? stopVoiceRecording : startVoiceRecording
                        }
                        disabled={transcribing}
                        aria-label={
                          isRecording
                            ? 'Stop voice recording'
                            : 'Record voice directive via microphone'
                        }
                        title={
                          isRecording
                            ? 'Stop recording & transcribe via gemini-3.5-transcribe'
                            : 'Record Voice Directive (gemini-3.5-transcribe)'
                        }
                        className={`h-12 px-3.5 rounded-xl flex items-center gap-1.5 font-label-md text-label-md transition-all shrink-0 cursor-pointer border ${
                          isRecording
                            ? 'bg-error-container text-on-error-container border-error animate-pulse shadow-[0_0_16px_rgba(255,180,171,0.4)]'
                            : 'bg-surface-container hover:bg-surface-container-highest text-secondary-fixed border-outline-variant/25'
                        }`}
                      >
                        <Icon
                          name={isRecording ? 'stop_circle' : 'mic'}
                          className="text-[20px]"
                        />
                        <span className="hidden sm:inline">
                          {isRecording
                            ? `Stop (${recordingSeconds}s)`
                            : transcribing
                            ? 'Transcribing...'
                            : 'Voice Note'}
                        </span>
                      </button>

                      <label htmlFor="concierge-message-input" className="sr-only">
                        Celebration directive message
                      </label>
                      <input
                        id="concierge-message-input"
                        aria-label="Celebration directive message"
                        className="flex-1 h-12 px-4 rounded-xl bg-surface-container text-on-surface placeholder:text-outline/70 focus:outline-none focus:ring-1 focus:ring-primary font-body-md text-body-md shadow-inner transition-all"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={
                          isRecording
                            ? 'Speak your celebration directive clearly...'
                            : `Ask ${activePersonaObj.name} (${selectedModel})...`
                        }
                        type="text"
                      />

                      <button
                        disabled={!inputValue.trim() || chatLoading}
                        aria-label="Send directive to concierge"
                        className="h-12 px-5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-md text-label-md font-semibold shadow-[0_0_16px_rgba(192,193,255,0.3)] hover:brightness-110 active:scale-95 disabled:opacity-40 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                        type="submit"
                      >
                        <span>Send Directive</span>
                        <Icon name="send" className="text-[16px]" />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-label-caps font-label-caps text-outline px-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed" />
                        Voice input powered by <strong>gemini-3.5-transcribe</strong> · Multi-turn reasoning via <strong>{selectedModel}</strong>
                      </span>
                      <span>Press Enter to Dispatch</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Cloud Status, Emergency Line & AI Co-pilot Summary */}
            <div className="lg:col-span-4 flex flex-col gap-space-lg">
              {/* Firebase Cloud Sync Card */}
              <div className="rounded-xl p-space-lg bg-surface-container-low/85 backdrop-blur-xl shadow-xl space-y-space-sm border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-container/25 text-primary font-label-caps text-label-caps uppercase tracking-wider">
                    <Icon name="cloud_done" className="text-[14px]" />
                    Firebase Cloud Enclave
                  </span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      user ? 'bg-emerald-400' : 'bg-secondary-fixed animate-pulse'
                    }`}
                  />
                </div>
                {user ? (
                  <div className="space-y-2">
                    <div className="font-headline-sm text-[16px] text-on-surface">
                      Authenticated as {user.displayName || user.email}
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Your multi-turn Gemini conversation history, celebration blueprints, and host directives are automatically persisted in Firestore.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="font-headline-sm text-[16px] text-on-surface">
                      Persist Your Concierge History
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Sign in with Google to save your multi-turn chat threads and celebration blueprints to your private Firestore database.
                    </p>
                    <button
                      type="button"
                      onClick={() => signInWithGoogle()}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-primary-container to-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition-all cursor-pointer"
                    >
                      <Icon name="login" className="text-[18px]" />
                      <span>Connect Google Account</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Emergency Hotline */}
              <div className="rounded-xl p-space-lg bg-gradient-to-br from-surface-container-high/90 via-surface-container-low/95 to-surface-container-lowest/90 backdrop-blur-xl shadow-xl space-y-space-md border border-outline-variant/15">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary-fixed font-label-caps text-label-caps uppercase tracking-wider">
                    <Icon name="shield_with_heart" className="text-[13px]" />
                    Concierge Guard 24/7
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-ping" />
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    On-Site Emergency Hotline
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-normal">
                    Direct priority dispatch bypassing standard queuing. Connects instantaneously to the Lead Producer Field Unit.
                  </p>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-lowest/80 shadow-inner flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                      Direct Field Line
                    </span>
                    <div className="font-headline-sm text-headline-sm text-secondary-fixed tracking-wider font-mono">
                      +1 (888) 942-AURA
                    </div>
                    <span className="font-body-sm text-[11px] text-outline-variant">
                      PIN: 7709-GALA-EXCL
                    </span>
                  </div>
                  <a
                    className="p-3 rounded-xl bg-secondary-fixed text-on-secondary-fixed hover:brightness-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(240,225,195,0.4)] flex items-center justify-center"
                    href="tel:+18889422872"
                  >
                    <Icon name="call" className="text-[22px]" />
                  </a>
                </div>
              </div>

              {/* AI Co-pilot Summary */}
              <div className="rounded-xl p-space-lg bg-surface-container-low/80 backdrop-blur-xl shadow-xl space-y-space-md border border-outline-variant/15">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-primary-container/20 flex items-center justify-center">
                      <Icon name="smart_toy" className="text-primary text-[16px]" />
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      AI Co-pilot Summary
                    </h3>
                  </div>
                  <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest">
                    Realtime Sync
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Auto-synthesizes all client directives, voice transcriptions, and producer logs into actionable minutes.
                </p>
                <div className="space-y-space-sm">
                  <div className="p-3 rounded-lg bg-surface-container-high/50 space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-wider">
                        Action Pending
                      </span>
                      <span className="font-label-caps text-label-caps text-outline">
                        Assigned: Arthur
                      </span>
                    </div>
                    <div className="font-label-md text-label-md text-on-surface">
                      Conduct sunset light check at 18:15 with lighting tech (West Terrace).
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-surface-container-high/50 space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-caps text-label-caps text-primary uppercase tracking-wider">
                        Protocol Locked
                      </span>
                      <span className="font-label-caps text-label-caps text-outline">
                        Verified
                      </span>
                    </div>
                    <div className="font-label-md text-label-md text-on-surface">
                      Dom Pérignon Vintage 2013 temperature checked to 9°C cellar hold.
                    </div>
                  </div>
                </div>
                <div className="pt-space-xs flex items-center justify-between">
                  <button
                    onClick={handleCopySummary}
                    className="font-label-md text-label-md text-secondary-fixed hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                    type="button"
                  >
                    <Icon
                      name={copiedBrief ? 'check' : 'content_copy'}
                      className="text-[16px]"
                    />
                    <span>{copiedBrief ? 'Brief Copied' : 'Copy Directives Brief'}</span>
                  </button>
                  <span className="font-label-caps text-label-caps text-outline">
                    Live Thread
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call Modal */}
        {callModalOpen && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setCallModalOpen(false)
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-container-lowest/80 backdrop-blur-xl animate-fade-in"
          >
            <div className="relative w-full max-w-md rounded-xl bg-surface-container-low p-space-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] text-center space-y-space-md border border-outline-variant/25">
              <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-tr from-secondary to-primary shadow-[0_0_24px_rgba(240,225,195,0.4)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-surface-container-high">
                  <img
                    className="w-full h-full object-cover"
                    alt="Arthur Vance"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB67ynaUtzhGgNM5-ybRKmUPKr3a8cgAHSbYiabWA4BUWCAGMf4bCHp6DdY5P_A48bIQ-8tcGiwe1X_4DjTNNxboLsTMoU9fZ7fvvV9iQc9tSoYuvMsUMitrHo3qWc3sdhVx9P5mzY6JoDJQKZbOdyjaxJWA8hBSSRkoPgAzzXq8cP7zEhptIoM4N1x8pSTd_yGk_ouVB57kyMA27ZpOKl0jZ6emR-IE3B4qk6NJtMfFG7X_y4me_XCgg"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-on-surface">
                  Connecting to Arthur Vance
                </h4>
                <p className="font-body-sm text-body-sm text-secondary-fixed mt-1">
                  Lead Executive Producer · Encrypted Channel
                </p>
              </div>
              <div className="flex items-center justify-center gap-1.5 py-2">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-bounce [animation-delay:0.4s]" />
              </div>
              <div className="pt-2 flex items-center justify-center gap-4">
                <button
                  onClick={() => setCallModalOpen(false)}
                  className="px-6 py-2.5 rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-variant transition-colors cursor-pointer"
                  type="button"
                >
                  Cancel Call
                </button>
                <a
                  className="px-6 py-2.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md shadow-md hover:brightness-105 transition-all flex items-center gap-2"
                  href="tel:+18889422872"
                >
                  <Icon name="phone" className="text-[18px]" />
                  Open Dialer
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
