import {Rule} from 'sanity'

export const validateRange = (min: number, max: number, label: string) => (Rule: Rule) =>
  Rule.min(min).max(max).error(`${label} must be between ${min} and ${max}`)

export const validatePositive = (label: string) => (Rule: Rule) =>
  Rule.min(0).error(`${label} cannot be negative`)

export const validateRequiredArray = (label: string) => (Rule: Rule) =>
  Rule.required().min(1).error(`At least one ${label} must be selected`)

export const validateConditionalRequirement = (fieldName: string, condition: any) => (Rule: Rule) =>
  Rule.custom((value, context) => {
    if (context.parent?.[fieldName] === condition && !value) {
      return 'This field is required based on previous selection'
    }
    return true
  })

export const validateReferenceUniqueness = (label: string) => (Rule: Rule) =>
  Rule.custom((refs: any[]) => {
    if (!Array.isArray(refs)) return true
    const ids = refs.map((ref) => ref?._ref).filter(Boolean)
    const uniqueIds = new Set(ids)
    return ids.length === uniqueIds.size || `Duplicate ${label} references are not allowed`
  })

export const validatePercentage = (label: string) => (Rule: Rule) =>
  Rule.min(0).max(100).error(`${label} must be a percentage between 0 and 100`)

export const validateProbability = (label: string) => (Rule: Rule) =>
  Rule.min(0).max(1).error(`${label} must be a probability between 0 and 1`)

export const validateDuration = (label: string) => (Rule: Rule) =>
  Rule.min(0)
    .error(`${label} cannot be negative`)
    .integer()
    .error(`${label} must be a whole number`)

export const validateLevel =
  (label: string, maxLevel: number = 100) =>
  (Rule: Rule) =>
    Rule.min(1).max(maxLevel).integer().error(`${label} must be between 1 and ${maxLevel}`)

export const validateWeightedChance = (label: string) => (Rule: Rule) =>
  Rule.custom((value, context: any) => {
    const siblings = context.parent
    const total = Object.values(siblings || {}).reduce(
      (sum: number, val: any) => sum + (typeof val === 'number' ? val : 0),
      0,
    )

    return total <= 100 || `Total ${label} cannot exceed 100%`
  })

export const validateDurability = (label: string) => (Rule: Rule) =>
  Rule.min(1).max(999).integer().error(`${label} must be between 1 and 999`)

// Validate stat point allocation
export const validateStatPoints = (total: number) => (Rule: Rule) =>
  Rule.custom((stats: Record<string, number>) => {
    if (!stats) return true
    const sum = Object.values(stats).reduce((acc, val) => acc + (val || 0), 0)
    return sum === total || `Total stat points must equal ${total}`
  })

// Validate aetheric resonance combinations
export const validateAethericResonance = (Rule: Rule) =>
  Rule.custom((resonance: {primary?: string; secondary?: string}) => {
    if (!resonance?.primary) return 'Primary resonance is required'
    if (resonance.primary === resonance.secondary) {
      return 'Primary and secondary resonance cannot be the same'
    }
    return true
  })

// Validate level ranges
export const validateLevelRange = (Rule: Rule) =>
  Rule.min(1)
    .max(100)
    .warning('Unusual level value')
    .custom((level: number) => {
      if (level > 50) return 'Levels above 50 are reserved for special content'
      return true
    })

// Validate resource costs
export const validateResourceCost = (Rule: Rule) =>
  Rule.custom((costs: Array<{resource: string; amount: number}>) => {
    if (!costs?.length) return true

    for (const cost of costs) {
      if (!cost.resource) return 'Resource type is required'
      if (cost.amount <= 0) return 'Resource amount must be positive'
      if (cost.amount > 100) return 'Resource cost seems unusually high'
    }
    return true
  })

// Validate cooldown periods
export const validateCooldown = (Rule: Rule) =>
  Rule.min(0)
    .max(20)
    .warning('Unusually long cooldown')
    .custom((cooldown: number) => {
      if (cooldown > 10) return 'Cooldowns above 10 turns require special approval'
      return true
    })

// Validate item stacking
export const validateStackSize = (Rule: Rule) =>
  Rule.min(1)
    .max(999)
    .warning('Unusual stack size')
    .custom((size: number) => {
      if (size > 100) return 'Stack sizes above 100 require special consideration'
      return true
    })

// Validate effect durations
export const validateEffectDuration = (Rule: Rule) =>
  Rule.min(1)
    .max(10)
    .warning('Long effect duration')
    .custom((duration: number) => {
      if (duration > 5) return 'Effect durations above 5 turns need balance review'
      return true
    })
