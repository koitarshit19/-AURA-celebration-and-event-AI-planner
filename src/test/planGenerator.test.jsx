import { describe, it, expect } from 'vitest'
import {
  validatePlanInputs,
  calculateBudgetTotal,
  reconcileBudgetBreakdown,
  MIN_BUDGET,
  MAX_BUDGET,
  MIN_GUESTS,
  MAX_GUESTS,
} from '../utils/planValidation.js'
import { DEFAULT_PLAN } from '../data/defaultPlan.js'

describe('Plan Generator - Budget Sums and Calculations', () => {
  it('default plan budget breakdown sum equals exactly the total budget cap', () => {
    const totalCap = DEFAULT_PLAN.budget
    const sumOfItems = calculateBudgetTotal(DEFAULT_PLAN.budgetBreakdown)

    expect(totalCap).toBe(75000)
    expect(sumOfItems).toBe(totalCap)
  })

  it('default plan budget breakdown percentages sum to 100%', () => {
    const totalPercentage = DEFAULT_PLAN.budgetBreakdown.reduce(
      (sum, item) => sum + item.percentage,
      0
    )
    // Accept standard floating point rounding within 0.1% of 100%
    expect(Math.round(totalPercentage)).toBe(100)
  })

  it('reconcileBudgetBreakdown reconciles uneven rounding so sum equals target budget exactly', () => {
    const targetBudget = 100000
    const rawBreakdown = [
      { category: 'Venue', amount: 33333, percentage: 33.3 },
      { category: 'Catering', amount: 33333, percentage: 33.3 },
      { category: 'Music', amount: 33333, percentage: 33.3 },
    ]

    // Raw sum is 99999 (1 dollar short)
    expect(calculateBudgetTotal(rawBreakdown)).toBe(99999)

    const reconciled = reconcileBudgetBreakdown(rawBreakdown, targetBudget)
    const reconciledTotal = calculateBudgetTotal(reconciled)

    expect(reconciledTotal).toBe(targetBudget)
    expect(reconciled[reconciled.length - 1].amount).toBe(33334)
  })

  it('reconcileBudgetBreakdown handles large luxury budgets with 100% accuracy', () => {
    const targetBudget = 500000
    const rawBreakdown = [
      { category: 'Venue & Grounds', amount: 160000 },
      { category: 'Catering & Sommelier', amount: 110000 },
      { category: 'Floral & Decor', amount: 60000 },
      { category: 'Music & Production', amount: 50000 },
      { category: 'Lighting & Ambience', amount: 40000 },
      { category: 'Photo & Cinema', amount: 40000 },
      { category: 'Chauffeur & Valet', amount: 20000 },
      { category: 'Contingency Reserve', amount: 20000 },
    ]

    const reconciled = reconcileBudgetBreakdown(rawBreakdown, targetBudget)
    expect(calculateBudgetTotal(reconciled)).toBe(targetBudget)
  })

  it('returns empty array when breakdown is empty or invalid', () => {
    expect(reconcileBudgetBreakdown([])).toEqual([])
    expect(reconcileBudgetBreakdown(null)).toEqual([])
    expect(calculateBudgetTotal([])).toBe(0)
    expect(calculateBudgetTotal(null)).toBe(0)
  })
})

describe('Plan Generator - Input Validation', () => {
  const validPayload = {
    eventType: 'Weddings & Galas',
    date: 'October 24, 2025',
    guestCount: 135,
    budget: 75000,
    city: 'St. Helena & Napa Valley, CA',
    vibe: 'Romantic & Ethereal',
  }

  it('validates a complete, correctly bounded plan payload', () => {
    const result = validatePlanInputs(validPayload)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual({})
  })

  it('rejects missing or empty required text fields', () => {
    const invalidPayload = {
      ...validPayload,
      eventType: '',
      date: '   ',
      city: '',
      vibe: '',
    }

    const result = validatePlanInputs(invalidPayload)
    expect(result.isValid).toBe(false)
    expect(result.errors.eventType).toBeDefined()
    expect(result.errors.date).toBeDefined()
    expect(result.errors.city).toBeDefined()
    expect(result.errors.vibe).toBeDefined()
  })

  it('rejects budget below minimum threshold', () => {
    const result = validatePlanInputs({
      ...validPayload,
      budget: MIN_BUDGET - 1,
    })
    expect(result.isValid).toBe(false)
    expect(result.errors.budget).toContain(`between $${MIN_BUDGET.toLocaleString()}`)
  })

  it('rejects budget above maximum ceiling', () => {
    const result = validatePlanInputs({
      ...validPayload,
      budget: MAX_BUDGET + 1,
    })
    expect(result.isValid).toBe(false)
    expect(result.errors.budget).toContain(`between $${MIN_BUDGET.toLocaleString()}`)
  })

  it('rejects guest attendance below minimum', () => {
    const result = validatePlanInputs({
      ...validPayload,
      guestCount: MIN_GUESTS - 1,
    })
    expect(result.isValid).toBe(false)
    expect(result.errors.guestCount).toContain(`between ${MIN_GUESTS}`)
  })

  it('rejects guest attendance above maximum', () => {
    const result = validatePlanInputs({
      ...validPayload,
      guestCount: MAX_GUESTS + 1,
    })
    expect(result.isValid).toBe(false)
    expect(result.errors.guestCount).toContain(`between ${MIN_GUESTS}`)
  })

  it('accepts boundary edge values correctly', () => {
    const minEdgeResult = validatePlanInputs({
      ...validPayload,
      budget: MIN_BUDGET,
      guestCount: MIN_GUESTS,
    })
    expect(minEdgeResult.isValid).toBe(true)

    const maxEdgeResult = validatePlanInputs({
      ...validPayload,
      budget: MAX_BUDGET,
      guestCount: MAX_GUESTS,
    })
    expect(maxEdgeResult.isValid).toBe(true)
  })
})
