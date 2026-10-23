/**
 * Utilities for validating and calculating event plan parameters and budget distributions.
 */

export const MIN_BUDGET = 1000
export const MAX_BUDGET = 50000000
export const MIN_GUESTS = 2
export const MAX_GUESTS = 25000

/**
 * Validates plan input fields and returns any validation errors.
 */
export function validatePlanInputs({ eventType, date, guestCount, budget, city, vibe }) {
  const errors = {}

  if (!eventType || typeof eventType !== 'string' || !eventType.trim()) {
    errors.eventType = 'Event typology is required'
  }

  if (!date || typeof date !== 'string' || !date.trim()) {
    errors.date = 'Event date is required'
  }

  const numGuests = Number(guestCount)
  if (isNaN(numGuests) || numGuests < MIN_GUESTS || numGuests > MAX_GUESTS) {
    errors.guestCount = `Guest count must be between ${MIN_GUESTS} and ${MAX_GUESTS.toLocaleString()}`
  }

  const numBudget = Number(budget)
  if (isNaN(numBudget) || numBudget < MIN_BUDGET || numBudget > MAX_BUDGET) {
    errors.budget = `Budget must be between $${MIN_BUDGET.toLocaleString()} and $${MAX_BUDGET.toLocaleString()}`
  }

  if (!city || typeof city !== 'string' || !city.trim()) {
    errors.city = 'Destination city or venue is required'
  }

  if (!vibe || typeof vibe !== 'string' || !vibe.trim()) {
    errors.vibe = 'Aesthetic vibe is required'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Calculates the total sum of allocated budget breakdown items.
 */
export function calculateBudgetTotal(breakdown = []) {
  if (!Array.isArray(breakdown)) return 0
  return breakdown.reduce((acc, item) => acc + (Number(item?.amount) || 0), 0)
}

/**
 * Reconciles budget breakdown amounts so their exact sum matches totalBudget.
 */
export function reconcileBudgetBreakdown(breakdown = [], totalBudget = 75000) {
  if (!Array.isArray(breakdown) || breakdown.length === 0) {
    return []
  }

  const targetBudget = Math.round(Number(totalBudget) || 0)
  const reconciled = breakdown.map((item) => ({
    ...item,
    amount: Math.round(Number(item.amount) || 0),
  }))

  const currentSum = reconciled.reduce((acc, item) => acc + item.amount, 0)
  const diff = targetBudget - currentSum

  if (diff !== 0 && reconciled.length > 0) {
    reconciled[reconciled.length - 1].amount += diff
  }

  return reconciled.map((item) => ({
    ...item,
    percentage: targetBudget > 0 ? Number(((item.amount / targetBudget) * 100).toFixed(1)) : 0,
  }))
}
