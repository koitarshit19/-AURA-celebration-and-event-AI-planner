import '@testing-library/jest-dom/vitest'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// Mock window and Element scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  configurable: true,
  value: () => {},
})

if (typeof Element !== 'undefined' && !Element.prototype.scrollTo) {
  Element.prototype.scrollTo = () => {}
}

// Configurable clipboard fallback
try {
  Object.defineProperty(navigator, 'clipboard', {
    writable: true,
    configurable: true,
    value: {
      writeText: () => Promise.resolve(),
      readText: () => Promise.resolve(''),
    },
  })
} catch {
  // Already configured
}

// Mock mediaDevices
if (!navigator.mediaDevices) {
  Object.defineProperty(navigator, 'mediaDevices', {
    writable: true,
    configurable: true,
    value: {
      getUserMedia: () => Promise.resolve({
        getTracks: () => [{ stop: () => {} }],
      }),
    },
  })
}

// Mock MediaRecorder
class MockMediaRecorder {
  constructor() {
    this.state = 'inactive'
  }
  start() {
    this.state = 'recording'
  }
  stop() {
    this.state = 'inactive'
    if (this.ondataavailable) {
      this.ondataavailable({ data: new Blob(['audio-data'], { type: 'audio/webm' }) })
    }
    if (this.onstop) {
      this.onstop()
    }
  }
}
window.MediaRecorder = MockMediaRecorder
MediaRecorder.isTypeSupported = () => true
