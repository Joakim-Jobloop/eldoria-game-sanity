// ===========================
// utils/effectPreview.ts
// ===========================

interface EffectPreviewInput {
  category?: string
  statEffects?: StatEffect[]
  damageBonuses?: DamageBonus[]
  damageResistances?: DamageResistance[]
  defensiveBonuses?: DefensiveBonus[]
}

interface StatEffect {
  stat?: string
  amount?: number
  duration?: number
}

interface DamageBonus {
  type?: string
  min?: number
  max?: number
  duration?: number
}

interface DamageResistance {
  type?: string
  modifier?: number
}

interface DefensiveBonus {
  stat?: string
  amount?: number
}

interface PreviewOutput {
  title: string
  subtitle: string
}

// ===========================
// utils/statsPreview.ts
// ===========================

// Utility function for creating preview text with icons
export const iconizedPreview = (title: string, subtitle: string, icon: string) => ({
  title: `${icon} ${title}`,
  subtitle,
})

// Preview for stats and effects
export const statsPreview = {
  select: {
    stat: 'stat',
    type: 'type',
    amount: 'amount',
    min: 'min',
    max: 'max',
    modifier: 'modifier',
    duration: 'duration',
  },
  prepare(selection: any) {
    const {stat, type, amount, min, max, modifier, duration} = selection
    let preview = ''

    if (stat && amount) {
      preview = `${stat}: ${amount > 0 ? '+' : ''}${amount}`
    } else if (type && (min || max)) {
      preview = `${type}: ${min || 0}-${max || min || 0}`
    } else if (type && modifier) {
      preview = `${type}: ${modifier > 0 ? '+' : ''}${modifier}%`
    }

    if (duration) {
      preview += ` (${duration} turns)`
    }

    return {
      title: preview,
      subtitle: duration ? 'Timed Effect' : 'Permanent Effect',
    }
  },
}

// Preview for reference arrays
export const referenceArrayPreview = (title: string) => ({
  title,
  subtitle: (value: any[]) => `${value?.length || 0} items`,
})

// Aetheric resonance preview
export const aethericPreview = {
  select: {
    primary: 'primaryResonance',
    secondary: 'secondaryResonance',
    level: 'resonanceLevel',
  },
  prepare({primary, secondary, level}: any) {
    const resonanceIcons: Record<string, string> = {
      light: '✨',
      dark: '🌑',
      nature: '🌿',
      fire: '🔥',
      water: '💧',
      air: '💨',
      earth: '🌎',
      void: '⚫',
    }

    const primaryIcon = resonanceIcons[primary?.toLowerCase()] || '❓'
    const secondaryIcon = secondary ? resonanceIcons[secondary?.toLowerCase()] : ''
    const levelStars = level ? '★'.repeat(level) : ''

    return {
      title: `${primaryIcon} ${primary}${secondary ? ` + ${secondaryIcon} ${secondary}` : ''}`,
      subtitle: levelStars ? `Resonance Level: ${levelStars}` : 'No resonance level set',
    }
  },
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
  }: EffectPreviewInput): PreviewOutput {
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
