/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore'
import {
  auth,
  db,
  onAuthStateChanged,
  signInWithGooglePopup,
  signOutFromAura,
  handleFirestoreError,
  OperationType,
} from '../firebase.js'

import {
  DEFAULT_PLAN,
  DEFAULT_EVENTS,
  DEFAULT_TASKS,
  DEFAULT_MESSAGES,
} from '../data/defaultPlan.js'
import { CHAT_MODELS, CHAT_PERSONAS } from '../data/personas.js'

export {
  DEFAULT_PLAN,
  DEFAULT_EVENTS,
  DEFAULT_TASKS,
  DEFAULT_MESSAGES,
  CHAT_MODELS,
  CHAT_PERSONAS,
}

const AuraContext = createContext(null)

/**
 * Global state provider managing authentication, Firestore synchronization,
 * active event blueprints, and Gemini AI copilot interactions.
 *
 * @param {Object} props - Component props
 * @param {import('react').ReactNode} props.children - Child tree
 */
export function AuraProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const [authError, setAuthError] = useState(null)

  // Active Plan (persisted in localStorage and Firestore)
  const [activePlan, setActivePlan] = useState(() => {
    try {
      const stored = localStorage.getItem('aura_active_plan')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed && parsed.eventName && parsed.budgetBreakdown) {
          return parsed
        }
      }
    } catch (e) {
      console.warn('Could not read aura_active_plan from localStorage:', e)
    }
    return DEFAULT_PLAN
  })

  const [events, setEvents] = useState(() => {
    const list = [...DEFAULT_EVENTS]
    if (activePlan) {
      list[0] = {
        id: 'active-plan',
        name: activePlan.eventName,
        typology: activePlan.eventType,
        venue: activePlan.city,
        date: activePlan.date,
        countdown: 'T-Minus 42 Days',
        guests: activePlan.guestCount,
        budget: activePlan.budget,
        vibe: activePlan.vibe,
      }
    }
    return list
  })

  const [selectedEventId, setSelectedEventId] = useState('active-plan')
  const [tasks, setTasks] = useState(DEFAULT_TASKS)
  const [chatMessages, setChatMessages] = useState(DEFAULT_MESSAGES)

  const [selectedModel, setSelectedModel] = useState('gemini-3.8-flash')
  const [selectedPersona, setSelectedPersona] = useState('arthur_vance')
  const [chatLoading, setChatLoading] = useState(false)
  const [planGenerating, setPlanGenerating] = useState(false)
  const [transcribing, setTranscribing] = useState(false)
  const [copilotOpen, setCopilotOpen] = useState(false)

  const selectedEvent = useMemo(
    () => events.find((e) => e.id === selectedEventId) || events[0] || DEFAULT_EVENTS[0],
    [events, selectedEventId]
  )

  // Synchronize activePlan into localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('aura_active_plan', JSON.stringify(activePlan))
    } catch (e) {
      console.warn('Failed to persist activePlan to localStorage:', e)
    }
  }, [activePlan])

  // Auth listener & initial user profile upsert
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      setAuthReady(true)

      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid)
        const nowIso = new Date().toISOString()
        try {
          await setDoc(
            userRef,
            {
              uid: currentUser.uid,
              displayName: currentUser.displayName || 'Aura Host',
              email: currentUser.email || 'host@aura.events',
              photoURL: currentUser.photoURL || '',
              primaryCategory: 'Weddings & Galas',
              role: 'client',
              createdAt: nowIso,
              updatedAt: nowIso,
            },
            { merge: true }
          )
        } catch (err) {
          console.error('Profile sync warning:', err)
        }
      }
    })
    return () => unsub()
  }, [])

  // Subscribe to Firestore user collections when authenticated
  useEffect(() => {
    if (!authReady || !user) return

    const uid = user.uid
    const tasksPath = `users/${uid}/tasks`
    const eventsPath = `users/${uid}/events`
    const messagesPath = `users/${uid}/messages`

    const seedDefaultsIfEmpty = async () => {
      try {
        const existingTasks = await getDocs(collection(db, tasksPath))
        if (existingTasks.empty) {
          const now = new Date().toISOString()
          await Promise.all(
            DEFAULT_TASKS.map((t) =>
              setDoc(doc(db, tasksPath, t.id), {
                uid,
                title: t.title,
                due: t.due,
                dueCls: t.dueCls,
                desc: t.desc,
                category: t.category || 'Executive Directive',
                priority: t.priority,
                done: t.done,
                createdAt: now,
              })
            )
          )
        }
      } catch (err) {
        console.error('Seed check error:', err)
      }
    }

    seedDefaultsIfEmpty()

    const unsubTasks = onSnapshot(
      query(collection(db, tasksPath), orderBy('createdAt', 'desc')),
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded = snapshot.docs.map((d) => {
            const data = d.data()
            return {
              id: d.id,
              ...data,
              meta: [
                { icon: 'auto_awesome', text: data.category || 'Executive Directive', cls: 'text-primary' },
                {
                  icon: data.priority === 'high' ? 'priority_high' : 'check_circle',
                  text: data.priority === 'high' ? 'High Impact' : 'Standard',
                  cls: data.priority === 'high' ? 'text-secondary-fixed' : 'text-outline',
                },
              ],
            }
          })
          setTasks(loaded)
        }
      },
      (err) => handleFirestoreError(err, OperationType.LIST, tasksPath)
    )

    const unsubEvents = onSnapshot(
      query(collection(db, eventsPath), orderBy('createdAt', 'asc')),
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
          setEvents(loaded)
        }
      },
      (err) => handleFirestoreError(err, OperationType.LIST, eventsPath)
    )

    const unsubMessages = onSnapshot(
      query(collection(db, messagesPath), orderBy('createdAt', 'asc')),
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
          setChatMessages(loaded)
        }
      },
      (err) => handleFirestoreError(err, OperationType.LIST, messagesPath)
    )

    return () => {
      unsubTasks()
      unsubEvents()
      unsubMessages()
    }
  }, [authReady, user])

  const signInWithGoogle = useCallback(async () => {
    setAuthError(null)
    try {
      const signedInUser = await signInWithGooglePopup()
      return signedInUser
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Authentication failed'
      setAuthError(message)
      throw err
    }
  }, [])

  const signOutUser = useCallback(async () => {
    setAuthError(null)
    await signOutFromAura()
  }, [])

  // Call Gemini through server-side /api/gemini/generate-plan
  const generatePlanWithGemini = useCallback(
    async ({ eventType, date, guestCount, budget, city, vibe }) => {
      setPlanGenerating(true)
      try {
        const response = await fetch('/api/gemini/generate-plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventType,
            date,
            guestCount: Number(guestCount) || 135,
            budget: Number(budget) || 75000,
            city,
            vibe,
          }),
        })

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}))
          throw new Error(errData.error || 'Failed to generate plan with Gemini.')
        }

        const generatedPlan = await response.json()
        setActivePlan(generatedPlan)
        try {
          localStorage.setItem('aura_active_plan', JSON.stringify(generatedPlan))
        } catch (e) {
          console.warn('Error saving to localStorage:', e)
        }

        const newEventObj = {
          id: `plan-${Date.now()}`,
          name: generatedPlan.eventName,
          typology: generatedPlan.eventType,
          venue: generatedPlan.city,
          date: generatedPlan.date,
          countdown: 'T-Minus 42 Days',
          guests: generatedPlan.guestCount,
          budget: generatedPlan.budget,
          vibe: generatedPlan.vibe,
        }

        setEvents((prev) => [newEventObj, ...prev.filter((e) => e.id !== 'active-plan')])
        setSelectedEventId(newEventObj.id)

        // If authenticated, persist to Firestore
        if (user) {
          const path = `users/${user.uid}/events`
          try {
            await addDoc(collection(db, path), {
              uid: user.uid,
              ...newEventObj,
              createdAt: new Date().toISOString(),
            })
          } catch (err) {
            console.error('Firestore event sync error:', err)
          }
        }

        return generatedPlan
      } finally {
        setPlanGenerating(false)
      }
    },
    [user]
  )

  const updateActivePlan = useCallback((updater) => {
    setActivePlan((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      try {
        localStorage.setItem('aura_active_plan', JSON.stringify(next))
      } catch (e) {
        console.warn('Failed to update localStorage:', e)
      }
      return next
    })
  }, [])

  const addTask = useCallback(
    async ({ title, category = 'Executive Directive', priority = 'high' }) => {
      const trimmed = (title || '').trim()
      if (!trimmed) return

      const nowIso = new Date().toISOString()
      const taskData = {
        title: trimmed,
        due: 'Oct 22',
        dueCls: 'bg-primary-container/20 text-primary border border-primary/20',
        desc: 'Custom host directive synchronized with Aura autonomous run-of-show engine and assigned to field team.',
        category,
        priority,
        done: false,
        createdAt: nowIso,
      }

      if (user) {
        const path = `users/${user.uid}/tasks`
        try {
          await addDoc(collection(db, path), {
            uid: user.uid,
            ...taskData,
          })
        } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, path)
        }
      } else {
        setTasks((prev) => [
          {
            id: `local-${Date.now()}`,
            ...taskData,
            meta: [
              { icon: 'auto_awesome', text: category, cls: 'text-primary' },
              { icon: 'priority_high', text: 'High Impact', cls: 'text-secondary-fixed' },
            ],
          },
          ...prev,
        ])
      }
    },
    [user]
  )

  const toggleTask = useCallback(
    async (taskId) => {
      const target = tasks.find((t) => t.id === taskId)
      if (!target) return

      const nextDone = !target.done
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, done: nextDone } : t))
      )

      if (user && !String(taskId).startsWith('local-')) {
        const path = `users/${user.uid}/tasks/${taskId}`
        try {
          await updateDoc(doc(db, path), {
            done: nextDone,
          })
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, path)
        }
      }
    },
    [tasks, user]
  )

  const createEventBlueprint = useCallback(
    async ({
      name,
      typology = 'Weddings & Galas',
      venue = 'St. Helena & Napa Valley, CA',
      date = 'October 24, 2025',
      guests = 135,
      budget = 75000,
      vibe = 'Romantic & Ethereal',
    }) => {
      return generatePlanWithGemini({
        eventName: name,
        eventType: typology,
        date,
        guestCount: guests,
        budget,
        city: venue,
        vibe,
      })
    },
    [generatePlanWithGemini]
  )

  const sendChatMessage = useCallback(
    async (rawText, options = {}) => {
      const text = (rawText || '').trim()
      if (!text || chatLoading) return null

      const modelToUse = options.model || selectedModel
      const personaToUse = options.persona || selectedPersona
      const currentPage = options.currentPage || window.location.pathname || '/'
      const transcribedFromAudio = Boolean(options.transcribedFromAudio)

      const now = new Date()
      const timeStr =
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' PST'
      const userMsgIso = now.toISOString()

      const userMessageObj = {
        id: `u-${Date.now()}`,
        role: 'user',
        text,
        persona: personaToUse,
        model: modelToUse,
        timeStr,
        transcribedFromAudio,
        createdAt: userMsgIso,
      }

      const updatedHistory = [...chatMessages, userMessageObj]
      setChatMessages(updatedHistory)

      if (user) {
        const path = `users/${user.uid}/messages`
        try {
          await addDoc(collection(db, path), {
            uid: user.uid,
            role: 'user',
            text,
            persona: personaToUse,
            model: modelToUse,
            timeStr,
            transcribedFromAudio,
            createdAt: userMsgIso,
          })
        } catch (err) {
          console.error('Error saving user chat message:', err)
        }
      }

      setChatLoading(true)
      try {
        const eventContext = `Event Name: ${activePlan.eventName || selectedEvent.name}
Typology: ${activePlan.eventType}
City/Venue: ${activePlan.city || selectedEvent.venue}
Date: ${activePlan.date}
Guests: ${activePlan.guestCount || 135}
Budget Cap: $${(activePlan.budget || 75000).toLocaleString()} USD
Aesthetic Vibe: ${activePlan.vibe}
Summary: ${activePlan.summary}
Top Ideas:
${activePlan.personalizedIdeas?.map((i) => `- ${i.type}: ${i.title} (${i.description})`).join('\n')}
Budget Categories:
${activePlan.budgetBreakdown?.map((b) => `- ${b.category}: $${b.amount.toLocaleString()} (${b.percentage}%) - ${b.desc}`).join('\n')}`

        const response = await fetch('/api/gemini/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updatedHistory.slice(-16).map((m) => ({
              role: m.role,
              text: m.text,
            })),
            persona: personaToUse,
            model: modelToUse,
            eventContext,
            currentPage,
          }),
        })

        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.error || 'Failed to reach Aura Gemini AI Engine')
        }

        const replyTime = new Date()
        const replyTimeStr =
          replyTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
          ' PST'
        const replyIso = replyTime.toISOString()

        const aiMessageObj = {
          id: `m-${Date.now()}`,
          role: 'model',
          text: data.text,
          persona: personaToUse,
          model: data.model || modelToUse,
          timeStr: replyTimeStr,
          transcribedFromAudio: false,
          createdAt: replyIso,
        }

        if (user) {
          const path = `users/${user.uid}/messages`
          await addDoc(collection(db, path), {
            uid: user.uid,
            role: 'model',
            text: aiMessageObj.text,
            persona: aiMessageObj.persona,
            model: aiMessageObj.model,
            timeStr: aiMessageObj.timeStr,
            transcribedFromAudio: false,
            createdAt: replyIso,
          })
        } else {
          setChatMessages((prev) => [...prev, aiMessageObj])
        }

        return aiMessageObj
      } catch (err) {
        const fallbackIso = new Date().toISOString()
        const errorMsg = {
          id: `err-${Date.now()}`,
          role: 'model',
          text: `Unable to complete AI synthesis right now (${err instanceof Error ? err.message : 'network error'}). Please try again.`,
          persona: personaToUse,
          model: modelToUse,
          timeStr: 'Just now',
          transcribedFromAudio: false,
          createdAt: fallbackIso,
        }
        setChatMessages((prev) => [...prev, errorMsg])
        return null
      } finally {
        setChatLoading(false)
      }
    },
    [activePlan, chatLoading, chatMessages, selectedEvent, selectedModel, selectedPersona, user]
  )

  const clearChatHistory = useCallback(async () => {
    setChatMessages(DEFAULT_MESSAGES)
    if (user) {
      const path = `users/${user.uid}/messages`
      try {
        const snap = await getDocs(collection(db, path))
        await Promise.all(snap.docs.map((d) => deleteDoc(doc(db, path, d.id))))
      } catch (err) {
        console.error('Error clearing chat history:', err)
      }
    }
  }, [user])

  const transcribeAudioBlob = useCallback(async (blob, mimeType = 'audio/webm') => {
    setTranscribing(true)
    try {
      const base64Audio = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })

      const response = await fetch('/api/gemini/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64: base64Audio,
          mimeType: blob.type || mimeType,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Audio transcription failed')
      }
      return data.text || ''
    } finally {
      setTranscribing(false)
    }
  }, [])

  const setSelectedEvent = useCallback((ev) => {
    if (ev && ev.id) setSelectedEventId(ev.id)
  }, [])

  // Memoize context value to prevent unnecessary re-renders across consumer components
  const contextValue = useMemo(
    () => ({
      user,
      authReady,
      authError,
      signInWithGoogle,
      signOutUser,
      activePlan,
      generatePlanWithGemini,
      updateActivePlan,
      planGenerating,
      events,
      selectedEvent,
      setSelectedEvent,
      createEventBlueprint,
      tasks,
      addTask,
      toggleTask,
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
    }),
    [
      user,
      authReady,
      authError,
      signInWithGoogle,
      signOutUser,
      activePlan,
      generatePlanWithGemini,
      updateActivePlan,
      planGenerating,
      events,
      selectedEvent,
      setSelectedEvent,
      createEventBlueprint,
      tasks,
      addTask,
      toggleTask,
      chatMessages,
      sendChatMessage,
      clearChatHistory,
      transcribeAudioBlob,
      chatLoading,
      transcribing,
      selectedModel,
      selectedPersona,
      copilotOpen,
    ]
  )

  return (
    <AuraContext.Provider value={contextValue}>
      {children}
    </AuraContext.Provider>
  )
}

/**
 * Custom hook to access the AuraContext state and dispatch actions.
 */
export function useAura() {
  const ctx = useContext(AuraContext)
  if (!ctx) {
    throw new Error('useAura must be used within an AuraProvider')
  }
  return ctx
}