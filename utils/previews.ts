// ===========================
// utils/effectPreview.ts
// ===========================

// ===========================
// utils/statsPreview.ts
// ===========================

export const statsPreview = {
  select: {
    stat: 'stat',
    amount: 'amount',
    duration: 'duration',
    type: 'type',
    min: 'min',
    max: 'max',
    modifier: 'modifier',
  },
  prepare({
    stat,
    amount,
    duration,
    type,
    min,
    max,
    modifier,
  }: {
    stat?: string
    amount?: number
    duration?: number
    type?: string
    min?: number
    max?: number
    modifier?: number
  }) {
    // Fallback label: stat or type
    const label = stat || type || 'Effect'

    // Handle stat effects and defenses
    if (stat && typeof amount === 'number') {
      return {
        title: label,
        subtitle: `Amount: ${amount}${duration ? ` / Duration: ${duration}` : ''}`,
      }
    }

    // Handle damage bonuses
    if (type && typeof min === 'number' && typeof max === 'number') {
      return {
        title: label,
        subtitle: `+${min}-${max}${duration ? ` / Duration: ${duration}` : ''}`,
      }
    }

    // Handle resistances
    if (type && typeof modifier === 'number') {
      return {
        title: label,
        subtitle: `Resistance: ${modifier}%`,
      }
    }

    return {
      title: label,
      subtitle: 'No data',
    }
  },
}

type EffectPreviewInput = {
  category?: string
  statEffects?: {stat?: string; amount?: number}[]
  damageBonuses?: {type?: string; min?: number; max?: number}[]
  damageResistances?: {type?: string; modifier?: number}[]
  defensiveBonuses?: {stat?: string; amount?: number}[]
}

export const effectPreview = {
  select: {
    category: 'category',
    statEffects: 'statEffects',
    damageBonuses: 'damageBonuses',
    damageResistances: 'damageResistances',
    defensiveBonuses: 'defensiveBonuses',
  },
  prepare({
    category,
    statEffects = [],
    damageBonuses = [],
    damageResistances = [],
    defensiveBonuses = [],
  }: EffectPreviewInput) {
    const parts: string[] = []

    if (statEffects?.length) {
      statEffects.forEach(({stat, amount}) => {
        if (stat) parts.push(`${stat}: ${amount ?? 0}`)
      })
    }

    if (defensiveBonuses?.length) {
      defensiveBonuses.forEach(({stat, amount}) => {
        if (stat) parts.push(`DEF ${stat}: ${amount ?? 0}`)
      })
    }

    if (damageBonuses?.length) {
      damageBonuses.forEach(({type, min, max}) => {
        if (type) parts.push(`${type} +${min ?? 0}-${max ?? 0}`)
      })
    }

    if (damageResistances?.length) {
      damageResistances.forEach(({type, modifier}) => {
        if (type) parts.push(`${type} Res: ${modifier ?? 0}%`)
      })
    }

    return {
      title: `Effect: ${category || 'Unknown'}`,
      subtitle: parts.length ? parts.join(' | ') : 'No effects defined',
    }
  },
}
